import { useContext, useEffect } from "react";
import { AuthStore } from "../Store/AuthStore";
import { useNavigate } from "react-router-dom";
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
    return <Loader />
  }

  return <>{children}</>;
};

export default ProtectedRoute;
