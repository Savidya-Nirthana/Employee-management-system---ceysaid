import LeaveApplication from "../components/LeaveApplication";
import LeaveDetails from "../components/LeaveDetails";
import { useContext, useState } from "react";
import { UIContext } from "../contexts/UIContext";
import LeaveApplicationApp from "../components/LeaveApplicationApp";
import LeaveTable from "../components/leave/LeaveTable";
import ProtectedComponents from "../routes/ProtectedComponents";
import LeavePersonList from "../components/leave/LeavePersonList";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
const Leave = () => {
  const { showNav, setShowNav } = useContext(UIContext);
  const { user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  return (
    <div>
      <ToastContainer />
      <div className=" flex flex-row gap-2">
        <div
          className={` mt-[70px] flex flex-row w-[100%] justify-around items-start ${
            showNav ? "ml-[250px]" : "ml-[60px]"
          } duration-500`}
        >
          <div>
            <div className="flex flex-row gap-5 items-stretch">
              <div className="flex flex-col gap-5 flex-1">
                <LeaveApplication
                  type={"apply"}
                  selectedLeave={null}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />

                <LeaveDetails selectedLeave={null} refresh={refresh} />
              </div>

              {user.role == "operation" && (
                <div className="flex-1">
                  <LeavePersonList refresh={refresh} setRefresh={setRefresh} />
                </div>
              )}

              {user.role == "sales" && (
                <div className="flex-1">
                  <LeavePersonList refresh={refresh} setRefresh={setRefresh} />
                </div>
              )}

              <ProtectedComponents allowedRoles={["admin"]}>
                <div className=" flex-1">
                  <LeaveApplicationApp toast={toast} />
                </div>
              </ProtectedComponents>
            </div>
            <div className=" flex mt-10 gap-5 items-stretch">
              <ProtectedComponents allowedRoles={["admin"]}>
                <div className=" flex-1">
                  <LeaveTable />
                </div>
              </ProtectedComponents>
              {user.role == "admin" && (
                <div className=" flex-1">
                  <LeavePersonList refresh={refresh} setRefresh={setRefresh} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;
