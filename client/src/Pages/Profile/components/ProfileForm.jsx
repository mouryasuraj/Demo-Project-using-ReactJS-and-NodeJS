import { useContext, useState } from "react";
import { handleUpdateProfile } from "../services/proflieService";
import { genders } from "../../../utils/constants";
import { AuthStore } from "../../../Store/AuthStore";
import { AppStore } from "../../../Store/AppStore";

const ProfileForm = ({ userData, userId }) => {
  const {setUser} = useContext(AuthStore)
  const {setLoading} = useContext(AppStore)
  const [toastMsg, setToastMsg] = useState("");

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    gender,
    setGender,
    photoUrl,
    setPhotoUrl,
    about,
    setAbout,
  } = userData;


  const payload = {
    fullName:firstName+" "+lastName,
    photoUrl
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateProfile(setLoading, setUser, payload, userId, setToastMsg);
        }}
        className="card-body"
      >
        <div className="space-y-2 my-2">
          <div>
            <label className="">First Name</label>
            <input
              required
              value={firstName}
              onChange={(e) => {
                const inputVal = e.target.value;
                setFirstName(inputVal);
              }}
              type="text"
              className="input mt-1 "
            />
          </div>
          <div>
            <label className="">Last Name</label>
            <input
              required
              value={lastName}
              onChange={(e) => {
                const inputVal = e.target.value;
                setLastName(inputVal);
              }}
              type="text"
              className="input mt-1 "
            />
          </div>
          <div>
            <label className="">Photo URL</label>
            <input
              required
              value={photoUrl}
              onChange={(e) => {
                const inputVal = e.target.value;
                setPhotoUrl(inputVal);
              }}
              type="text"
              className="input mt-1 "
            />
          </div>
        </div>
        <div className="card-actions">
          <button className="btn btn-primary w-full">Save Profile</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
