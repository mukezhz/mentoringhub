import * as express from "express"
import * as util from "../utils"

const apiKey = process.env.LIVEKIT_API_KEY || "error"
const apiSecret = process.env.LIVEKIT_API_SECRET || "errorsecret"

export const handleAdminToken = (req: express.Request, res: express.Response) => {
    const { room = "", participantName = "", metadata = "", ttl = "", identity = "" } = req.body;
    if (!room) return res.status(400).json({ message: 'room name is not provided!!!' })
    else if (!participantName) return res.status(400).json({ message: 'participant\'s name is not provided!!!' })
    else if (!identity) return res.status(400).json({ message: 'identity is not provided!!!' })
    const token = req.cookies['token']
    if (token) {
        const user = util.verifyToken(token, apiKey, apiSecret)
        const { video, iss, sub, jti } = user
        if ((jti === identity || sub === identity) && video.room === room) {
            res.json({ message: "token already exists!!!", access_token: token })
            return
        }
    }
    try {
        const access_token = util.obtainAdminToken(room, identity, apiKey, apiSecret, participantName, metadata, ttl)
        res.cookie("token", access_token, {
            httpOnly: true,
        });
        return res.json({ access_token, message: "success" })
    } catch (e) {
        return res.status(400).json({ message: 'unable to create token for admin!!!', error: e })
    }
}


export const handleMemberToken = (req: express.Request, res: express.Response) => {
    const { participantName = "", room = "", identity = "" } = req.body;
    if (!room) return res.status(400).json({ message: 'room name is not provided!!!' })
    else if (!participantName) return res.status(400).json({ message: 'participant\'s name is not provided!!!' })
    else if (!identity) return res.status(400).json({ message: 'identity is not provided!!!' })
    const token = req.cookies['token']
    if (token) {
        const user = util.verifyToken(token, apiKey, apiSecret)
        const { video, iss, sub, jti } = user
        if ((jti === identity || sub === identity) && video.room === room) {
            res.json({ message: "token already exists", access_token: token })
            return
        }
    }
    try {
        const access_token = util.obtainMemberToken(room, identity, apiKey, apiSecret, participantName)
        res.cookie("token", access_token, {
            httpOnly: true,
        });
        return res.json({ access_token, message: "success" })
    } catch (e) {
        return res.status(400).json({ message: 'unable to create token for member!!!', error: e })
    }
}

export const handleViewerToken = (req: express.Request, res: express.Response) => {
    const { room = "", participantName = "", identity = "" } = req.body;
    if (!room) return res.status(400).json({ message: 'room name is not provided!!!' })
    else if (!participantName) return res.status(400).json({ message: 'participant\'s name is not provided!!!' })
    else if (!identity) return res.status(400).json({ message: 'identity is not provided!!!' })
    const token = req.cookies['token']
    if (token) {
        const user = util.verifyToken(token, apiKey, apiSecret)
        const { video, iss, sub, jti } = user
        if ((jti === identity || sub === identity) && video.room === room) {
            res.json({ message: "token already exists", access_token: token })
            return
        }
    }
    try {
        const access_token = util.obtainViewerToken(room, identity, apiKey, apiSecret, participantName)
        res.cookie("token", access_token, {
            httpOnly: true,
        });
        return res.json({ access_token, message: "success" })
    } catch (e) {
        return res.status(400).json({ message: 'unable to create token for viewer!!!' })
    }
}

export const handleWaitingToken = (req: express.Request, res: express.Response) => {
    const { room = "", participantName = "", identity = "" } = req.body;
    if (!room) return res.status(400).json({ message: 'room name is not provided!!!' })
    else if (!participantName) return res.status(400).json({ message: 'participant\'s name is not provided!!!' })
    else if (!identity) return res.status(400).json({ message: 'identity is not provided!!!' })
    const token = req.cookies['token']
    if (token) {
        const user = util.verifyToken(token, apiKey, apiSecret)
        const { video, iss, sub, jti } = user
        if ((jti === identity || sub === identity) && video.room === room) {
            res.json({ message: "token already exists", access_token: token })
            return
        }
    }
    try {
        const access_token = util.obtainWaitingToken(room, identity, apiKey, apiSecret, participantName)
        res.cookie("token", access_token, {
            httpOnly: true,
        });
        return res.json({ access_token, message: "success" })
    } catch (e) {
        return res.status(400).json({ message: 'unable to create token for viewer!!!' })
    }
}
