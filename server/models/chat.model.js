import mongoose from 'mongoose'

// Sub Schema
const messageSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:"User"
    },
    text:{
        type:String,
        required:true,
        trim:true
    },
},{timestamps:true})

// Main Schema
const chatSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }],
    messages:[messageSchema]

},{timestamps:true})


const Chat = mongoose.model("Chat",chatSchema)

export default Chat