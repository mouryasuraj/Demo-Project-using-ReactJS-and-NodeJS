import User from "../models/user.js";
import { publicData } from "../utils/constants.js";
import handleError from "../utils/handleError.js"
import jwt from 'jsonwebtoken'

export const userAuth = async (req,res,next) =>{
    try {
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is missing.")
        }

        const {email} = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({email}).select(publicData)

        if(!user){
            return res.status(401).json({message:"User not found"})
        }

        req.user = user
        next()
        
    } catch (error) {
        console.log("Something went wrong: ", error)
        handleError(res, error)
    }
}