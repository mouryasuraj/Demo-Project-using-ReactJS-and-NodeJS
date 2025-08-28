import express from "express";
import {
  handleIsPremium,
  handleUserConnections,
  handleUserFeed,
  handleUserRequests,
} from "../controller/connections.controller.js";
import { userAuth } from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.get("/feed", userAuth, handleUserFeed);
userRouter.get("/connections", userAuth, handleUserConnections);
userRouter.get("/requests", userAuth, handleUserRequests);
userRouter.get("/ispremium", userAuth, handleIsPremium);

export default userRouter;
