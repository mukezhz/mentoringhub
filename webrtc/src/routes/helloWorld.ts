import * as express from "express"
import * as controller from "../controllers"

export const router = express.Router()

router.get("/", controller.indexHandler);