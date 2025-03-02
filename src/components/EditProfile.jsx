import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/Constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
const EditProfile = ({ user }) => {
  if(!user){
    return <div> Loading...</div>
  }
  const dispatch = useDispatch();
  const [showToaster, setShowToaster] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  let skillsToShow = "";
  try {
    skillsToShow = user?.skills ? user.skills.join(",") : "";
  } catch (error) {
    console.log(error);
  }

  const [emailId, setEmailId] = useState(user?.emailId);
  const [firstName, setFirstname] = useState(user?.firstName);
  const [lastName, setLastname] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [password, setPassword] = useState(user?.password);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [skills, setSkills] = useState(skillsToShow);

  const [errorMessage, setErrorMessage] = useState("");
    

  const handleEditProfile = async () => {
    try {
      const editProfileAPi = BASE_URL + "/profile/edit";
      const params = {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          firstName: firstName,
          lastName: lastName,
          age: age,
          gender: gender,
          about: about,
          photoUrl: photoUrl,
          skills: skills.split(","),
        }),
      };
      const response = await fetch(editProfileAPi, params);
      const editedProfileResponse = await response.json();
      if (editedProfileResponse?.code === 200) {
        // update the store object
        dispatch(addUser(editedProfileResponse?.data));
        setShowToaster(true);
        setToastMessage(editedProfileResponse?.message);
        setTimeout(() => {
          setShowToaster(false);
          setToastMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(user && Object.keys(user).length){
    setEmailId(user?.emailId);
    setFirstname(user?.firstName);
    setLastname(user?.lastName);
    setAge(user?.age);
    setGender(user?.gender);
    setAbout(user?.about);
    setPassword(user?.password);
    setPhotoUrl(user?.photoUrl);
    }
  },[user]);

  return (
    <div className="flex justify-center my-10 gap-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-gray-950 text-primary-content w-96">
          <div className="card-body">
            <div className="py-2">
              <div className="flex justify-center">
                <h2 className="text-white ">Edit Profile</h2>
              </div>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  disabled
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
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="firstName"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs text-white"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="lastName"
                  className="input input-bordered w-full max-w-xs text-white"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
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
                  <span className="label-text">Gender</span>
                </div>
                <input
                  disabled
                  type="text"
                  value={gender}
                  placeholder="gender"
                  className="input input-bordered w-full max-w-xs text-white"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Img-Url</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  placeholder="photoUrl"
                  className="input input-bordered w-full max-w-xs text-white"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  placeholder="about"
                  className="input input-bordered w-full max-w-xs text-white"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
              {/* Skills will be in the array , split at each comma and populate  */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Skills</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  placeholder="skills"
                  className="input input-bordered w-full max-w-xs text-white"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label>
            </div>
            <p className="text-red-500 bold">{errorMessage}</p>
            <div className="card-actions justify-center">
              <button
                className="btn bg-cyan-500 hover:bg-cyan-600"
                onClick={handleEditProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Profile View */}
      <div>
        <UserCard
          user={{ firstName, lastName, about, age, gender, photoUrl , toShowButtons : false }}
        />
      </div>
      {/* Toaster */}
      {showToaster && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
