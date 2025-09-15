import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Toast from "./components/Toast";
import { useContext, useEffect } from "react";
import { AppStore } from "./Store/AppStore";
import ProtectedRoute from "./components/ProtectedRoute";
import makeRequest from "./axios";
import { AuthStore } from "./Store/AuthStore";
import Loader from "./components/Loader";
// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Layout from "./components/Layout";
import ReturnPolicy from "./Pages/Policy/ReturnPolicy";
import RefundPolicy from "./Pages/Policy/RefundPolicy";
import PrivacyPolicy from "./Pages/Policy/PrivacyPolicy";
import Disclaimer from "./Pages/Policy/Disclaimer";
import AboutAndContact from "./Pages/Policy/AboutAndContact";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Connections from "./Pages/Connections/Connections";
import Request from "./Pages/Requests/Request";
import Premium from "./Pages/Premium/Premium";
import Chat from "./Pages/Chat/Chat";

library.add(fas, far, fab);

function App() {
  const { showToast, toastMessage, toastType, loading, setLoading } =
    useContext(AppStore);
  const { setUser } = useContext(AuthStore);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("/auth/verify");
      setUser(res.data.user);
      navigate("/home");
    } catch (error) {
      setUser(null);
      navigate("/login");
      console.log("Something went wrong: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Policies */}
          <Route path="/returnpolicy" element={<ReturnPolicy />} />
          <Route path="/refundpolicy" element={<RefundPolicy />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/aboutandcontact" element={<AboutAndContact />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connections"
            element={
              <ProtectedRoute>
                <Connections />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Request />
              </ProtectedRoute>
            }
          />
          <Route
            path="/premium"
            element={
              <ProtectedRoute>
                <Premium />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:userId"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      {showToast && <Toast message={toastMessage} type={toastType} />}
      {loading && <Loader />}
    </>
  );
}

export default App;
