import {Server} from 'socket.io'



const initializeSocket = (server) =>{
    const io = new Server(server, {
        cors:{
            origin:process.env.CLIENT_URL
        }
    })
    io.on("connection", (socket)=>{
        socket.on("joinchat", ()=>{
            console.log("Chat has been joined");
            
        })
    })

}


export default initializeSocket