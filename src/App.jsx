import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/body";
import Login from "./components/login";
import Profile from "./components/Profile";

/*
  All the thing will be inside the App component 

*/
const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {/* Children routes */}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
