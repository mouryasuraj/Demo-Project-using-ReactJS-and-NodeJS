import React from "react";

const ProfileCard = ({ userData }) => {
  const { fullName, age, photoUrl } = userData;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="p-3">
        <img src={photoUrl} alt="Shoes" className="h-[200px] rounded-xl" />
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-4">
          <h2 className="card-title">{fullName}</h2>
          <p>{age}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
