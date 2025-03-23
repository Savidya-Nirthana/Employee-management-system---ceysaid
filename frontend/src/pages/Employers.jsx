import AddUsers from "../components/AddUsers";
import EmpAppCon from "../components/EmpAppCon";
import AllEmployers from "../components/AllEmployers";
import { useContext, useState } from "react";
import { UIContext } from "../contexts/UIContext";

const Employers = () => {
  const [refresh, setRefresh] = useState(false);
  const { showNav } = useContext(UIContext);
  return (
    <div className=" flex flex-row gap-2  ">
      {/* admin -> employers */}
      <div
        className={` flex ${
          showNav ? "2xl:flex-row flex-col " : "flex-col xl:flex-row"
        } justify-evenly  w-[100%] mt-[50px] items-center  duration-500 mr-4 ${
          showNav ? "xl:ml-[218px] ml-[160px]" : "ml-[60px]"
        }`}
      >
        <div
          className={` flex ${
            showNav
              ? "2xl:flex-col flex-row justify-between w-[95%]"
              : "xl:flex-col flex-row "
          } justify-between  `}
        >
          <AddUsers />
          <EmpAppCon
            refresh={refresh}
            setRefresh={setRefresh}
            showNav={showNav}
          />
        </div>
        <AllEmployers
          refresh={refresh}
          setRefresh={setRefresh}
          showNav={showNav}
        />
      </div>
    </div>
  );
};

export default Employers;
