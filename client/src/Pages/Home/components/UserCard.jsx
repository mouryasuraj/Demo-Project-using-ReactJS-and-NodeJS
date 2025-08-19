
import { useContext } from "react";
import { AppStore } from "../../../Store/AppStore";
import { handleSendRequest } from "../services/homeService";

const UserCard = ({ user }) => {
  const {setFeed, setLoading} = useContext(AppStore)
  const { _id, photoUrl, firstName, lastName, age, gender, about } = user;


  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="p-3">
        <img src={photoUrl} alt="Shoes" className="h-[200px] rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + ", " + gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              handleSendRequest(setLoading, setFeed, _id, "ignored")
            }}
            className="btn btn-primary"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              handleSendRequest(setLoading, setFeed, _id, "interested")
            }}
            className="btn btn-secondary"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
