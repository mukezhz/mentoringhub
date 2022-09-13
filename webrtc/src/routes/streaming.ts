import * as express from "express"
import * as r from "../controllers"

export const router = express.Router()


// start streaming
router.post('/start', r.handleStartLiveStream)

// stop streaming
router.post('/stop', r.handleStopLiveStream)

// get streaming info by name
router.post('/streaminfo', r.handleGetStreamInfo)