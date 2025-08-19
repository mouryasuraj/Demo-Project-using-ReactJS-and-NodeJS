import React from "react";
import SignUpForm from "./components/SignUpForm";

const SignUp = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-gray-800 min-h-screen">
      <h1 className="card-title font-bold text-2xl text-gray-200">
        Sign Up
      </h1>
      <div className="card w-96 bg-base-100 card-md border-2  shadow-xl border-gray-200">
        <div className="card-body">
          <h2 className="card-title font-bold">Sign Up</h2>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
