import * as livekit from 'livekit-server-sdk';
import * as express from "express"
import * as util from "../utils"
import * as egress from "livekit-server-sdk/dist/proto/livekit_egress"
import * as db from "../databases"

const livekitHost = process.env.LIVEKIT_URL || 'hostname'
const apiKey = process.env.LIVEKIT_API_KEY || 'apikey'
const apiSecret = process.env.LIVEKIT_API_SECRET || 'apisecret'


export const handleStartLiveStream = async (req: express.Request, res: express.Response) => {
    const {
        hostname = '',
        identity = '',
        email = '',
        platform = '',
        streamKey = '',
        roomName = '',
        layout = '',
        options = undefined,
        audioOnly = undefined,
        videoOnly = undefined,
        customBaseUrl = ''
    }: {
        hostname: string,
        identity: string,
        email: string,
        platform: string,
        streamKey: string,
        roomName: string,
        layout: string,
        options: any,
        videoOnly: any,
        audioOnly: any,
        customBaseUrl: string
    } = req.body
    try {
        const ec = <livekit.EgressClient>util.getEgressClient(livekitHost, apiKey, apiSecret)
        let newOptions: egress.EncodingOptions = {
            /** (default 1920) */
            width: 1280,
            /** (default 1080) */
            height: 720,
            /** (default 24) */
            depth: 24,
            /** (default 30) */
            framerate: 30,
            /** (default OPUS) */
            audioCodec: egress.AudioCodec.OPUS,
            /** (default 128) */
            audioBitrate: 128,
            /** (default 44100) */
            audioFrequency: 44100,
            /** (default H264_MAIN) */
            videoCodec: egress.VideoCodec.H264_MAIN,
            /** (default 4500) */
            videoBitrate: 4500
        }
        const egressInfo: egress.EgressInfo | undefined = await util.startStreamEgress(ec, platform, streamKey, roomName, layout, 2, audioOnly, videoOnly, customBaseUrl)
        if (!egressInfo) return res.status(500).json({ message: 'unable to start streaming!!!' })
        try {
            const egress = await db.egress.create({
                egress_id: egressInfo.egressId,
                status: !egressInfo.status ? 'STARTED' : 'ENDED',
                started_at: egressInfo.startedAt,
                ended_at: egressInfo.endedAt,
                layout: egressInfo.roomComposite?.layout
            })
            if (!egress) return res.status(400).json({ message: "error while creating egress!!!" })
            const streaming = await db.streaming.create({
                room_id: egressInfo.roomId,
                egress_id: egressInfo.egressId,
                room_name: roomName,
                hostname: hostname,
                email: email,
                identity: identity,
                platform: platform,
                started_at: Date.now(),
            })
            if (!streaming) return res.status(400).json({ message: "error while creating streaming!!!" })

            return res.status(200).json({
                message: 'success', data: {
                    stream: JSON.parse(util.toJson(streaming)),
                    egress: JSON.parse(util.toJson(egress))
                }
            })
        } catch (e) {
            console.error('error', e)
            return res.status(500).json({ message: "something went wrong!!!" })
        }
    } catch (e: any) {
        // console.error(e)
        console.error('[Controller]: error while handling start live stream!!!')
        return res.status(500).json({ message: e || 'error while starting stream!!!' })
    }
}

export const handleStopLiveStream = async (req: express.Request, res: express.Response) => {
    const { egressId = '' }: { egressId: string } = req.body
    try {
        const stream = await db.streaming.findByEgress(egressId)
        if (!stream) return res.status(400).json({ message: 'unable to find stream!!!' })
        const result = await db.streaming.updateEndDate(stream.id, Date.now())
        if (!result) return res.status(400).json({ message: 'unable to update end date!!!' })
        const ec = <livekit.EgressClient>util.getEgressClient(livekitHost, apiKey, apiSecret)
        const egressInfo = await util.stopEgress(ec, egressId)
        if (!egressInfo) return res.status(500).json({ message: 'unable to stop streaming!!!' })
        const egressUpdate = await db.egress.updateStatus(result.egress_id, "ENDED")
        if (!egressUpdate) return res.status(500).json({ message: "unable to update status" })
        return res.status(200).json({ message: 'success', data: { steaming: JSON.parse(util.toJson(result)), egress: JSON.parse(util.toJson(egressUpdate)) } })
    } catch (e) {
        console.error(e)
        console.error('[Controller]: error while handling stop live stream!!!')
        return res.status(500).json({ message: 'error while stopping stream!!!' })
    }
}

export const handleUpdateStream = async (req: express.Request, res: express.Response) => {
    try {
        const {
            egressId = '',
            platform = '',
            streamKey = '',
            addOutputUrls = undefined,
            removeOutputUrls = undefined
        } = req.body
        const ec = <livekit.EgressClient>util.getEgressClient(livekitHost, apiKey, apiSecret)
        const egressInfo = await util.updateStream(ec, egressId, platform, streamKey, addOutputUrls, removeOutputUrls)
        if (!egressInfo) return res.status(500).json({ message: 'unable to update streaming!!!' })
        return res.status(200).json({ message: 'success' })
    } catch (e) {
        console.error(e)
        console.error('[Controller]: error while handling update stream!!!')
        return res.status(500).json({ message: 'error while updating stream!!!' })
    }
}

export const handleGetStreamInfo = async (req: express.Request, res: express.Response) => {
    const { roomName = '', email = '' }: { roomName: string, email: string } = req.body
    try {
        if (!roomName) res.status(400).json({ message: 'room name is not provided!!!' })
        else if (!email) res.status(400).json({ message: 'email is not provided!!!' })
        const streamInfos = await db.streaming.findByRoomName(roomName, email)
        if (!streamInfos) return res.status(500).json({ message: 'unable to find stream!!!' })
        function asyncMap(arrs: any) {
            return Promise.all(arrs.map(async (data: any) => {
                const egressInfo = await db.egress.findById(data?.egress_id)
                if (!egressInfo) return { ...data, egress: null }
                return { ...data, egress: egressInfo }
            }))
        }
        const resultWithEgress = await asyncMap(streamInfos)
        if (!resultWithEgress.length) return res.status(500).json({ message: 'error occur while fetching streaming and egress info!!!' })
        return res.status(200).json({ message: 'success', streams: JSON.parse(util.toJson(resultWithEgress)) })
    } catch (e) {
        console.error(e)
        console.error('[Controller]: error while handling update stream!!!')
        return res.status(500).json({ message: 'error while fetching stream info!!!' })
    }
}