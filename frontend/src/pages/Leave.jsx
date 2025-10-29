import LeaveApplication from "../components/LeaveApplication";
import LeaveDetails from "../components/LeaveDetails";
import { useContext } from "react";
import { UIContext } from "../contexts/UIContext";
import LeaveApplicationApp from "../components/LeaveApplicationApp";
import LeaveTable from "../components/leave/LeaveTable";
import ProtectedComponents from "../routes/ProtectedComponents";
const Leave = () => {
  const { showNav, setShowNav } = useContext(UIContext);
  return (
    <div>
      <div className=" flex flex-row gap-2">
        <div
          className={` mt-[70px] flex flex-row w-[100%] justify-around items-start ${
            showNav ? "ml-[250px]" : "ml-[60px]"
          } duration-500`}
        >
          <div>
            <div className=" flex flex-row gap-5 ">
              <div className=" flex flex-col gap-5">
                <LeaveApplication />
                <LeaveDetails />
              </div>
              <div className=" flex-1">
                <LeaveApplicationApp />
              </div>
            </div>
            <ProtectedComponents allowedRoles={["admin"]}>
              <div className=" my-6">
                <LeaveTable />
              </div>
            </ProtectedComponents>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;
