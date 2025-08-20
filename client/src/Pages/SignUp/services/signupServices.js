import makeRequest from "../../../axios";
import validator from 'validator'

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
  setLoading,
  setErrorMessage,
  navigate
) => {
  // Validate Field
  if(!validator.isEmail(email)){
    setErrorMessage("Email is not valid.")
    return
  }else if(!validator.isStrongPassword(password, {minLength:8, minLowercase:1, minNumbers:1, minSymbols:1, minUppercase:1})){
    setErrorMessage("Password must be at least 8 characters long and include uppercase, lowercase, number, and special symbol.")
    return
  }else if (age<18 || age>200){
    setErrorMessage("Age should be 18 or above")
    return
  }else if(!validator.isURL(photoUrl)){
    setErrorMessage("URL should be valid and https")
    return
  }else{
    setErrorMessage("")
  }
  
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
    setToastMessage("Account has been created Successfully. Please login");
    setToastType("success");
    setFullName("");
    setEmail("");
    setPassword("");
    setAge("") 
    setPhotoUrl("")
    navigate("/login")
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
