import { useEffect, useId, useState } from "react";
import {
  getAppData,
  registerPermenently,
  rejectSend,
} from "../services/authservice";
import PulseLoader from "react-spinners/PulseLoader";
import EmployeeInfo from "./Models/EmployeeInfo";
import zeroData from "../assets/images/messages/emptyData.png";
import { ToastContainer, toast } from "react-toastify";
const EmpAppCon = ({ refresh, setRefresh }) => {
  const [approvalUsers, setApprovalUsers] = useState(null);
  const [rejectConfirmation, setRejectConfirmation] = useState(false);
  const [selectUser, setSelectUser] = useState(null);
  const [viewDeatails, setViewDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const acceptHandler = async () => {
    setViewDetails(false);
    const { message, error } = await registerPermenently(user);
    if (!error) {
      toast.success(message);
      setRefresh((prev) => !prev);
    } else {
      toast.error(message);
    }
  };
  useEffect(() => {
    const getApprovalUsers = async () => {
      const { data, count } = await getAppData();
      if (count === 0) {
        setApprovalUsers(0);
      }
      setApprovalUsers(data);
    };
    getApprovalUsers();
  }, [refresh]);

  const rejectHandler = async (id) => {
    setRejectConfirmation(true);
    setSelectUser(id);
    console.log(id);
  };

  const viewHandles = (id) => {
    setSelectUser(id);
    setViewDetails(true);
  };

  const reject = () => {
    const data = rejectSend(selectUser);
    setRejectConfirmation(false);
  };

  return (
    <div
      className={`bg-slate-50 w-[500px] xl:w-[550px]  p-2 my-2  rounded-[10px]  shadow-lg shadow-black/25 ${viewDeatails ? '' : ''}
`}
    >
      <ToastContainer />
      <div className="w-[100%] my-1 mx-5 text-[20px] text-[#023047] font-semibold mb-5">
        New employee details approval
      </div>
      <div className=" h-[260px] scroll-auto overflow-y-scroll">
        {approvalUsers ? (
          approvalUsers == 0 ? (
            <div className=" flex flex-col justify-center items-center h-full w-full gap-[0]">
              <img src={zeroData} alt="" className=" w-[200px] h-[200px]" />
              <div className=" font-bold text-slate-400">0 new requests</div>
            </div>
          ) : (
            approvalUsers.map((item, i) => (
              <>
                <div
                  className=" flex flex-row w-[400px] xl:w-[500px] m-auto justify-between border-b-[1px] border-slate-300 py-5 px-5"
                  key={i}
                >
                  <div>
                    <div className=" texty-[15px] text-slate-700">
                      {item.fullName}
                    </div>
                    <div className=" text-[13px] text-slate-400">
                      {item.userId}
                    </div>
                  </div>
                  <div className=" flex flex-row gap-2 items-center">
                    <button
                      className=" text-[14px] text-[#262626]  border-[1px] w-[100px] rounded-sm cursor-pointer px-4 py-2"
                      onClick={() => viewHandles(item.userId)}
                    >
                      View
                    </button>
                    <button
                      className=" text-[14px] bg-red-400 text-white w-[100px]  rounded-sm cursor-pointer hover:bg-red-500 px-4 py-2"
                      onClick={() => rejectHandler(item.userId)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </>
            ))
          )
        ) : (
          <div className=" flex items-center justify-center mt-10">
            <PulseLoader color="oklch(0.673 0.182 276.935)" size={12} />
          </div>
        )}
      </div>

      {rejectConfirmation && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] text-center">
            <h2 className="text-xl font-bold text-slate-600">
              Are you sure to remove {selectUser}?
            </h2>

            <div className="mt-4 flex justify-center gap-10">
              <button
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => reject()}
              >
                Remove
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-black hover:font-white"
                onClick={() => setRejectConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {viewDeatails && (
        <>
          <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-[10] scroll-auto overflow-scroll">
            <div className="bg-white p-5 rounded-lg shadow-lg w-[80%]">
              <h2 className="text-xl font-bold">{`test user `} </h2>
              <EmployeeInfo
                userId={selectUser}
                type="approval"
                user={user}
                setUser={setUser}
                setIsEdit={setIsEdit}
              />
              <div className="mt-4 flex justify-end gap-10">
                <button
                  className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={acceptHandler}
                >
                  Edit & Accept
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-black hover:font-white"
                  onClick={() => setViewDetails(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmpAppCon;
