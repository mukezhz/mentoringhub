import * as express from "express"
import * as w from "../controllers"

export const router = express.Router()

// initiate waiting status
router.post('/init', w.handleInitiateWaiting)

// update status
router.put('/status', w.handleUpdateWaitingStatus)

// approve all waiting
router.get('/approveall/:meeting_id', w.handleApproveAll)

// get member according to status
router.get('/:meeting_id', w.handleFetchMemberAccordingToStatus)

// get member according to status
router.get('/:meeting_id/u', w.handleFetchMemberAccordingToUserId)

// get member according to meeting_id, user_id, join_code
router.get('/', w.handleFetchMemberAccordingToUserIdMeetingIdJoinCode)