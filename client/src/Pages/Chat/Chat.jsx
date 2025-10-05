import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatItem from './components/ChatItem'
import createSocketConnection from '../../utils/socket'
import { AuthStore } from '../../Store/AuthStore'
import { handleSendMessage } from './services/chatServices'

const Chat = () => {
    const { toUserId } = useParams()
    const { user } = useContext(AuthStore)

    const [chatVal, setChatVal] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (!user) return

        const socket = createSocketConnection()
        socket.emit("joinchat", { fullName: user.fullName, toUserId, userId: user._id })

        socket.on("messagereceived", (data) => {
            console.log("dd111", data)
            setMessages(prev => {
                return [...prev, data]
            })
        })
    }, [])



    return (
        <div className='w-[70%] text-gray-300  min-h-[70vh] max-h-[70vh] border-2 rounded-lg border-gray-500 flex flex-col mx-auto'>
            <h2 className='text-gray-300 p-3'>Chat</h2>
            <div className='border-t-2 rounded-lg border-gray-500 mb-3'></div>
            <div className='flex-1 px-4 overflow-auto'>
                {messages.map((message, index) => {
                   return <ChatItem key={index} message={message} />
                })}
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(user, toUserId, chatVal, setChatVal)
            }}
                className='flex items-center gap-2 px-4 py-2'>
                <input value={chatVal} onChange={(e) => {
                    setChatVal(e.target.value)
                }} className='border-none outline-none bg-gray-900 rounded-lg px-4 py-2 w-full' placeholder='type here......' type="text" />
                <button className='btn btn-primary'>Send</button>
            </form>
        </div>
    )
}

export default Chat