import validator from 'validator'

// Signup

import { allowedLoginFields, allowedSignUpFields } from "./constants.js"

export const validateSignUpData = (req) =>{
    if(!req.body){
        throw new Error("Request body is missing.")
    }
    const reqBodyKeys = Object.keys(req.body)
    if(reqBodyKeys.length===0){
        throw new Error("Request body is missing.")
    }

    const invalidFields = reqBodyKeys.filter((field) => !allowedSignUpFields.includes(field))
    if(invalidFields.length!==0){
        throw new Error("Invalid fields: "+ invalidFields.join(","))
    }

    const isFieldMissing = ! allowedSignUpFields.every(field => reqBodyKeys.includes(field))
   if(isFieldMissing){
    throw new Error("Missing fields")
   }

   const {fullName, email, password} = req.body
   

   const validateIsEmptyField = [
    {
        isValid:!fullName,
        message:"fullName is required"
    },
    {
        isValid:!email,
        message:"email is required"
    },
    {
        isValid:!password,
        message:"password is required"
    },
   ]
   validateIsEmptyField.forEach((data)=>{
    if(data.isValid){
        throw new Error(data.message)
    }
   })

   const validateFieldValues = [
    {
        isValid:!(fullName.length>=4 && fullName.length<20),
        message:"Full Name should be greater than 4 and less than 20"
    },
    {
        isValid:!validator.isEmail(email),
        message:"Invalid Email"
    },
    {
        isValid:!validator.isStrongPassword(password, {minLength:8, minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1}),
        message:"Password is not strong"
    },
   ]

   validateFieldValues.forEach((data)=>{
    if(data.isValid){
        throw new Error(data.message)
    }
   })


    

    


    




}
export const validateLoginData = (req) =>{
    if(!req.body){
        throw new Error("Request body is missing.")
    }
    const reqBodyKeys = Object.keys(req.body)
    if(reqBodyKeys.length===0){
        throw new Error("Request body is missing.")
    }

    const invalidFields = reqBodyKeys.filter((field) => !allowedLoginFields.includes(field))
    if(invalidFields.length!==0){
        throw new Error("Invalid fields: "+ invalidFields.join(","))
    }

    const isFieldMissing = ! allowedLoginFields.every(field => reqBodyKeys.includes(field))
   if(isFieldMissing){
    throw new Error("Missing fields")
   }

   const {email, password} = req.body
   

   const validateIsEmptyField = [
    {
        isValid:!email,
        message:"email is required"
    },
    {
        isValid:!password,
        message:"password is required"
    },
   ]
   validateIsEmptyField.forEach((data)=>{
    if(data.isValid){
        throw new Error(data.message)
    }
   })

   const validateFieldValues = [
    {
        isValid:!validator.isEmail(email),
        message:"Invalid Email"
    },
   ]

   validateFieldValues.forEach((data)=>{
    if(data.isValid){
        throw new Error(data.message)
    }
   })


    

    


    




}