import * as axios from "axios";
import * as express from "express"
import * as db from "../databases";
import * as util from "../utils"

const livekitHost = process.env.LIVEKIT_URL || 'hostname'
const apiUrl = process.env.API_URL || 'https://test.com'
const apiKey = process.env.LIVEKIT_API_KEY || 'apikey'
const apiSecret = process.env.LIVEKIT_API_SECRET || 'apisecret'
const everestUrl = process.env.EVEREST_URL || 'https://example.com'

interface JoinCode {
    meeting_id: string
    expire_time: string
    identity: string
}

export const handleGenerateCode = async (req: express.Request, res: express.Response) => {
    const { meeting_id, expire_time, identity }: JoinCode = req.body
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
    if (!meeting_id) return res.status(400).json({ message: 'meeting id is not provided!!!' })
    else if (!expire_time) return res.status(400).json({ message: 'expire time is not provided!!!' })
    const time = Number(expire_time)
    if (!time) return res.status(400).json({ message: 'expire time is not time stamp number!!!' })
    let requiredIdentity = identity
    try {
        if (accesstoken) {
            const result = await axios.default(config)
            const user_id = result.data?.user_profile?.user_id || null
            requiredIdentity = user_id || identity || null
        }
        if (!requiredIdentity) return res.status(400).json({ message: "user's identity is not provided!!!" })
        const meet = await db.meeting.findById(meeting_id)
        if (!meet) return res.status(404).json({ message: "meeting doesn't exist by provided meeting id!!!" })
        const search = await db.joinCode.findMeetingIdIdentity(meeting_id, requiredIdentity)
        if (search && search?.join_code) {
            const result = await db.joinCode.updateExpireTime(requiredIdentity, meeting_id, time)
            return res.status(200).json({ message: "success", data: { join_code: result.join_code, join_url: `${apiUrl}/api/meetings/${meeting_id}/${result.join_code}` } })
        }
        const data = await db.joinCode.create({ meeting_id: meeting_id, identity: requiredIdentity, expire_time: time })
        return res.status(200).json({ message: "success", data: { join_code: data.join_code, join_url: `${apiUrl}/api/meetings/${meeting_id}/${data.join_code}` } })
    } catch (e: any) {
        console.error(e)
        console.error("inserting to database!!!")
        return res.status(500).json({ message: e.message })
    }
}

export const handleFindByJoinCode = async (req: express.Request, res: express.Response) => {
    try {
        const { join_code } = req.params
        if (!join_code) return res.status(400).json({ message: "id has not been provided!!!" })
        const result = await db.joinCode.findByJoinCode(join_code)
        if (!result) return res.status(200).json({ message: "unable to find data from provided join_code!!!" })
        return res.json({ message: "success", data: result })
    } catch (e) {
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleFindMeetingIdJoinCode = async (req: express.Request, res: express.Response) => {
    const { meeting_id, join_code } = req.params
    const { identity, name } = req.body
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
    if (!meeting_id) return res.status(400).json({ message: 'meeting id is not provided!!!' })
    else if (!join_code) return res.status(400).json({ message: 'join code is not provided!!!' })
    let requiredIdentity = identity || null
    let requiredName = name || null
    try {
        // if (accesstoken) {
        //     const result = await axios.default(config)
        //     console.log("result", result)
        //     const userName = result.data?.user_profile?.displayName || null
        //     const user_id = result.data?.user_profile?.user_id || null
        //     requiredIdentity = user_id || identity
        //     requiredName = userName || name
        // }
        if (!requiredIdentity) return res.status(400).json({ message: "user's identity is not provided!!!" })
        else if (!requiredName) return res.status(400).json({ message: "user's name is not provided!!!" })
        const meet = await db.meeting.findById(meeting_id)
        if (!meet) return res.status(404).json({ message: "meeting doesn't exist by provided meeting id!!!" })
        const search = await db.joinCode.findMeetingByJoinCode(join_code)
        if (!search) return res.status(404).json({ message: "join code doesn't exist by provided code!!!" })
        if ((Date.now() - Number(search.expire_time)) > 0) return res.status(200).json({ message: 'join code have been expired!!!' })
        try {
            const search = await db.waiting.findByMeetingIdAndUserId(meeting_id, requiredIdentity)
            if (!search) {
                const result = await db.waiting.create({ meeting_id: meeting_id, user_id: requiredIdentity, user_name: requiredName, status: 'WAITING' })
                if (!result) return res.status(400).json({ message: "error while adding user to waiting room!!!" })
                return res.status(200).json({ message: "success", status: result.status })
            }
            return res.status(200).json({ message: "success", status: search.status })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: "dublicate user exists!!!" })
        }
    } catch (e: any) {
        console.error(e)
        console.error("inserting to database!!!")
        return res.status(500).json({ message: "error while finding meeting id from join code!!!" })
    }
}
