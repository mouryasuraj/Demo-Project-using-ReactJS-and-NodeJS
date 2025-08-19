
import makeRequest from "../../../axios";

export const handleFetchConnections = async (setConnections, setLoading) => {
  setLoading(true);

  try {
    const res = await makeRequest.get("/user/connections");
    setConnections(res?.data?.data || []);
  } catch (error) {
    console.log("Something went wrong: ", error);
  } finally {
    setLoading(false);
  }
};

