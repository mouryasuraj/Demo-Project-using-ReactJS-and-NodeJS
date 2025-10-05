import io from "socket.io-client";

const createSocketConnection = () => {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return io(import.meta.env.VITE_BACKEND_IP, {
      path: "/socket.io/"
    });
  } else {
    // For production - use the same origin with correct path
    return io({
      path: "/socket.io/",
      transports: ['websocket', 'polling'] // Explicitly specify transports
    });
  }
};

export default createSocketConnection;