import makeRequest from "../../../axios";

export const handleSignUp = async (
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
) => {
  setLoading(true);
  const payload = {
    fullName,
    email,
    password,
    age,
    photoUrl,
  };
  try {
    const res = await makeRequest.post("/auth/signup", payload);
    console.log("response", res.data);
    setShowToast(true);
    setToastMessage("User Created Successfully. Please login");
    setToastType("success");
    setFullName("");
    setEmail("");
    setPassword("");
    setAge("") 
    setPhotoUrl("")
  } catch (error) {
    console.log("Something went wrong: ", error);
    setShowToast(true);
    setToastMessage("Something went wrong");
    setToastType("error");
  } finally {
    setLoading(false);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
      setToastType("");
    }, 4000);
  }
};
