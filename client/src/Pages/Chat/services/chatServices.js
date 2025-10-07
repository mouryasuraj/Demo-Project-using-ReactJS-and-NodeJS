import makeRequest from "../../../axios";
import createSocketConnection from "../../../utils/socket";

export const handleSendMessage = (user, toUserId, chatVal, setChatVal) => {
  if (!chatVal) return;
  try {
    const payload = {
      fullName: user.fullName,
      toUserId,
      userId: user._id,
      text: chatVal,
      photoUrl: user.photoUrl,
    };
    const socket = createSocketConnection();
    socket.emit("sendmessage", payload);
    setChatVal("");
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
};

export const getAllChat = async (toUserId, setMessages) => {
  if (!toUserId) throw new Error("toUserId is not present");
  try {
    const res = await makeRequest.get(`/chat/getallchat/${toUserId}`);
    const chats = res?.data?.chats?.map((msg) => {
      return {
        text: msg.text,
        userId: msg.userId,
        createdAt: msg.createdAt,
      };
    });
    setMessages(chats);
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
};
