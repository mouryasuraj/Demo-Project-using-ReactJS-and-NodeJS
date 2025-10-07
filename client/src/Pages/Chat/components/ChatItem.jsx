import React, { useContext } from 'react'
import { AuthStore } from '../../../Store/AuthStore'

const ChatItem = ({ message }) => {
    const { user } = useContext(AuthStore)
    const isUserIdSame = message.userId === user._id
    console.log("isUserasdfsdf", user, message, isUserIdSame)

    return (
        <div>
            <div className={`chat space-y-1 chat-${isUserIdSame ? "end" : "start"}`}>
                <div className="chat-header">
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className={`chat-bubble ${isUserIdSame ? "bg-gray-500 text-white" : ""}`}>{message?.text}</div>
            </div>
        </div>
    )
}

export default ChatItem