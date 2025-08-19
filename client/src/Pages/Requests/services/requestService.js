
import makeRequest from "../../../axios";

export const handleFetchConnectionRequests = async (setLoading,setUserRequests) => {
  setLoading(true)
  try {
    const res = await makeRequest.get("/user/requests");
    setUserRequests(res?.data?.data || [])
  } catch (error) {
    console.error("Something went wrong: ", error);
  } finally {
    setLoading(false)
  }
};

export const handleReviewConnection = async (setLoading,setUserRequests, status, requestId,setMessage) => {
  setLoading(true)
  try {
    const res = await makeRequest.post(`/request/review/${status}/${requestId}`)
    setMessage(res.data.message)
    setUserRequests(prev => prev._id !== requestId)
  } catch (error) {
    console.error("Something went wrong: ", error);
  } finally {
    setLoading(false)
    setTimeout(() => {
        setMessage("")
    }, 3000);
  }
};
