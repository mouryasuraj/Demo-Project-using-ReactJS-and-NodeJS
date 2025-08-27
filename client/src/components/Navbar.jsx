import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { AuthStore } from "../Store/AuthStore";
import makeRequest from "../axios";
import { AppStore } from "../Store/AppStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { user, setUser } = useContext(AuthStore);
  const { setLoading, loading,setConnections, setFeed,setUserRequests } = useContext(AppStore);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("/auth/logout");
      if (res.status === 200) {
        navigate("/login");
        setConnections([])
        setFeed([])
        setUserRequests([])
        setUser(null);
      }
    } catch (error) {
      console.log("Something went wrong: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sticky top-0 left-0 z-[100]">
      <div className="navbar bg-gray-900 text-white shadow-sm">
        <div className="flex-1">
          <Link
            to="/home"
            className="flex items-center gap-2 cursor-pointer font-semibold text-xl"
          >
            Developer Tinder
            <FontAwesomeIcon
              className="cursor-pointer text-xl"
              icon={`fa-solid fa-house-user`}
            />
          </Link>
        </div>
        {user ? (
          <div className="flex">
            <div className="indicator mr-10">
              <Link to="/requests" className="btn btn-accent">
                Connection Requests
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p>Welcome, {user && user?.fullName}</p>
              </div>
              <div className="dropdown dropdown-end mr-3">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="Profile Picture" src={user && user?.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-lg dropdown-content bg-gray-600 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile">
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={`fa-solid fa-user`}
                      />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/premium">
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={`fa-solid fa-crown`}
                      />
                      Premium
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={`fa-solid fa-people-line`}
                      />
                      Connections
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={`fa-solid fa-arrow-right-from-bracket`}
                      />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn border-2 border-white hover:bg-gray-200 hover:border-gray-200"
          >
            Login/SignUp
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
