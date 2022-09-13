import * as express from "express"
import * as p from "../controllers"

export const router = express.Router()

// check if user is present or not
router.get('/:room/:identity', p.handleSingleParticipant)

// list the participants inside the room
router.get('/:room', p.handleFetchRoomParticipants)

// remove the participant from the room
router.post('/remove', p.handleRemoveParticipant)

// update the participant metadata and permissions
router.post('/updateparticipant', p.handleUpdateParticipant)