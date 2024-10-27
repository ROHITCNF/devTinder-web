import { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsRecievedSlice";
import ConnectionItem from "./ConnectionItem";

const Requests = () => {
  const requestsRecievedDataFromStore = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const requestsRecieved = async () => {
    if (requestsRecievedDataFromStore) return;
    const apiEndPoint = BASE_URL + "/user/requests/recieved";
    const response = await fetch(apiEndPoint, { credentials: "include" });
    const requestsRecievedData = await response.json();
    if (requestsRecievedData?.code === 200) {
      dispatch(addRequests(requestsRecievedData?.data));
    }
  };
  useEffect(() => {
    requestsRecieved();
  }, []);

  return (
    <div className="flex flex-col justify-center my-10 gap-5">
      <div className="flex justify-center">
        <h1 className="text-bold text-2xl">Requests</h1>
      </div>
      <div className="flex justify-center">
        <ul className="menu bg-base-200 rounded-box w-96">
          {requestsRecievedDataFromStore?.length > 0 ? (
            requestsRecievedDataFromStore.map((connection) => (
              <ConnectionItem
                key={connection?.fromUserId?._id}
                user={connection?.fromUserId}
                requestFlag={true}
              />
            ))
          ) : (
            <div className=" flex justify-center">OOPS ! No requests Found</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
