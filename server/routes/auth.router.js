import express from 'express'
import { handleLogin, handleLogout, handleSignUp, handleVerfiy } from '../controller/auth.controller.js';
import { userAuth } from '../middlewares/userAuth.js';

const authRouter = express.Router()


authRouter.post("/signup", handleSignUp)
authRouter.post("/login", handleLogin)
authRouter.get("/logout", handleLogout)
authRouter.get("/verify", userAuth, handleVerfiy)


export default authRouter;