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
    <div className="flex flex-row gap-2 mx-5 ">
      {/* admin -> employers */}
      <div
  className={`flex gap-5 items-center duration-500 mt-12 w-[100%] ${
    showNav ? "2xl:flex-row flex-col xl:ml-[200px] ml-[160px]" : "flex-col xl:flex-row ml-[50px]"
  }`}
>
        <div
          className={`w-[100%] flex gap-5 ${
            showNav
              ? "2xl:flex-col flex-row  "
              : "xl:flex-col flex-row "
          }  `}
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
