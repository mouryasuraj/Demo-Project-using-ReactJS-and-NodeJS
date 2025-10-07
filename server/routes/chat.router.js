import express from 'express'
import { userAuth } from '../middlewares/userAuth.js';
import { handleGetAllChat } from '../controller/chat.controller.js';

const chatRouter = express.Router()

chatRouter.get("/getallchat/:toUserId", userAuth, handleGetAllChat)

export default chatRouter;