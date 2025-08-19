import handleError from "../utils/handleError.js";
import { validateLoginData, validateSignUpData } from "../utils/validations.js";
import User from "../models/user.js";
import bcrypt from 'bcryptjs'


export const handleSignUp = async (req, res) => {
  try {
    validateSignUpData(req);

    const { fullName, email, password, age, photoUrl } = req.body;

    // Hash password

    const hashedPassword = await bcrypt.hash(password, 10)

    const createUser = new User({ fullName, email, password:hashedPassword, age, photoUrl });

    const userCreated = await createUser.save();

    res.status(200).json({ message: "User Created Successfully", user:{
        fullName:userCreated.fullName,
        email:userCreated.email,
        age:userCreated.age,
        photoUrl:userCreated.photoUrl
    } });
  } catch (error) {
    handleError(res, error);
  }
};




export const handleLogin = async (req,res) =>{

    try {

        validateLoginData(req)

        const {email, password} = req.body
        
        // Check user exist or not
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const hashedPassword = user.password

        // Check password is correct or not
        const isPasswordCorrect = await bcrypt.compare(password,hashedPassword)

        if(!isPasswordCorrect){
            return res.status(500).json({message:"Password is incorrect"})
        }

        const userData = {
            fullName:user.fullName,
            email:user.email,
            _id:user._id,
            photoUrl:user.photoUrl
        }
        const token = await user.signJwt(userData)

        res.cookie("token", token, {expires:new Date(Date.now() + 86400000), httpOnly:true, secure:true})

        res.status(200).json({message:"Loggedin successfully", user:userData})

        
    } catch (error) {
        handleError(res, error)
    }

}

export const handleLogout = (req,res) =>{
    try {

        res.clearCookie("token")
        res.status(200).json({message:"Loggedout successfully"})
        
    } catch (error) {
        handleError(res, error)
    }
}


export const handleVerfiy = (req,res) =>{
    try {
        res.status(200).json({message:"User verified successfulluy", user:req.user})
    } catch (error) {
        handleError(res, error)
    }
}