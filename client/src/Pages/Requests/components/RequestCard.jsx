
import { handleReviewConnection } from "../services/requestService";
import { useContext } from "react";
import { AppStore } from "../../../Store/AppStore";

const RequestCard = ({ request, requestId, setMessage }) => {
  const { setLoading, setUserRequests } = useContext(AppStore);
  const { fullName, age, photoUrl, about } = request;

  return (
    <div className="flex gap-3 items-center bg-gray-600 p-3 rounded-xl">
      <div>
        <img
          src={photoUrl}
          className="w-25 h-25 rounded-lg bg-center bg-cover bg-no-repeat"
          alt={fullName + " Profile"}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">
          {fullName}, {age && age}
        </h2>
        <div className="space-x-3">
          <button
            onClick={() =>
              handleReviewConnection(
                setLoading,
                setUserRequests,
                "rejected",
                requestId,
                setMessage
              )
            }
            className="btn btn-error"
          >
            Reject
          </button>
          <button
            onClick={() =>
              handleReviewConnection(
                setLoading,
                setUserRequests,
                "accepted",
                requestId,
                setMessage
              )
            }
            className="btn btn-success"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
