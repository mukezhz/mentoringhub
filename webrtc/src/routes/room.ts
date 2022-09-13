import * as express from "express"
import { handleRoomCreate, handleDeleteRoom, handleRooms, handleListRoom, handleSingleRoom, handleUpdateRoomMetadata } from '../controllers'

export const router = express.Router()

// get the information of specific room
router.get('/:room', handleSingleRoom)

// list all the rooms available
router.get('/', handleRooms)

// create a room
router.post("/create", handleRoomCreate);

// delete a room with roomName
router.post('/deleteroom', handleDeleteRoom)

// get the information of list of rooms
router.post('/list', handleListRoom)

// update room metadata
router.post('/updateroomdata', handleUpdateRoomMetadata)