const handleError = (res, error) =>{
    console.log("Something went wrong: ", error)
    if(error.code===11000){
        return res.status(409).json({message:"Email already exists"})
    }
    res.status(500).json({message:error.message})
}

export default handleError