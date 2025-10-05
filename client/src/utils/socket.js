import io from "socket.io-client";

const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(import.meta.env.VITE_BACKEND_IP);
  } else {
    return io("/", {path:"/socket.io"});
  }
};

export default createSocketConnection;
