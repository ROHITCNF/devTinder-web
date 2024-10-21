import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";
const Body = () => {
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
