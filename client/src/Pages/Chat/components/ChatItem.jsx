import React, { useContext } from 'react'
import { AuthStore } from '../../../Store/AuthStore'
import {format, parseISO} from 'date-fns'


const ChatItem = ({ message }) => {
    const { user } = useContext(AuthStore)
    const isUserIdSame = message.userId === user._id
    const date = parseISO(message?.createdAt)

    

    return (
        <div>
            <div className={`chat space-y-1 chat-${isUserIdSame ? "end" : "start"}`}>
                <div className="chat-header">
                    <time className="text-xs opacity-50">{format(date, "d LLL HH:mm")}</time>
                </div>
                <div className={`chat-bubble ${isUserIdSame ? "bg-gray-500 text-white" : ""}`}>{message?.text}</div>
            </div>
        </div>
    )
}

export default ChatItem