import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Toast from "./components/Toast";
import { useContext, useEffect } from "react";
import { AppStore } from "./Store/AppStore";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import makeRequest from "./axios";
import { AuthStore } from "./Store/AuthStore";
import Loader from "./components/Loader";
// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons"
import {far} from "@fortawesome/free-regular-svg-icons"
import {fab} from "@fortawesome/free-brands-svg-icons"

library.add(fas, far, fab)

function App() {
  const {showToast, toastMessage, toastType,loading,setLoading} = useContext(AppStore)
  const {setUser} = useContext(AuthStore)
  const navigate = useNavigate()


  const fetchUserDetails = async () =>{
    setLoading(true)
    try {
      const res = await makeRequest.get('/auth/verify');
      setUser(res.data.user)
      navigate("/home")
    } catch (error) {
      console.log("Something went wrong: ",error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
      fetchUserDetails()
  },[])



  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
      {showToast && <Toast message={toastMessage} type={toastType} />}
      {loading && <Loader />}
    </>
  );
}

export default App;
