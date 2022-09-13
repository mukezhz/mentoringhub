import * as util from "util"
import * as express from "express"
import { RoomServiceClient } from 'livekit-server-sdk';
import * as t from "../utils/livekitserver"

const livekitHost = process.env.LIVEKIT_URL || ""
const apiKey = process.env.LIVEKIT_API_KEY || "error"
const apiSecret = process.env.LIVEKIT_API_SECRET || "errorsecret"

export const handleMutePublishedTrack = async (req: express.Request, res: express.Response) => {
    try {
        const { room = "", identity = "", trackSid = "", muted = false } = req.body
        if (!room) return res.status(400).json({ message: 'room name is not provided!!!' })
        else if (!identity) return res.status(400).json({ message: 'identity is not provided!!!' })
        else if (!trackSid) return res.status(400).json({ message: 'trackSid is not provided!!!' })
        const svc = <RoomServiceClient>t.roomService(livekitHost, apiKey, apiSecret)
        const trackinfo = await t.mutePublishedTrack(svc, room, identity, trackSid, muted)
        if (!trackinfo) return res.status(500).json({ message: "unable to mute the track !!!" })
        return res.status(200).json({ message: "success" })
    } catch (e) {
        console.error(e)
        console.error("handle mute publish track")
        return res.status(500).json({ message: "server error!!!" })
    }
}

export const handleUpdateSubscription = async (req: express.Request, res: express.Response) => {
    interface Identity {
        room: string;
        identity: string;
        trackSids: string[];
        subscribe: boolean;
    }
    try {
        const { room = "", identity = "", trackSids = [], subscribe }: Identity = req.body
        if (!room) res.status(400).json({ message: 'room name is not provided!!!' })
        else if (!identity) res.status(400).json({ message: 'identity is not provided!!!' })
        else if (!trackSids) res.status(400).json({ message: 'traksSids is not provided!!!' })
        else if (!trackSids) res.status(400).json({ message: 'subscribe is not provided!!!' })
        const svc = <RoomServiceClient>t.roomService(livekitHost, apiKey, apiSecret)
        const result = await t.updateSubscriptions(svc, room, identity, trackSids, subscribe)
        if (!result) return res.status(500).json({ message: 'unable to update subscriptions !!!' })
        return res.status(301).json({ message: 'success' })
    } catch (e) {
        console.error(e)
        console.error("handle update subscription")
        return res.status(500).json({ message: "server error!!!" })
    }
}

export const handleSendData = async (req: express.Request, res: express.Response) => {
    try {
        const { room = "", data = "", kind = 0, destinationSids = [] } = req.body
        const newData = new util.TextEncoder().encode(data)
        if (!room) return res.status(400).json({ message: 'room name is not provided!!!' })
        else if (!data) return res.status(400).json({ message: 'data is not provided!!!' })
        const svc = <RoomServiceClient>t.roomService(livekitHost, apiKey, apiSecret)
        const result = await t.sendData(svc, room, newData, kind, destinationSids)
        if (!result) return res.status(400).json({ messager: 'unable to send data!!!' })
        return res.status(200).json({ message: 'success' })
    } catch (e) {
        return res.status(500).json({ message: "server error!!!" })
    }
}