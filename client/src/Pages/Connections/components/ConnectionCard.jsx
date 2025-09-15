import { Link } from "react-router-dom";

const ConnectionCard = ({ connection }) => {
  const { fullName, age, photoUrl,about,_id } = connection;
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
        <Link to={`/chat/${_id}`} className="btn ">💬 Chat</Link>
      </div>
    </div>
  );
};

export default ConnectionCard;
