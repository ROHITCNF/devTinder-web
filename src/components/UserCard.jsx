import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/Constants";
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, photoUrl, about  , toShowButtons} = user;

  const handleSendRequest = async (staus) => {
    try {
      const api = BASE_URL + `/request/send/${user._id}/${staus}`;
      const response = await fetch(api, {
        method: "POST",
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData?.code === 200) {
        // update the store
        const feedApi = BASE_URL + "/user/feed";
        const response = await fetch(feedApi, { credentials: "include" });
        const feedResponse = await response.json();
        if (feedResponse?.code === 200) {
          dispatch(addFeed(feedResponse?.data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl">
      <figure className="py-5" >
        <img className="rounded-full h-72" src={user?.photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + " " + gender}</p>
        <p>{about}</p>
        {toShowButtons && (
            <div className="card-actions flex justify-center gap-3 py-4">
            <button
              onClick={() => handleSendRequest("ignored")}
              className="btn btn-primary"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("intrested")}
              className="btn btn-secondary"
            >
              Intrested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
