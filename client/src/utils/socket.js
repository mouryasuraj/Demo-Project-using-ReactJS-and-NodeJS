import socket from 'socket.io-client'

const createSocketConnection = () =>{
    return socket(import.meta.env.VITE_BASE_URL)
}

export default createSocketConnection