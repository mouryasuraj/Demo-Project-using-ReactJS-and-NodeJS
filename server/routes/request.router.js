import express from 'express'
import { userAuth } from '../middlewares/userAuth.js';
import { handleReviewRequest, handleSendRequest } from '../controller/request.controller.js';

const requestRouter = express.Router()

requestRouter.post("/send/:status/:toUserId", userAuth, handleSendRequest)
requestRouter.post("/review/:status/:requestId", userAuth, handleReviewRequest)


export default requestRouter;