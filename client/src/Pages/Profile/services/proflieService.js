import makeRequest from "../../../axios";

export const handleUpdateProfile = async (
  setLoading,
  setUser,
  payload,
  userId,
  setToastMsg
) => {
  setLoading(true);
  try {
    const res = await makeRequest.put(`/profile/edit/${userId}`, payload);
    setToastMsg(res.data.message);
    setUser(res.data.updatedData);
  } catch (error) {
    console.log("Something went wrong: ", error);
    setToastMsg("Something went wrong");
  } finally {
    setLoading(false);
    setTimeout(() => {
      setToastMsg("");
    }, 3000);
  }
};
