import express from 'express'
import { userAuth } from '../middlewares/userAuth.js';
import { handleCreateOrder } from '../controller/payment.controller.js';

const paymentRouter = express.Router()


paymentRouter.post("/createOrder", userAuth, handleCreateOrder)



export default paymentRouter;