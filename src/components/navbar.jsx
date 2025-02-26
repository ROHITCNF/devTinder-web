import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  // Subscribe to 'user' store
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogoutUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/logout", {
        method: "POST",
        credentials: "include",
      });
      //Clear the user data from the store
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      dispatch(removeUser());
      console.log(error);
      navigate("/login");
    }
  };

  // TO DO :- Show the Img url of user in dynamic way
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to={'/feed'}> <span className="btn btn-ghost text-xl">dEvTiNdEr</span></Link>
      </div>
     {user ?  <div className="flex-none gap-2 mx-5">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">connections</Link>
            </li>
            <li>
              <Link to="/requests">requests</Link>
            </li>
            <li>
              <a onClick={handleLogoutUser}>Logout</a>
            </li>
            <li>
              <Link to="/feed">Feed</Link>
            </li>
          </ul>
        </div>
      </div>: ``}
    </div>
  );
};
export default Navbar;
