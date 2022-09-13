import * as express from "express"
import { RoomServiceClient } from 'livekit-server-sdk';
import * as util from "../utils"

const livekitHost = process.env.LIVEKIT_URL || 'hostname'
const apiKey = process.env.LIVEKIT_API_KEY || 'apikey'
const apiSecret = process.env.LIVEKIT_API_SECRET || 'apisecret'

export const handleRoomCreate = async (req: express.Request, res: express.Response) => {
    try {
        const { room = "", timeout = 172800, participantno = 100, metadata = "" } = req.body;
        if (!room) return res.status(400).json({ message: 'room name is not provided!!!' })
        const svc = <RoomServiceClient>util.roomService(livekitHost, apiKey, apiSecret)
        const specificRoom = await util.listRooms(svc, [room]) || []
        if (specificRoom.length) return res.status(500).json({ message: 'room already exists!!!' })
        const createdRoom = await util.createRoom(svc, room, timeout, participantno);
        if (metadata) {
            const updatedRoom = await util.updateRoomMetadata(svc, room, metadata)
            return res.status(201).json({ message: "success", room: updatedRoom })
        }
        if (!createdRoom) return res.status(500).json({ message: 'unable to create room!!!' })
        return res.status(201).json({ message: "success", room: createdRoom });
    }
    catch (e) {
        console.error(e)
        console.error("handle room create")
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleRemoveToken = (req: express.Request, res: express.Response) => {
    try {
        const token = req.cookies['token']
        if (token) {
            res.clearCookie('token')
            return res.status(200).json({ message: 'success!!!' });
        } return res.status(400).json({ message: 'token does not exist please create token first!!!' })
    }
    catch (e) {
        console.error(e)
        console.error("handle room token")
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleDeleteRoom = async (req: express.Request, res: express.Response) => {
    try {
        const { room = "" } = req.body
        if (!room) return res.status(400).json({ message: "room name is not provided!!!" })
        const svc = <RoomServiceClient>util.roomService(livekitHost, apiKey, apiSecret)
        const specificRoom = await util.listRooms(svc, [room]) || []
        if (!specificRoom.length) return res.status(404).json({ message: "room does not exist!!!" })
        const result = await util.deleteRoom(svc, room)
        if (!result)
            return res.status(400).json({ message: `error while deleting room!!!` })
        return res.status(200).json({ message: `room: ${room} delete successfully!!!` })
    }
    catch (e) {
        console.error(e)
        console.error("handle delete room")
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleRooms = async (req: express.Request, res: express.Response) => {
    try {
        const svc = <RoomServiceClient>util.roomService(livekitHost, apiKey, apiSecret)
        const rooms = await util.listRooms(svc)
        if (!rooms) return res.status(500).json({ message: 'unable to list rooms!!!' })
        return res.status(200).json({ message: "success", rooms })
    }
    catch (e) {
        console.error(e)
        console.error("handle rooms")
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleSingleRoom = async (req: express.Request, res: express.Response) => {
    try {
        const { room = '' } = req.params
        let newRoom = ''
        if (room.includes('"')) newRoom = room.split('"').join('')
        else newRoom = room
        if (!room) return res.status(400).json({ message: 'room name is not provided!!!' })
        const svc = <RoomServiceClient>util.roomService(livekitHost, apiKey, apiSecret)
        const specificRoom = await util.listRooms(svc, [newRoom]) || []
        if (specificRoom?.length === 0) return res.status(404).json({ message: 'room does not found!!!' })
        return res.status(200).json({ message: "success", room: specificRoom[0] })
    }
    catch (e) {
        console.error(e)
        console.error("handle single room")
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleListRoom = async (req: express.Request, res: express.Response) => {
    try {
        const { rooms = [] } = req.body
        const svc = <RoomServiceClient>util.roomService(livekitHost, apiKey, apiSecret)
        const listsRoom = await util.listRooms(svc, rooms)
        if (!listsRoom) return res.status(500).json({ message: 'unable to find list of users!!!' })
        return res.status(200).json({ message: "success", rooms: listsRoom })
    }
    catch (e) {
        console.error(e)
        console.error("handle list room")
        return res.status(500).json({ message: 'server error' })
    }
}

export const handleUpdateRoomMetadata = async (req: express.Request, res: express.Response) => {
    try {
        const { room = "", metadata = "" } = req.body
        if (!room) return res.status(400).json({ message: 'room is not provided!!!' })
        else if (!metadata) return res.status(400).json({ message: 'metadata is not provided!!!' })
        const svc = <RoomServiceClient>util.roomService(livekitHost, apiKey, apiSecret)
        const updatedRoom = await util.updateRoomMetadata(svc, room, metadata)
        if (!updatedRoom) return res.status(400).json({ message: 'unable to update metadata!!!' })
        return res.status(201).json({ message: 'success', room: updatedRoom })
    }
    catch (e) {
        console.error(e)
        console.error("handle update room metadata")
        return res.status(500).json({ message: 'server error' })
    }
}