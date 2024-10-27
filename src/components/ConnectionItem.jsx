import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { addRequests } from "../utils/requestsRecievedSlice";
const ConnectionItem = ({ user, requestFlag }) => {
  const dispatch = useDispatch();

  const reviewRequest = async (status) => {
    const reviewRequestApi = `${BASE_URL}/request/review/${user._id.toString()}/${status}`;
    const response = await fetch(reviewRequestApi, {
      method: "POST",
      credentials: "include",
    });
    const requestResponse = await response.json();

    if (requestResponse?.code === 200) {
      const response = await fetch(`${BASE_URL}/user/requests/recieved`, {
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData?.code === 200) {
        dispatch(addRequests(responseData?.data));
      }
    }
  };

  const acceptRequest = () => reviewRequest("accepted");
  const rejectRequest = () => reviewRequest("rejected");

  return (
    <>
      <li className="h-16">
        <a>
          <img
            height={40}
            width={40}
            className="rounded-full"
            src={user?.photoUrl}
          />
          <p className="text-xl">{user?.firstName + " " + user?.lastName}</p>
        </a>
      </li>
      {requestFlag && (
        <div className="flex justify-center gap-2 my-5">
          <button onClick={acceptRequest} className="btn btn-primary">
            Accept
          </button>
          <button onClick={rejectRequest} className="btn btn-secondary">
            Reject
          </button>
        </div>
      )}
    </>
  );
};

export default ConnectionItem;
