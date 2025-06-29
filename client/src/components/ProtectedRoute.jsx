import { useContext, useEffect } from "react";
import { AuthStore } from "../Store/AuthStore";
import { useNavigate } from "react-router-dom";
import makeRequest from "../axios";
import { AppStore } from "../Store/AppStore";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthStore);
  const navigate = useNavigate();


  useEffect(()=>{
    if(!user){
        navigate('/login')
    }
  },[])


  if(!user){
    <Loader />
  }

  return <>{children}</>;
};

export default ProtectedRoute;
