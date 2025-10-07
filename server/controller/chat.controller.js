import Chat from "../models/chat.model.js"

export const handleGetAllChat = async (req, res) =>{
    try {
        const {toUserId} = req.params
        const {_id} = req.user
        
        if(!toUserId) throw new Error("toUserId is not present")
        

        // Get chat from DB
        let chats = await Chat.findOne({
            participants:{$all:[_id, toUserId]}
        }).select("messages -_id")
        if(!chats){
            chats = new Chat({
                participants:[_id, toUserId],
                messages:[]
            })
        }

        res.json({success:true, chats:chats.messages})

    } catch (error) {
        console.error("Something went wrong", error)
        res.status(400).json({status:false, message:"something went wrong"})
    }
}