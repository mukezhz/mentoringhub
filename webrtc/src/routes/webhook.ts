import * as express from "express"
import * as w from "../controllers"

export const router = express.Router()
router.use('/events', express.raw());
router.post('/events', w.handleWebEvent)