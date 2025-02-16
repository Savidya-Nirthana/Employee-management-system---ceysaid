import NavBar from "../components/NavBar";
import UserRegistration from "./UserRegistration";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../App";
const Home = () => {
  const [, , user] = useContext(Context);
  const [showNav, setShowNav] = useState(true);
  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  if (user === null) return window.location.href = "/dashboard";
  return (
    <div className=" flex flex-row gap-2  ">
      <NavBar showNav={showNav} setShowNav={setShowNav} />
      {/* <RegStepOne/> */}
      <div
        className={`duration-500 mt-[70px] w-[100%] ${
          showNav ? "ml-[250px]" : "ml-[60px]"
        }`}
      >
        {user?.role === "temperary" ? <UserRegistration /> : ""}
      </div>
    </div>
  );
};

export default Home;
