import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
const Profile = () => {
  const userDataFromStore = useSelector((store) => store.user);
  return (
    <div>
      <EditProfile user={userDataFromStore} />
    </div>
  );
};

export default Profile;
