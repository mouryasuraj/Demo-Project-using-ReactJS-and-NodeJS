import socket from 'socket.io-client'

const createSocketConnection = () =>{
    return socket(import.meta.env.VITE_BACKEND_IP)
}

export default createSocketConnection