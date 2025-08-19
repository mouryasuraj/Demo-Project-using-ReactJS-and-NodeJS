import express from 'express'
import { userAuth } from '../middlewares/userAuth.js'
import { handleProfileEdit } from '../controller/profile.controller.js'

const profileRouter = express.Router()

profileRouter.put("/edit/:userId", userAuth, handleProfileEdit)


export default profileRouter