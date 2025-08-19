import { useContext, useEffect, useState } from "react";
import ProfileForm from "./components/ProfileForm";
import ProfileCard from "./components/ProfileCard";
import { AuthStore } from "../../Store/AuthStore";

const Profile = () => {
  const { user } = useContext(AuthStore);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAge(user.age);
    setAbout(user.about);
    setPhotoUrl(user.photoUrl);
    setGender(user.gender);
  }, [user]);

  return (
    <div className="flex items-stretch justify-center gap-5 mt-10">
      <ProfileForm
        userData={{
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
        }}
        userId={user._id}
      />
      <ProfileCard
        userData={{
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
        }}
      />
    </div>
  );
};

export default Profile;
