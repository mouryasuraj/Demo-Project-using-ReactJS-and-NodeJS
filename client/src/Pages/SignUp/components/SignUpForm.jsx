import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { handleSignUp } from "../services/signupServices";
import { AppStore } from "../../../Store/AppStore";

const SignUpForm = () => {
    const {setShowToast, setToastMessage, setToastType,setLoading} = useContext(AppStore)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp(fullName, email, password,setShowToast, setToastMessage, setToastType, setFullName, setEmail, setPassword,setLoading);
      }}
    >
      <div className="flex flex-col gap-1">
        <legend className="text-sm">Full Name</legend>
        <input
          required
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="text-[12px] p-2 border-2 border-gray-500 rounded-sm outline-none"
          placeholder="Full Name"
          />
      </div>
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
        <button className="btn btn-primary w-full">Sign Up</button>
      </div>
      <div className="flex items-center justify-end">
        <Link className="hover:underline text-blue-500" to="/login">
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
