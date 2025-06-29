import makeRequest from "../../../axios"

export const handleLogin = async (email, password,navigate, setUser,setShowToast, setToastMessage, setToastType,setLoading) =>{
    setLoading(true)
    try {
        const payload = {email, password}
        const res = await makeRequest.post("/auth/login", payload)
        setUser(res.data)
        setShowToast(true)
        setToastMessage(res.data.message)
        setToastType("success") 
        navigate("/home")
    } catch (error) {
        console.log("Someting went wrong: ", error)
        setShowToast(true)
        setToastMessage(error.response.data.message)
        setToastType("error")
    }finally{
        setLoading(false)
        setTimeout(() => {
            setShowToast(false)
            setToastMessage("")
            setToastType("") 
        }, 4000);
    }

}