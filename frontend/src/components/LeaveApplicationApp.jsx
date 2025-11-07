import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { fetchLeaves } from "../services/leaveService";
import { AnimatePresence, motion } from "framer-motion";
import LeaveReject from "./Models/LeaveReject";
import NoData from "../assets/images/messages/emptyData.png";
import { toast, ToastContainer } from "react-toastify";

const LeaveApplicationApp = () => {
  const [leaves, setLeaves] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const getLeaves = async () => {
      const data = await fetchLeaves();
      setLeaves(data);
    };
    getLeaves();
  }, [update]);

  return (
    <div className=" bg-slate-50 py-5 px-5 rounded-[10px]   border-[1px] m-auto border-slate-300 h-full ">
      <ToastContainer />
      <div className="text-[20px] text-[#023047] font-semibold pb-5">
        Leave Application approvals
      </div>
      <table className="min-w-[600px]">
        <thead className=" text-[14px] text-slate-500">
          <tr>
            <th className=" py-3">Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>
        {leaves.length === 0 && (
          <tbody>
            <tr>
              <td colSpan="5" className="py-4">
                <img src={NoData} alt="" className=" w-[200px] m-auto" />
                <div className=" text-center text-slate-500 mt-2">
                  No leave applications found
                </div>
              </td>
            </tr>
          </tbody>
        )}
        <tbody className=" text-[14px] text-slate-500 text-center">
          {leaves
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .map((leave) => (
              <tr
                key={leave._id}
                className="  hover:bg-slate-100 cursor-pointer"
                onClick={() => {
                  setShowDetails(true);
                  setSelectedLeave(leave);
                }}
              >
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    {leave.img ? (
                      <img className=" w-7 h-7 rounded-full object-cover" src={leave.img} />
                    ) : (
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-[28px] text-[#219ebc]"
                      />
                    )}

                    <span>{leave.userId}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{leave.leaveType}</td>
                <td className="px-4 py-2">{leave.startDate.split("T")[0]}</td>
                <td className="px-4 py-2">{leave.endDate.split("T")[0]}</td>
                <td className="px-4 py-2">{leave.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center z-[222] bg-[#00000065]"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
              className="origin-center"
            >
              <LeaveReject
                showComment={showComment}
                setShowComment={setShowComment}
                setShowDetails={setShowDetails}
                selectedLeave={selectedLeave}
                toast={toast}
                update={update}
                setUpdate={setUpdate}
                setSelectedLeave={setSelectedLeave}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaveApplicationApp;
