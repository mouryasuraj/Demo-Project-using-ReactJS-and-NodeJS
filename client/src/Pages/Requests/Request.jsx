import { useContext, useEffect, useState } from "react"
import { AppStore } from "../../Store/AppStore"
import { handleFetchConnectionRequests } from "./services/requestService"
import RequestCard from "./components/RequestCard"

const Request = () => {

  const {setLoading, setUserRequests, userRequests} = useContext(AppStore)
  const [message, setMessage] = useState(false)

  useEffect(()=>{
    handleFetchConnectionRequests(setLoading,setUserRequests)
  },[])


  return (
    <div className="text-gray-200">
      <h1 className="m-5 text-2xl">Connection Requests ({userRequests.length}) </h1>
      <div className="m-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {userRequests.length===0 ? <div>No Request found</div> : userRequests.map((request) => {
          return (
            <RequestCard key={request._id} setMessage={setMessage} requestId={request._id} request={request.fromUserId} />
          );
        })}
      </div>
    </div>
  )
}

export default Request