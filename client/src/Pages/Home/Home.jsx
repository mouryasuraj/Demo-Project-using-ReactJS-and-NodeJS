import React, { useContext } from 'react'
import { AuthStore } from '../../Store/AuthStore'
import makeRequest from '../../axios';
import { useNavigate } from 'react-router-dom';
import { AppStore } from '../../Store/AppStore';

const Home = () => {
    const {user,setUser} = useContext(AuthStore)
    const {setLoading,setShowToast, setToastMessage, setToastType} = useContext(AppStore)
    const navigate = useNavigate()
    console.log(user);

    const handleLogout = async () =>{
        setLoading(true)
        try {
            const res = await makeRequest.get("/auth/logout")
            console.log(res.data)
            setToastMessage(res.data.message)
            setShowToast(true)
            setToastType("success")
            setUser(null)
            navigate("/login")
        } catch (error) {
            setToastMessage("someting went wrong")
            setShowToast(true)
            setToastType("error")
            console.log("someting went wrong: ", error)
        }finally{
            setLoading(false)
            setToastMessage("")
            setShowToast(false)
            setToastType("")
        }
    }
    
  return (
    <div className='flex items-center justify-between p-4'>
        <p>Home</p>
         <button onClick={handleLogout} className="btn btn-primary">Log Out</button>
         
    </div>

  )
}

export default Home