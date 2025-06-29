import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../services/loginService";
import { AuthStore } from "../../../Store/AuthStore";
import { AppStore } from "../../../Store/AppStore";

const LoginForm = () => {
  const { setUser, user } = useContext(AuthStore);
  const { setShowToast, setToastMessage, setToastType,setLoading } = useContext(AppStore);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(email, password, navigate, setUser,setShowToast, setToastMessage, setToastType,setLoading );
      }}
    >
      <div className="flex flex-col gap-1">
        <legend className="text-sm">Email</legend>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-[12px] p-2 border-2 border-gray-500 rounded-sm outline-none"
          placeholder="Email"
        />
      </div>
      <div className="flex flex-col gap-1">
        <legend className="text-sm">Password</legend>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-[12px] p-2 border-2 border-gray-500 rounded-sm outline-none"
          placeholder="Password"
        />
      </div>

      <div className="justify-end card-actions my-3">
        <button className="btn btn-primary w-full">Login</button>
      </div>
      <div className="flex items-center justify-end">
        <Link className="hover:underline text-blue-500" to="/signup">
          Create an account?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
