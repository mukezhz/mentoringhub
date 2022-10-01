import * as express from "express"
import * as t from "../controllers"

export const router = express.Router()

// fetch a token with admin privilages
router.post("/admintoken", t.handleAdminToken)

// fetch a token with member privilages
router.post("/membertoken", t.handleMemberToken)

// fetch a token with viewer privilages
router.post("/viewertoken", t.handleViewerToken)

// fetch a token with viewer privilages
router.post("/waitingtoken", t.handleWaitingToken)

// remove a token from cookie
router.get('/removetoken', t.handleRemoveToken)