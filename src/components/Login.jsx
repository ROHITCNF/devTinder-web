import { useState } from "react";
import Failed from "./Toaster/Failed";
import Success from "./Toaster/success";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const login = () => {
  const [emailId, setEmailId] = useState("simran@gmail.com");
  const [password, setPassword] = useState("abcdef");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginApi = "http://localhost:7777/login";
      const params = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: emailId,
          password: password,
        }),
      };
      const response = await fetch(loginApi, params);
      const responseData = await response.json();
      if (responseData?.code === 200) {
        dispatch(addUser(responseData?.data));
        navigate("/feed");
      } else {
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <div className="py-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
      {/* {loginStatus === true && <Success />}
      {loginStatus === false && <Failed />} */}
    </div>
  );
};

export default login;
