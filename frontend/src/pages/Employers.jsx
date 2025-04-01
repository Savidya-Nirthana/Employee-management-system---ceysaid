import AddUsers from "../components/AddUsers";
import EmpAppCon from "../components/EmpAppCon";
import AllEmployers from "../components/AllEmployers";
import { useContext, useState } from "react";
import { UIContext } from "../contexts/UIContext";

const Employers = () => {
  const [viewDeatails, setViewDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { showNav } = useContext(UIContext);
  return (
    <div className="flex flex-row gap-2 overflow-auto $">
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
          {!viewDeatails &&  !open ? <AddUsers /> : ""}
          {!open? <EmpAppCon
            refresh={refresh}
            setRefresh={setRefresh}
            showNav={showNav}
            viewDeatails={viewDeatails}
            setViewDetails={setViewDetails}
          />: ''}
        </div>
        {!viewDeatails?
        <AllEmployers
          refresh={refresh}
          setRefresh={setRefresh}
          showNav={showNav}
          open={open}
          setOpen={setOpen}
        /> : '' }
      </div>
    </div>
  );
};

export default Employers;
