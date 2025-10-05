import {Server} from 'socket.io'
import generateRoomId from '../utils/generateRoomId.js'



const initializeSocket = (server) =>{
    const io = new Server(server, {
        cors:{
            origin:process.env.CLIENT_URL,
            methods:['GET','POST'],
            credentials:true
        },
        path:"/socket.io/"
    })
    io.on("connection", (socket)=>{
        // To Join the chat with room id
        socket.on("joinchat", ({fullName, toUserId, userId})=>{
            const roomId = generateRoomId(userId, toUserId)
            socket.join(roomId)
            console.log(fullName, " has joined room ", roomId)
        })

        // Event on send message
        socket.on("sendmessage", (data)=>{
            const roomId = generateRoomId(data.userId, data.toUserId)
            io.to(roomId).emit("messagereceived", data)
            console.log("message sent successfully")
        })
    })

}


export default initializeSocket