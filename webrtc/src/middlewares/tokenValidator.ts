import * as express from "express";
import * as db from "../databases"

export async function tokenValidator(req: express.Request, res: express.Response, next: express.NextFunction) {
    const headers = req.headers
    const token = headers?.token
    const { meeting_id = '' } = req.params
    if (req.method === 'POST' || req.method === 'GET' || req.method === 'PUT') {
        if (token) {
            const search = await db.meeting.getTokenById(meeting_id)
            if (!search) return res.status(404).json({ message: "meeting doesn't exists!!!" })
            if (search?.token !== token) return res.status(403).json({ message: 'forbidden [maybe token expired]!!!' })
        }
    }
    next();
}