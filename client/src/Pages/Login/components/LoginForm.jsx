import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../services/loginService";
import { AuthStore } from "../../../Store/AuthStore";
import { AppStore } from "../../../Store/AppStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = () => {
  const { setUser, user } = useContext(AuthStore);
  const { setShowToast, setToastMessage, setToastType, setLoading } =
    useContext(AppStore);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(
          email,
          password,
          navigate,
          setUser,
          setShowToast,
          setToastMessage,
          setToastType,
          setLoading
        );
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
        <div className="flex items-center p-2 border-2 border-gray-500 rounded-sm">
          <input
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-[12px] w-full outline-none "
            placeholder="Password"
          />
          <FontAwesomeIcon
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
            icon={`fa-solid fa-${showPassword ? "eye-slash" : "eye"}`}
          />
        </div>
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
