import * as express from "express";
import * as db from "../databases"
import * as axios from "axios";

import { WebhookReceiver } from 'livekit-server-sdk';

const apiKey = process.env.LIVEKIT_API_KEY || 'apikey'
const apiSecret = process.env.LIVEKIT_API_SECRET || 'apisecret'

const receiver = new WebhookReceiver(apiKey, apiSecret);

interface WebHook {
    event: string
    room: object
    participant: object
    id: string
    createdAt: string
}

export const handleWebEvent = async (req: express.Request, res: express.Response) => {
    // event is a WebhookEvent object
    try {
        const { event = '' }: WebHook = req.body
        if (!event) return
        const { room = '', participant = '' } = req.body
        const { name: roomName = '' } = room
        const { name: participantName = '', identity = '' } = participant
        const meeting = await db.meeting.findByRoom(roomName)
        if (!meeting || !meeting.webhook_url) {
            console.log('[Error]: either meeting not found or webhook_url is null')
            return
        }
        const config = {
            method: 'post',
            url: meeting.webhook_url,
            data: {
                meeting_id: meeting.id,
                action: '',
                identity: identity
            }
        };
        if (event === 'participant_joined') {
            // TODO: send post req to url
            config.data.action = 'JOINED'
            const result = await axios.default(config)
            if (!result) console.log('[error]: error while sending JOIN to parewa!!!')
        }
        else if (event === 'participant_left') {
            // TODO: send post req to url
            config.data.action = "LEFT"
            const result = await axios.default(config)
            if (!result) console.log('[error]: error while sending LEAVE to parewa!!!')
        }
    } catch (e) {
        console.log(e)
        console.log("[error]: something went very wrong on webhook!!!")
    }
}