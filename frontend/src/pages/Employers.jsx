import NavBar from "../components/NavBar";
import AddUsers from "../components/AddUsers";
import EmpAppCon from "../components/EmpAppCon";
import AllEmployers from "../components/AllEmployers";
import { useState } from "react";

const Employers = () => {
  const [showNav, setShowNav] = useState(true);

  return (
    <>
      <div className=" flex flex-row gap-2 ">
        <div className=" fixed h-full">
          <NavBar showNav={showNav} setShowNav={setShowNav} />
        </div>

        {/* admin -> employers */}
        <div
          className={` flex flex-row justify-around mt-[50px] w-[100%] duration-500 ${
            showNav ? "ml-[250px]" : "ml-[60px]"
          }`}
        >
          <div className=" flex flex-col justify-evenly">
            <AddUsers />
            <EmpAppCon />
          </div>
          <AllEmployers />
        </div>
      </div>
    </>
  );
};

export default Employers;
