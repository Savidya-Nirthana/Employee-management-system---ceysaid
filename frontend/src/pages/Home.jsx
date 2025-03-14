import NavBar from "../components/NavBar";
import UserRegistration from "./UserRegistration";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../App";
import PasswordReset from "../components/PasswordReset";
import { getTempUser } from "../services/authservice";
import PendingApproval from "./PendingApproval";
import SalesTeamForm from "../components/SalesTeamForm";
const Home = () => {
  const [, , user] = useContext(Context);
  const [showNav, setShowNav] = useState(false);
  const [passwordReset, setPasswordReset] = useState(null);
  const [profileStatus, setProfileStatus] = useState(null);
  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  useEffect(() => {
    const getData = async () => {
      const response = await getTempUser();
      if (response.data.user) {
        setProfileStatus(response.data.user.profile_status);
      }
    };
    getData();
  }, []);

  if (user === null) return (window.location.href = "/dashboard");
  return (
    <div className=" flex flex-row gap-2  ">
      <NavBar
        showNav={showNav}
        setShowNav={setShowNav}
        setPasswordReset={setPasswordReset}
      />
      {/* <RegStepOne/> */}
      <div
        className={`duration-500 mt-[70px] w-[100%] ${
          showNav ? "ml-[250px]" : "ml-[60px]"
        }`}
      >
        {user?.role === "temperary" && profileStatus === "init" ? (
          <UserRegistration />
        ) : passwordReset ? (
          <PasswordReset />
        ) : (
          ""
        )}

        {profileStatus === "waiting" ? <><PendingApproval /></> : 
          <>
            <SalesTeamForm />
          </>
        
        };
      </div>
    </div>
  );
};

export default Home;
