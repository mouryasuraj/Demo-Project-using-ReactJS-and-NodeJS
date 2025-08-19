
import makeRequest from "../../../axios"

export const handleSendRequest = async (setLoading, setFeed, _id, status) =>{
    setLoading(true)
    try {
        const res = await makeRequest.post(`/request/send/${status}/${_id}`)
        console.log("res",res.data)
        setFeed(prev => prev.filter(item => item._id !== _id));
    } catch (error) {
        console.log("Something went wrong: ", error)
    } finally{
        setLoading(false)
    }
}