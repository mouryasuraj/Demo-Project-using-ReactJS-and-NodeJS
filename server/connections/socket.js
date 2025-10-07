import { Server } from "socket.io";
import generateRoomId from "../utils/generateRoomId.js";
import Chat from "../models/chat.model.js";
import ConnectionRequest from "../models/connections.model.js";
import CryptoJS from "crypto-js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
    path: "/socket.io/",
  });
  io.on("connection", (socket) => {

    
    // Verify Token
    const token = socket.handshake.auth.token
    const decrypt = CryptoJS.AES.decrypt(token, process.env.SECRET_KEY)
    const originalText = decrypt.toString(CryptoJS.enc.Utf8)
    if(originalText!==process.env.socketconnectiontokenkey){
        throw new Error("Verification failed")
    }


    // To Join the chat with room id
    socket.on("joinchat", ({ fullName, toUserId, userId }) => {
      const roomId = generateRoomId(userId, toUserId);
      socket.join(roomId);
      console.log(fullName, " has joined room ", roomId);
    });

    // Event on send message
    socket.on("sendmessage", async (data) => {
      try {
        const { userId, toUserId, text } = data;
        const roomId = generateRoomId(userId, toUserId);

        // Check the users have connections or not with accepted status
        const connectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId:userId, toUserId},
                {fromUserId:toUserId, toUserId:userId},
            ],
            status:"accepted"
        })
        if(!connectionRequest){
            throw new Error("Connection Request not found between: ",toUserId," ", userId)
        }


        // Save messages to db
        let chat = await Chat.findOne({
          participants: { $all: [userId, toUserId] }
        }).select("-messages.updatedAt")
        if (!chat) {
          chat = new Chat({
            participants: [userId, toUserId],
            messages: [],
          });
        }

        chat.messages.push({
            userId,
            text
        });
        const newChats = await chat.save();

        io.to(roomId).emit("messagereceived", newChats);
    } catch (error) {
          console.error("Something went wrong: ",error);
      }
    });
  });
};

export default initializeSocket;
