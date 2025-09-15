import React from 'react'
import { useParams } from 'react-router-dom'
import ChatItem from './components/ChatItem'

const Chat = () => {
    const { userId } = useParams()


    return (
        <div className='w-[70%] text-gray-300  min-h-[70vh] max-h-[70vh] border-2 rounded-lg border-gray-500 flex flex-col mx-auto'>
            <h2 className='text-gray-300 p-3'>Chat</h2>
            <div className='border-t-2 rounded-lg border-gray-500 mb-3'></div>
            <div className='flex-1 px-4 overflow-auto'>
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
            }}
                className='flex items-center gap-2 px-4 py-2'>
                <input className='border-none outline-none bg-gray-900 rounded-lg px-4 py-2 w-full' placeholder='type here......' type="text" />
                <button className='btn btn-primary'>Send</button>
            </form>
        </div>
    )
}

export default Chat