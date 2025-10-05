
import makeRequest from "../../../axios";

export const handleFetchConnections = async (setConnections, setLoading) => {
  setLoading(true);

  try {
    const res = await makeRequest.get("/user/connections");
    setConnections(res?.data?.data || []);
  } catch (error) {
    console.log("Something went wrong: ", error);
  } finally {
    setLoading(false);
  }
};



export const handleGotoChat = (navigate, id, chatUserData,setCurrChatUser) =>{
  setCurrChatUser(chatUserData)
  navigate(`/chat/${id}`)
}