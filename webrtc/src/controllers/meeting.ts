import * as axios from "axios";
import * as express from "express"
import * as nanoid from "nanoid";
import * as db from "../databases";
import * as util from "../utils"
import * as livekit from "../utils/livekitserver"
import * as url from "../utils/urls"


const livekitHost = process.env.LIVEKIT_URL || 'hostname'
const apiKey = process.env.LIVEKIT_API_KEY || 'apikey'
const apiSecret = process.env.LIVEKIT_API_SECRET || 'apisecret'
const everestUrl = process.env.EVEREST_URL || 'https://example.com'

interface Meeting {
    room: string,
    title: string,
    user_id: string,
    description?: string,
    participants: Object,
    start_date: string,
    status: string,
    cover_image?: string | null,
    app_id: string,
    country: string,
    waiting_room_enabled: boolean
    token: string
}

export const handleStartMeeting = async (req: express.Request, res: express.Response) => {
    try {
        const {
            room,
            title,
            description,
            participants,
            start_date = Date.now().toString(),
            status,
            cover_image = "",
            app_id,
            country,
            waiting_room_enabled,
            token
        }: Meeting = req.body
        const uniqueToken = nanoid.nanoid()
        if (!title) return res.status(400).json({ message: 'title is not provided!!!' })
        else if (!participants) return res.status(400).json({ message: 'participants is not provided!!!' })
        else if (!app_id) return res.status(400).json({ message: 'app_id is not provided!!!' })
        else if (!country) return res.status(400).json({ message: 'country code is not provided!!!' })
        try {
            if (room) {
                const search = await db.meeting.findByRoom(room)
                if (search) return res.status(400).json({ message: "data already exists!!!" })
            }
            const date = Number(start_date)
            if (!date) return res.status(400).json({ message: 'invalid time stamp: provide number !!!' })
            const result = await db.meeting.create({ ...req.body, start_date: date, id: uniqueToken, room: room || uniqueToken })
            return res.status(200).json({ message: "success", data: { id: result.id } })
        } catch (e: any) {
            return res.status(400).json({ message: "error while creating!!!", error: e.message })
        }
    } catch (e) {
        console.error(e)
        console.error("inserting to database!!!")
        return res.status(500).json({ message: 'server error!!!' })
    }
}

export const handleFindAll = async (req: express.Request, res: express.Response) => {
    const { page = "0", limit = "1" } = req.query
    try {
        const result = await db.meeting.findAll(page, limit)
        return res.json({ message: "success", data: result })
    } catch (e) {
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleFindById = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    try {
        if (!id) return res.status(400).json({ message: "id has not been provided!!!" })
        const result = await db.meeting.findById(id)

        if (!result) return res.status(200).json({ message: "unable to find data from provided id!!!" })
        return res.json({ message: "success", data: JSON.parse(util.toJson(result)) })
    } catch (e) {
        return res.status(500).json({ message: 'server error [unable to find user by provided id]!!!' })
    }
}

// export const handleFindByUserId = async (req: express.Request, res: express.Response) => {
//     try {
//         const { id } = req.params
//         if (!id) return res.status(400).json({ message: "user id has not been provided!!!" })
//         const result = await db.meeting.findByUserId(id)
//         if (!result) return res.status(200).json({ message: "unable to find data from provided user id!!!" })
//         return res.json({ message: "success", data: result })
//     } catch (e) {
//         return res.status(500).json({ message: 'server error' })
//     }
// }

export const handleUpdateStatus = async (req: express.Request, res: express.Response) => {
    try {
        const { id, status = '' }: { id: string, status: string } = req.body
        const upperStatus = typeof ('') === 'string' ? status.toUpperCase() : ''
        if (!status) return res.status(400).json({ message: "status has not been provided!!!" })
        const filter = ['NEW', 'CANCELED', 'ENDED'].filter(d => d === upperStatus)
        if (!filter.length) return res.status(400).json({ message: 'status can be either [NEW or CANCELED or ENDED]!!! ' })
        const search = await db.meeting.findById(id)
        if (!search) return res.status(400).json({ message: "data doesn't exist with id!!!" })
        const result = await db.meeting.updateStatus(id, upperStatus)
        if (!result) return res.status(200).json({ message: "unable to update status!!!" })
        // closing room if status is 'ENDED'
        if (status === 'ENDED' || status === 'CANCELED') {
            const svc = livekit.roomService(url.urls[search.country].replace('wss', 'https'), apiKey, apiSecret)
            if (!svc) return res.status(500).json({ message: "error while creating service!!!" })
            try {
                const room = await svc.listRooms([search?.room])
                if (room.length) await svc.deleteRoom(search.room)
            } catch (e) {
                console.log("error while closing the room!!!");
            }
        }
        return res.json({ message: "success", data: { status: result.status } })
    } catch (e: any) {
        console.error(e)
        return res.status(500).json({ message: e?.response?.data?.msg || 'something went wrong!!!' })
    }
}

export const handleUpdateWaiting = async (req: express.Request, res: express.Response) => {
    try {
        const { id, waiting }: { id: string, waiting: boolean } = req.body
        if (waiting === null) return res.status(400).json({ message: "waiting has not been provided!!!" })
        const search = await db.meeting.findById(id)
        if (!search) return res.status(400).json({ message: "data doesn't exist with id!!!" })
        const result = await db.meeting.updateWaitingRoom(id, waiting)
        if (!result) return res.status(200).json({ message: "unable to update waiting room enabled!!!" })
        return res.json({ message: "success", data: { waiting: result.waiting_room_enabled } })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: 'server error only [true or false] is possible!!!' })
    }
}

export const handleJoinMeeting = async (req: express.Request, res: express.Response) => {
    const { identity = '', metadata = '', ttl = "10", username = "" } = req.body
    const { meeting_id = "" } = req.params
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
    try {
        if (!meeting_id) return res.status(400).json({ message: 'meeting id is not provided!!!' })
        let userName = username
        let userId = identity
        if (accesstoken) {
            const result = await axios.default(config)
            userId = result.data?.user_profile?.user_id || identity
            userName = result.data?.user_profile?.displayName || username
        }
        else if (!userName) return res.status(400).json({ message: 'user name is not provided!!!' })
        else if (!userId) return res.status(400).json({ message: 'user identity is not provided!!!' })

        const search = await db.meeting.findById(meeting_id)
        if (!search) return res.status(400).json({ message: "meeting doesn't exists!!!" })
        if (search?.status === "ENDED") return res.status(400).json({ message: "meeting has been ended!!!" })
        if (!search?.room) {
            const svc = livekit.roomService(url.urls[search.country].replace('wss', 'https'), apiKey, apiSecret)
            if (!svc) return res.status(500).json({ message: "error while creating room" })
            await livekit.createRoom(svc, meeting_id, 86400, 100)
        }
        const update = await db.meeting.updateMetadata(meeting_id, metadata)
        if (!update) return res.status(500).json({ message: "error while updating metadata!!!" })
        const countryCode: string = search.country
        const { hosts = [], members = [] } = search?.participants as { hosts: [], members: [] }
        const searchHost = hosts.filter(d => d === userId)
        if (searchHost.length) return res.status(200).json(
            {
                message: 'success',
                access_token: util.obtainAdminToken(search.room, userId, apiKey, apiSecret, userName, metadata, ttl) || 'error',
                url: util.urls[countryCode]
            })

        const searchMember = members.filter(d => d === userId)
        if (searchMember.length) return res.status(200).json({
            message: 'success',
            access_token: util.obtainMemberToken(search.room, userId, apiKey, apiSecret, userName, metadata) || 'error',
            url: util.urls[countryCode]
        })
        if (search?.waiting_room_enabled) {
            const searchWaiting = await db.waiting.find(meeting_id, userId)
            if (searchWaiting) return res.status(400).json({
                message: "waiting is already created!!!",
                status: searchWaiting.status
            })
            const result = await db.waiting.create({
                meeting_id: meeting_id,
                user_id: userId,
                user_name: userName
            })
            return res.status(200).json({ message: 'success', status: result.status })
        }
        // if waiting=false return waiting token
        return res.status(200).json({
            message: 'success',
            access_token: util.obtainMemberToken(search.room, identity, apiKey, apiSecret, username, metadata) || 'error',
            url: util.urls[countryCode]
        })

    } catch (e) {
        console.error(e)
        return res.status(401).json({ message: "something went wrong!!!" })
    }
}

export const handleSearchMeeting = async (req: express.Request, res: express.Response) => {
    const { st, et } = req.query
    const { app_id } = req.params
    if (!st) return res.status(400).json({ message: 'start time is not provided!!!' })
    else if (!et) return res.status(400).json({ message: 'end time is not provided!!!' })
    else if (!app_id) return res.status(400).json({ message: 'app id is not provided!!!' })
    const startDateTimeNum = Number(st)
    if (!startDateTimeNum) return res.status(400).json({ message: 'unable to obtain date from start time!!!' })
    const endDateTimeNum = Number(et)
    if (!endDateTimeNum) return res.status(400).json({ message: 'unable to obtain date from end time!!!' })
    try {
        const searchMeetings = await db?.meeting?.findByDate(startDateTimeNum, endDateTimeNum, app_id)
        const results = JSON.parse(util.toJson(searchMeetings))
        function asyncMap(arrs: any) {
            return Promise.all(arrs.map(async (data: any) => {
                const svc = livekit.roomService(url.urls[data?.country].replace('wss', 'https'), apiKey, apiSecret)
                if (!svc) return "service not created!!!"
                const active_participants = await livekit.listParticipants(svc, data?.room || data?.id)
                const room = await livekit.listRooms(svc, [data?.room || data?.id])
                if (!room) return "room not found"
                delete data?.room
                if (!active_participants?.length) return { ...data, active_participants: [] }
                const identities = active_participants.map(participant => participant.identity)
                return { ...data, active_participants: identities, room_created_at: room?.[0]?.creationTime }
            }))
        }
        const resultWithParticipants = await asyncMap(results)
        return res.json({ message: "success", data: resultWithParticipants })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "something went wrong" })
    }
}

export const handleSearchActiveMember = async (req: express.Request, res: express.Response) => {
    const { meeting_id } = req.params
    if (!meeting_id) return res.status(400).json({ message: 'meeting id is not provided!!!' })
    try {
        const searchMeeting = await db?.meeting.findById(meeting_id)
        if (!searchMeeting) return res.status(404).json({ message: "meeting doesn't exists!!!" })
        const svc = livekit.roomService(url.urls[searchMeeting.country].replace('wss', 'https'), apiKey, apiSecret)
        if (!svc) return res.status(500).json({ message: "error while initiating service client!!!" })
        const rooms = await livekit.listRooms(svc, [searchMeeting?.room])
        if (!rooms || !rooms.length) return res.status(400).json({ message: "room has not been created!!!" })
        const active_participants = await livekit.listParticipants(svc, searchMeeting.room)
        if (!active_participants?.length) return res.json({ message: "success", participants: [] })
        const identities = active_participants.map(participant => participant.identity)
        return res.json({ message: "success", participants: identities, room_created_at: rooms[0].creationTime })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "something went wrong" })
    }
}

export const handleAddParticipant = async (req: express.Request, res: express.Response) => {
    const { participants = {} } = req.body
    const { meeting_id = "" } = req.params
    try {
        if (!meeting_id) return res.status(400).json({ message: "meeting id is not provided!!!" })
        else if (!Object.entries(participants)) return res.status(400).json({ message: "participants is not provided!!!" })
        const meeting = await db.meeting.addParticipant(meeting_id, participants)
        if (!meeting) return res.status(500).json({ message: "error while updating!!!" })
        return res.json({ message: "success" })
    } catch (e) {
        return res.status(500).json({ message: "someting went wrong" })
    }
}