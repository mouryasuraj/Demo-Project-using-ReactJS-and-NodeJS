import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppStore } from "../../../Store/AppStore";
import { handleGotoChat } from "../services/connectionsService";

const ConnectionCard = ({ connection }) => {
  const { fullName, age, photoUrl, about, _id } = connection;
  const { setCurrChatUser } = useContext(AppStore)
  const navigate = useNavigate()



  return (
    <div className="flex gap-3 bg-gray-600 p-3 rounded-xl">
      <div>
        <img
          src={photoUrl}
          className="w-20 h-20 rounded-lg bg-center bg-cover bg-no-repeat"
          alt={fullName + " Profile"}
        />
      </div>
      <div className="space-y-4">
        <h2 className="font-bold">{fullName}, {age && age}</h2>
        <p onClick={() => {
          handleGotoChat(navigate, _id, connection, setCurrChatUser)
        }} className="btn ">💬 Chat</p>
      </div>
    </div>
  );
};

export default ConnectionCard;
