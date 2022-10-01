import * as express from "express"
import * as t from "../controllers"

export const router = express.Router()

//Mutes a track that the participant has published.
router.post("/mutetrack", t.handleMutePublishedTrack)

// Updates a participant's subscription to tracks
router.post("/subscription", t.handleUpdateSubscription)

// Sends data message to participants in the room
router.post("/data", t.handleSendData)
