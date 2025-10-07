import io from "socket.io-client";
import encrypt from "./encrypt";

const createSocketConnection = () => {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return io(import.meta.env.VITE_BACKEND_IP, {
      path: "/socket.io/",
      auth: {
        token: encrypt(import.meta.env.VITE_SOCKETCONNECTION_TOKEN_KEY),
      },
    });
  } else {
    // For production - use the same origin with correct path
    return io({
      path: "/socket.io/",
      transports: ["websocket", "polling"], // Explicitly specify transports
      auth: {
        token: encrypt(import.meta.env.VITE_SOCKETCONNECTION_TOKEN_KEY),
      },
    });
  }
};

export default createSocketConnection;
