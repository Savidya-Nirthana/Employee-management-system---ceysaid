import LeaveApplication from "../components/LeaveApplication";
import LeaveDetails from "../components/LeaveDetails";
import { useContext } from "react";
import { UIContext } from "../contexts/UIContext";
const Leave = () => {
  const { showNav, setShowNav } = useContext(UIContext);
  return (
    <div className=" flex flex-row gap-2">
      <div
        className={` mt-[70px] flex flex-row w-[100%] justify-around items-start ${
          showNav ? "ml-[250px]" : "ml-[60px]"
        } duration-500`}
      >
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
