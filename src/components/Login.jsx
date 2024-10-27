import { useEffect, useState } from "react";
import Failed from "./Toaster/Failed";
import Success from "./Toaster/success";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";

const login = () => {
  const [emailId, setEmailId] = useState("simran@gmail.com");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState();

  const [errorMessage, setErrorMessage] = useState("");
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navigateUserToFeed = () => {
    navigate("/feed");
  };
  const handleLogin = async () => {
    console.log("Handle Login");

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
        navigateUserToFeed();
      } else {
        setErrorMessage("Error: " + responseData?.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const signUpApi = "http://localhost:7777/signup";
      const params = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: emailId,
          password: password,
          age: age,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
        }),
      };
      const response = await fetch(signUpApi, params);
      const signUpData = await response.json();
      if (signUpData?.code === 200) {
        handleSignUpPageToShow();
      } else {
        setErrorMessage("User Validation Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignUpPageToShow = () => {
    setErrorMessage("");
    setShowSignUpPage(!showSignUpPage);
  };
  const checkIfuserIsLoggedIn = async () => {
    // this gatekeeper Api must be hit before Calling the login page
    // If User token is valid then directly navigate the user to feed page
    try {
      const gatekeeperApi = BASE_URL + "/gatekeeperAuth";
      const user = await fetch(gatekeeperApi, { credentials: "include" });
      const userData = await user.json();
      if (userData?.code === 200) {
        navigateUserToFeed();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfuserIsLoggedIn();
  }, []);

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-gray-950 text-primary-content w-96">
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
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                placeholder="Password"
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {showSignUpPage && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">firstname</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="firstName"
                    className="input input-bordered w-full max-w-xs text-white"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">lastName</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="lastName"
                    className="input input-bordered w-full max-w-xs text-white"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">age</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    placeholder="age"
                    className="input input-bordered w-full max-w-xs text-white"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    placeholder="gender"
                    className="input input-bordered w-full max-w-xs text-white"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
              </>
            )}
          </div>
          <p className="text-red-500 bold">{errorMessage}</p>

          <div className="card-actions justify-center">
            <button
              className="btn bg-cyan-500 hover:bg-cyan-600"
              onClick={showSignUpPage ? handleSignUp : handleLogin}
            >
              {showSignUpPage ? "Signup" : "Login"}
            </button>
          </div>

          {/* SignUp content */}
          {!showSignUpPage ? (
            <div className="flex justify-center">
              <p
                className="text-white text-sm cursor-pointer"
                onClick={handleSignUpPageToShow}
              >
                New User SignUp ?
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <p
                className="text-white text-sm cursor-pointer"
                onClick={handleSignUpPageToShow}
              >
                Existing user , Login?
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default login;
