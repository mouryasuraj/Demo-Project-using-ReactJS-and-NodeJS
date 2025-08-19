import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { AuthStore } from "../Store/AuthStore";
import makeRequest from "../axios";
import { AppStore } from "../Store/AppStore";

const Navbar = () => {
  const { user } = useContext(AuthStore)
  const { setLoading, loading } = useContext(AppStore)
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true)
    try {
      const res = await makeRequest.post("/auth/logout");
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Something went wrong: ", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="w-full sticky top-0 left-0 z-[100]">
      <div className="navbar bg-gray-900 text-white shadow-sm">
        <div className="flex-1">
          <Link to="/home" className="cursor-pointer font-semibold text-xl">
            Developer Tinder
          </Link>
        </div>
        {user ? (
          <div className="flex">
            <div className="indicator mr-10">
              <Link to="/home/requests" className="btn btn-accent">
                Connection Requests
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p>Welcome, {user && user?.firstName}</p>
              </div>
              <div className="dropdown dropdown-end mr-3">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="Profile Picture" src={user?.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-lg dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/home/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/home/connections">Connections</Link>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        handleLogout();
                      }}
                    >
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
      {loading && <Loader />}
    </div>
  );
};

export default Navbar;
