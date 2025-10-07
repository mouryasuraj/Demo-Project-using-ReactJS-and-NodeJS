import { Server } from "socket.io";
import generateRoomId from "../utils/generateRoomId.js";
import Chat from "../models/chat.model.js";

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
        console.log("message sent successfully", chat);
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
