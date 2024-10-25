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
      if (feedDataInStore) {
        console.log("feedDataInStore Is their so Api call will not happen");
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
    feedDataInStore && (
      <div className="flex justify-center my-10">
        <UserCard user={feedDataInStore[0]} />
      </div>
    )
  );
};

export default Feed;
