import * as express from "express"
import * as m from "../controllers"
import * as mw from "../middlewares"

export const router = express.Router()

// start meeting
router.post('/create', m.handleStartMeeting)

// get all meetings
router.get('/all', m.handleFindAll)

// get meeting by uuid
router.get('/id/:id', m.handleFindById)

// get meeting by uuid
// router.get('/id/:id', m.handleFindByUserId)

// update status
router.put('/status', m.handleUpdateStatus)

// update waiting room enabled
router.put('/waiting', m.handleUpdateWaiting)

// update waiting room enabled
router.use('/join/:meeting_id', mw.tokenValidator)
router.post('/join/:meeting_id', m.handleJoinMeeting)

// generate join code
router.post('/code/generate', m.handleGenerateCode)

// get url token from generated code
router.post('/:meeting_id/:join_code', m.handleFindMeetingIdJoinCode)

// search meetings
router.get('/search/:app_id', m.handleSearchMeeting)

// search active participants from meetings
router.get('/:meeting_id/participants/active', m.handleSearchActiveMember)

// add participats
router.get('/:meeting_id/add/participants', m.handleAddParticipant)