import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { handleSignUp } from "../services/signupServices";
import { AppStore } from "../../../Store/AppStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUpForm = () => {
  const { setShowToast, setToastMessage, setToastType, setLoading } =
    useContext(AppStore);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState("https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg"
  );
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp(
          fullName,
          email,
          password,
          age,
          photoUrl,
          setAge,
          setPhotoUrl,
          setShowToast,
          setToastMessage,
          setToastType,
          setFullName,
          setEmail,
          setPassword,
          setLoading
        );
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
        <div className="flex items-center p-2 border-2 border-gray-500 rounded-sm">
          <input
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-[12px] w-full outline-none "
            placeholder="Password"
          />
          <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" icon={`fa-solid fa-${showPassword ? "eye-slash" : "eye"}`} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <legend className="text-sm">Age</legend>
        <input
          required
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="text-[12px] p-2 border-2 border-gray-500 rounded-sm outline-none"
          placeholder="Age"
        />
      </div>
      <div className="flex flex-col gap-1">
        <legend className="text-sm">Photo URL</legend>
        <input
          required
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          className="text-[12px] p-2 border-2 border-gray-500 rounded-sm outline-none"
          placeholder="Photo URL"
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
