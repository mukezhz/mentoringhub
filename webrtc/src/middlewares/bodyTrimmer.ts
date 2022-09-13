import * as express from "express";

export function postTrimmer(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.method === 'POST') {
        for (const [key, value] of Object.entries(req.body)) {
            if (key && typeof (value) === 'string')
                req.body[key] = value.trim();
        }
    }
    next();
}