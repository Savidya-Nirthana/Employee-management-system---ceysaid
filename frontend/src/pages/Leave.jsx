import LeaveApplication from "../components/LeaveApplication";
import LeaveDetails from "../components/LeaveDetails";
import NavBar from "../components/NavBar";
import { useState } from "react";
const Leave = () => {
  const [showNav, setShowNav] = useState(true);
  return (
    <div className=" flex flex-row gap-2">
      <NavBar showNav={showNav} setShowNav={setShowNav}/>
      <div className={` mt-[70px] flex flex-row w-[100%] justify-around items-start ${showNav ? 'ml-[250px]' : 'ml-[60px]'} duration-500`}>
        <div>
          <LeaveApplication />
        </div>
        <div>
          <LeaveDetails />
        </div>
      </div>
    </div>
  );
};

export default Leave;
