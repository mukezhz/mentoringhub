import * as helloRouter from "./helloWorld"
import * as participantRouter from "./participant"
import * as roomRouter from "./room"
import * as tokenRouter from "./token"
import * as trackRouter from "./track"
import * as recordingRouter from "./streaming"
import * as meetingRouter from "./meeting"
import * as waitingRouter from "./waiting"
import * as webHookRouter from "./webhook"

import * as express from "express"

export const router = express.Router()

router.use('/', helloRouter.router)
router.use('/participants', participantRouter.router)
router.use('/rooms', roomRouter.router)
router.use('/tokens', tokenRouter.router)
router.use('/tracks', trackRouter.router)
router.use('/streamings', recordingRouter.router)
router.use('/meetings', meetingRouter.router)
router.use('/waitings', waitingRouter.router)
router.use('/webhooks', webHookRouter.router)