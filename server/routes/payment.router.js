import express from 'express'
import { userAuth } from '../middlewares/userAuth.js';
import { handleCreateOrder, handleRazorWebhook } from '../controller/payment.controller.js';

const paymentRouter = express.Router()


paymentRouter.post("/createOrder", userAuth, handleCreateOrder)
paymentRouter.post("/webhook", handleRazorWebhook)



export default paymentRouter;