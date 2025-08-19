import { useContext, useEffect } from "react";
import UserCard from "./components/UserCard";
import makeRequest from "../../axios";
import { AppStore } from "../../Store/AppStore";

const Home = () => {
  const { setFeed, feed } = useContext(AppStore);

  const getAllFeed = async () => {
    try {
      const res = await makeRequest.get("/user/feed");
      setFeed(res?.data?.data || []);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    if (feed.length === 0) {
      getAllFeed();
    }
  }, []);

  return (
    <div className="flex text-gray-200 items-center justify-center">
      {feed.length !== 0 ? (
        <UserCard user={feed[0]} totalFeed={feed.length} />
      ) : (
        <p>No user to show</p>
      )}
    </div>
  );
};

export default Home;
