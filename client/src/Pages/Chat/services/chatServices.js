import createSocketConnection from "../../../utils/socket"

export const handleSendMessage = (user, toUserId,chatVal, setChatVal) =>{
    if(!chatVal) return
    try {
        const payload = {
            fullName:user.fullName,
            toUserId,
            userId:user._id,
            text:chatVal,
            photoUrl:user.photoUrl
        }
        const socket = createSocketConnection()
        socket.emit("sendmessage", payload)
        setChatVal("")
    } catch (error) {
        console.error("Something went wrong: ",error)
    }
}