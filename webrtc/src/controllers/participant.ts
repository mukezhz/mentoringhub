import * as express from "express"
import { RoomServiceClient } from 'livekit-server-sdk';
import * as util from "../utils"

const livekitHost = process.env.LIVEKIT_URL || 'hostname'
const apiKey = process.env.LIVEKIT_API_KEY || 'apikey'
const apiSecret = process.env.LIVEKIT_API_SECRET || 'apisecret'

export const handleSingleParticipant = async (req: express.Request, res: express.Response) => {
    try {
        const { room = "", identity = "" } = req.params
        if (!room || !identity) return res.status(400).json({ message: 'room or identity is not provided!!!' })
        const svc = <RoomServiceClient>util.roomService(livekitHost, apiKey, apiSecret)
        const participant = await util.getParticipant(svc, room, identity)
        if (!participant) return res.status(404).json({ message: "unable to find user in the room!!!" })
        return res.status(200).json({ message: "success", participant })
    } catch (e) {
        console.error(e)
        console.error("handle single participant")
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleFetchRoomParticipants = async (req: express.Request, res: express.Response) => {
    try {
        const { room = "" } = req.params
        if (!room) return res.status(400).json({ message: 'room name is not provided!!!' })
        const svc = <RoomServiceClient>util.roomService(livekitHost, apiKey, apiSecret)
        const participants = await util.listParticipants(svc, room)
        if (!participants) return res.status(400).json({ message: 'unable to fetch participants!!!' })
        return res.status(200).json({ message: "success", participants })
    }
    catch (e) {
        console.error(e)
        console.error("handle fetch room participants")
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleRemoveParticipant = async (req: express.Request, res: express.Response) => {
    try {
        const { room = "", identity = "" } = req.body
        if (!room) res.status(400).json({ message: 'room name is not provided!!!' })
        else if (!identity) res.status(400).json({ message: 'identity is not provided!!!' })
        const svc = <RoomServiceClient>util.roomService(livekitHost, apiKey, apiSecret)
        const result = await util.removeParticipant(svc, room, identity)
        try {
            const participantIdentity = identity.split('::')[0]
            if (!result) res.status(200).json({ message: `unable to remove the participant: ${participantIdentity}` })
        } catch (e) {
            return res.status(400).json({ message: 'unable to parse identity!!!' })
        }
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleUpdateParticipant = async (req: express.Request, res: express.Response) => {
    try {
        const { room = '', identity = '', metadata = '', permissions = {} } = req.body
        if (!room) return res.status(400).json({ message: 'room name is not provided!!!' })
        else if (!identity) return res.status(400).json({ message: 'participant identity is not provided!!!' })
        const svc = <RoomServiceClient>util.roomService(livekitHost, apiKey, apiSecret)
        try {
            const result = await util.updateParticipant(svc, room, identity, metadata, permissions)
            if (!result) return res.status(500).json({ message: 'unable to update metadata or permissions!!!' })
            return res.status(200).json({ message: 'success', participantInfo: result })
        } catch (e) {
            return res.status(500).json({ message: 'unable to update the metadata!!!' })
        }
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({ message: 'server error' })
    }
}
