import express from "express";
import {
  handleUserConnections,
  handleUserFeed,
  handleUserRequests,
} from "../controller/connections.controller.js";
import { userAuth } from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.get("/feed", userAuth, handleUserFeed);
userRouter.get("/connections", userAuth, handleUserConnections);
userRouter.get("/requests", userAuth, handleUserRequests);

export default userRouter;
