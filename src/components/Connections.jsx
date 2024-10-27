import { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import ConnectionItem from "./ConnectionItem";
const Connections = () => {
  const dispatch = useDispatch();
  const connectionsDataFromStore = useSelector((store) => store.connections);

  const getConnectionsFromApi = async () => {
    if (connectionsDataFromStore) {
      return;
    }
    const apiEndPoint = BASE_URL + "/user/connections";
    const response = await fetch(apiEndPoint, { credentials: "include" });
    const connectionsResponse = await response.json();
    if (connectionsResponse?.code === 200) {
      dispatch(addConnections(connectionsResponse?.data));
    }
  };

  useEffect(() => {
    getConnectionsFromApi();
  }, []);

  return (
    <div className="flex flex-col justify-center my-10 gap-5">
      <div className="flex justify-center">
        <h1 className="text-bold text-2xl">Connections</h1>
      </div>
      <div className="flex justify-center">
        <div className="h-96 w-72 overflow-y-auto overflow-x-hidden bg-base-200 rounded-box">
          <ul className="menu">
            {connectionsDataFromStore?.length > 0 ? (
              connectionsDataFromStore.map((connection) => (
                <ConnectionItem key={connection?._id} user={connection} />
              ))
            ) : (
              <div>No Connection found</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Connections;
