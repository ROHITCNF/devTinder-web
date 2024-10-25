import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDataFromStore = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      if (userDataFromStore) return;
      const userProfileApi = BASE_URL + "/profile/view";
      const user = await fetch(userProfileApi, { credentials: "include" });
      const userData = await user.json();
      // Now update the store
      if (userData?.code === 200) {
        dispatch(addUser(userData?.data));
      } else if (userData?.code === 401) {
        //user is not logged in throw the user to login Page
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      {/* Any children routes of the body will render here */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
