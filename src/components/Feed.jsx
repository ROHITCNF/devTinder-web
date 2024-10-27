import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const feedDataInStore = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feedDataInStore?.length) {
        return;
      }
      const feedApi = BASE_URL + "/user/feed";
      const response = await fetch(feedApi, { credentials: "include" });
      const feedResponse = await response.json();
      if (feedResponse?.code === 200) {
        dispatch(addFeed(feedResponse?.data));
      }
    } catch (error) {
      console.log(error);
    }
    // After getting the feed add/update the feed
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      {feedDataInStore?.length ? (
        <div className="flex justify-center my-10">
          <UserCard user={feedDataInStore[0]} />
        </div>
      ) : (
        <div className="flex justify-center my-10">
          You have checked out all the Devs here
        </div>
      )}
    </>
  );
};

export default Feed;
