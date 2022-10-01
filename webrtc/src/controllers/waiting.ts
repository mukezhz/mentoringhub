import * as axios from "axios";
import * as express from "express"
import * as db from "../databases";
import * as util from "../utils"

const livekitHost = process.env.LIVEKIT_URL || 'hostname'
const apiKey = process.env.LIVEKIT_API_KEY || 'apikey'
const apiSecret = process.env.LIVEKIT_API_SECRET || 'apisecret'
const everestUrl = process.env.EVEREST_URL || 'https://example.com'


export const handleInitiateWaiting = async (req: express.Request, res: express.Response) => {
    const { meeting_id, user_id, username, status = "WAITING", }: { meeting_id: string, user_id: string, username: string, status: string } = req.body
    const upperStatus = typeof ('') === 'string' ? status.toUpperCase() || 'WAITING' : ''
    const { accesstoken } = req.headers as { [key: string]: string }
    const grpcAppId = req.headers['grpc-metadata-app-id'] as string
    const grpcWebKey = req.headers['grpc-metadata-web-api-key'] as string
    const config = {
        method: 'get',
        url: `${everestUrl}/account/profiles`,
        headers: {
            'Authorization': accesstoken,
            'grpc-metadata-app-id': grpcAppId,
            'grpc-metadata-web-api-key': grpcWebKey
        }
    };
    let requiredId = user_id
    let requiredName = username
    try {
        if (status) {
            const filter = ['WAITING', 'APPROVED', 'REJECTED'].filter(d => d === upperStatus)
            if (!filter.length) return res.status(400).json({ message: 'status can be either [WAITING or APPROVED or REJECTED]!!! ' })
        }
        if (accesstoken) {
            const result = await axios.default(config)
            const userName = result?.data?.user_profile?.displayName || null
            const userId = result?.data?.user_profile?.user_id || null
            requiredId = userId || user_id || null
            requiredName = userName || username || null
        }
        if (!meeting_id) return res.status(400).json({ message: 'meeting id is not provided!!!' })
        else if (!requiredId) return res.status(400).json({ message: 'user id is not provided!!!' })
        else if (!requiredName) return res.status(400).json({ message: 'username is not provided!!!' })
        try {
            const search = await db.waiting.find(meeting_id, requiredId)
            if (search) return res.status(400).json({ message: "data already exists!!!" })
            const result = await db.waiting.create({ meeting_id: meeting_id, user_id: requiredId, user_name: requiredName, status: upperStatus })
            return res.status(200).json({ message: "success", data: { status: result.status } })
        } catch (e: any) {
            return res.status(400).json({ message: "error while creating!!!", error: e.message })
        }
    } catch (e) {
        console.error(e)
        console.error("inserting to database!!!")
        return res.status(500).json({ message: 'server error [unable to initiate waiting]' })
    }
}

export const handleUpdateWaitingStatus = async (req: express.Request, res: express.Response) => {
    const { meeting_id, user_id, username, status = "", }: { meeting_id: string, user_id: string, username: string, status: string } = req.body
    const upperStatus = typeof (status) === 'string' ? status.toUpperCase() : ''
    try {
        if (!meeting_id) return res.status(400).json({ message: 'meeting id is not provided!!!' })
        else if (!user_id) return res.status(400).json({ message: 'user id is not provided!!!' })
        else if (!username) return res.status(400).json({ message: 'username is not provided!!!' })
        const filter = ['WAITING', 'APPROVED', 'REJECTED'].filter(d => d === upperStatus)
        if (!filter.length) return res.status(400).json({ message: 'status can be either [WAITING or APPROVED or REJECTED]!!!' })
        try {
            const meeting = await db.meeting.findById(meeting_id)
            if (!meeting) return res.status(404).json({ message: "meeting doesn't exist by provided meeting id!!!" })
            const search = await db.waiting.find(meeting_id, user_id)
            if (!search) return res.status(400).json({ message: "unable to find in waiting!!!" })
            // const result = await db.waiting.updateStatus(meeting_id, user_id, upperStatus)
            if (search?.status !== 'WAITING') return res.status(400).json({ message: `already ${search.status}`, data: { status: search?.status } })
            let data = {}
            if (upperStatus === 'APPROVED') {
                if (!search.token) {
                    const memberToken = util.obtainMemberToken(meeting.room, user_id, apiKey, apiSecret, username)
                    const result = await db.waiting.updateStatusToken(meeting_id, user_id, upperStatus, memberToken)
                    data = { status: result.status, access_token: memberToken, url: util.urls[meeting.country] }
                } else {
                    data = { status: search.status, access_token: search.token, url: util.urls[meeting.country] }
                }
            }
            else if (upperStatus === 'REJECTED') {
                const data = await db.waiting.updateStatusToken(meeting_id, user_id, upperStatus, null)
                if (!data) return res.status(400).json({ message: "unable to delete data!!!" })
                return res.status(200).json({ message: "success", data: { status: data.status } })
            }
            else {
                const result = await db.waiting.updateStatus(meeting_id, user_id, upperStatus)
                data = { status: result.status }
            }
            return res.status(200).json({ message: "success", data: data })
        } catch (e: any) {
            return res.status(400).json({ message: "error while updating status!!!", error: e.message })
        }
    } catch (e) {
        console.error(e)
        console.error("inserting to database!!!")
        return res.status(500).json({ message: 'server error [unable to update status]' })
    }
}

export const handleApproveAll = async (req: express.Request, res: express.Response) => {
    const { meeting_id } = req.params
    if (!meeting_id) return res.status(400).json({ message: 'meeting id is not provided!!!' })
    try {
        const results = await db.waiting.findByStatus(meeting_id, 'WAITING')
        const search = await db.meeting.findById(meeting_id)
        if (!results.length) return res.status(400).json({ message: "all request has already been approved!!!" })
        if (!search) return res.status(400).json({ message: "meeting doesn't exists !!!" })
        const asyncForLoop = async (results: any) => {
            await Promise.all(results.map(async (result: any) => {
                const memberToken = util.obtainMemberToken(search.room, result.user_id, apiKey, apiSecret, result.user_name)
                return await db.waiting.updateStatusToken(meeting_id, result.user_id, 'APPROVED', memberToken)
            }))
        }
        await asyncForLoop(results)
        return res.status(201).json({ message: 'success' })
    } catch (e: any) {
        return res.status(500).json({ message: 'server error [unable to approve all]!!!' })
    }
}

export const handleFetchMemberAccordingToStatus = async (req: express.Request, res: express.Response) => {
    const { meeting_id } = req.params
    const { status } = req.query
    const upperStatus = typeof (status) === 'string' ? status?.toUpperCase() : ''
    if (!meeting_id) return res.status(400).json({ message: 'meeting id is not provided!!!' })
    if (!status) return res.status(400).json({ message: 'status is not provided!!!' })
    try {
        const filter = ["WAITING", "APPROVED", "REJECTED"].filter(d => d === upperStatus)
        if (!filter.length) return res.status(400).json({ message: 'status can be either [WAITING or APPROVED or REJECTED]!!! ' })
        const meeting = await db.meeting.findById(meeting_id)
        if (!meeting) return res.status(400).json({ message: "meeting doesn't exists with provided id!!!" })
        const results = await db.waiting.findByStatus(meeting_id, upperStatus)
        if (!results.length) return res.status(400).json({ message: "no one exists with provided status!!!" })
        if (upperStatus === 'APPROVED') {
            const datas = results.map((d: any) => { return { user_id: d?.user_id, user_name: d?.user_name, status: d?.status, access_token: d?.token, url: util.urls[meeting.country] } })
            return res.status(201).json({ message: 'success', data: datas })
        }
        const datas = results.map((d: any) => { return { user_id: d?.user_id, user_name: d?.user_name, status: d?.status } })
        return res.status(201).json({ message: 'success', data: datas })
    } catch (e: any) {
        return res.status(500).json({ message: 'server error [unable to fetch member according to status]!!!' })
    }
}

export const handleFetchMemberAccordingToUserId = async (req: express.Request, res: express.Response) => {
    const { meeting_id } = req.params
    const { uid } = req.query
    const lowerUID = typeof (uid) === 'string' ? uid?.toLowerCase() : ''
    if (!meeting_id) return res.status(400).json({ message: 'meeting id is not provided!!!' })

    const { accesstoken } = req.headers as { [key: string]: string }
    const grpcAppId = req.headers['grpc-metadata-app-id'] as string
    const grpcWebKey = req.headers['grpc-metadata-web-api-key'] as string
    const config = {
        method: 'get',
        url: `${everestUrl}/account/profiles`,
        headers: {
            'Authorization': `Bearer ${accesstoken}`,
            'grpc-metadata-app-id': grpcAppId,
            'grpc-metadata-web-api-key': grpcWebKey
        }
    };
    let requiredId = lowerUID
    try {
        if (accesstoken) {
            const result = await axios.default(config)
            const userId = result.data?.user_profile?.user_id
            requiredId = userId || lowerUID || null
        }
        if (!lowerUID && !requiredId) return res.status(400).json({ message: 'user id is not provided!!!' })
        const meeting = await db.meeting.findById(meeting_id)
        if (!meeting) return res.status(400).json({ message: "meeting doesn't exists with provided id!!!" })
        const waiting = await db.waiting.findByMeetingIdAndUserId(meeting_id, requiredId)
        if (!waiting) return res.status(400).json({ message: "unable to find waiting from provided ids!!!" })
        return res.status(201).json({ message: 'success', data: waiting })
    } catch (e: any) {
        return res.status(500).json({ message: 'server error [unable to fetch member according to user id]!!!' })
    }
}

export const handleFetchMemberAccordingToUserIdMeetingIdJoinCode = async (req: express.Request, res: express.Response) => {
    const { userid, meetingid } = req.query
    const meeting_id = meetingid as string
    const user_id = userid as string
    if (!meeting_id) return res.status(400).json({ message: 'meeting id is not provided!!!' })
    const { accesstoken } = req.headers as { [key: string]: string }
    const grpcAppId = req.headers['grpc-metadata-app-id'] as string
    const grpcWebKey = req.headers['grpc-metadata-web-api-key'] as string
    const config = {
        method: 'get',
        url: `${everestUrl}/account/profiles`,
        headers: {
            'Authorization': `Bearer ${accesstoken}`,
            'grpc-metadata-app-id': grpcAppId,
            'grpc-metadata-web-api-key': grpcWebKey
        }
    };
    let requiredId = user_id || null
    try {
        // if (accesstoken) {
        //     const result = await axios.default(config)
        //     const userId = result.data?.user_profile?.user_id || null
        //     requiredId = userId || user_id
        // }
        if (!requiredId) return res.status(400).json({ message: 'user id is not provided!!!' })
        const meeting = await db.meeting.findById(meeting_id)
        if (!meeting) return res.status(400).json({ message: "meeting doesn't exists with provided id!!!" })
        const waiting = await db.waiting.findByMeetingIdAndUserId(meeting_id, requiredId)
        if (!waiting) return res.status(400).json({ message: "unable to find waiting from provided ids!!!" })
        return res.status(201).json({
            message: 'success', data: {
                status: waiting.status,
                url: util.urls[meeting.country],
                token: waiting.token
            }
        })
    } catch (e: any) {
        console.log(e)
        return res.status(500).json({ message: 'server error [unable to fetch member according to user id, meeting id, join code]!!!' })
    }
}