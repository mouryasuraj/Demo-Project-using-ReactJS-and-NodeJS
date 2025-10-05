import React, { useContext } from 'react'
import { AuthStore } from '../../../Store/AuthStore'

const ChatItem = ({ message }) => {
    const { user } = useContext(AuthStore)
    const isUserIdSame = message.userId === user._id
    console.log("isUserasdfsdf", user)

    return (
        <div>
            <div className={`chat space-y-1 chat-${isUserIdSame ? "end" : "start"}`}>
                {/* <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="user_photo_url"
                            src={message.photoUrl}
                        />
                    </div>
                </div> */}
                <div className="chat-header">
                    {/* {message?.fullName} */}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className={`chat-bubble ${isUserIdSame ? "bg-gray-500 text-white" : ""}`}>{message?.text}</div>
                {/* <div className="chat-footer opacity-50">Delivered</div> */}
            </div>
        </div>
    )
}

export default ChatItem