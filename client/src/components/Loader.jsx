import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-black opacity-[0.6] absolute top-0 left-0 flex items-center justify-center">
      <span className="loading text-white loading-xl"></span>
    </div>
  );
};

export default Loader;
