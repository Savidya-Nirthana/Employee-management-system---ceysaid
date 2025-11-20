import { motion, AnimatePresence } from "framer-motion";
import LeaveApplication from "../LeaveApplication";
import LeaveDetails from "../LeaveDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAnglesLeft,
  faAnglesRight,
  faCaretDown,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { leaveAccept, rejectLeave } from "../../services/leaveService";
const LeaveReject = ({
  showComment,
  setShowComment,
  setShowDetails,
  selectedLeave,
  toast,
  update,
  setUpdate,
  setSelectedLeave,
  refresh,
  setRefresh,
}) => {
  const [showLeaveBalance, setShowLeaveBalance] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [comment, setComment] = useState(null);
  const slideVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const applyReject = async () => {
    const response = await rejectLeave(selectedLeave, comment);
    if (!response.error) {
      // setShowReject(null);
      // setShowComment(false);
      // setShowLeaveBalance(false);
      // setSelectedLeave(null);
      toast.success(response.message);

      setShowReject(false);
      setShowDetails(false);
      setTimeout(() => {
        setRefresh((prev) => !prev);
      }, 300);
    } else {
      toast.error("not found");
    }
  };

  const handleAccept = async () => {
    const response = await leaveAccept(selectedLeave.leaveId);
    if (response.error) {
      toast.error(response.message);
    } else {
      setShowDetails(false);
      setShowComment(false);
      toast.success(response.message);
      setUpdate(!update);
      setSelectedLeave(null);
    }
  };

  return (
    <div>
      <div>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className=" text-red-500 text-[25px] float-right mt-[-10px] mr-[-10px] cursor-pointer bg-white rounded-full"
          onClick={() => {
            setShowDetails(false);
            setShowComment(false);
          }}
        />
      </div>
      <div className="p-5 bg-white rounded-md shadow-md">
        <div className=" flex justify-between">
          <h3 className="text-lg font-semibold text-[#023047]">
            Leave Details
          </h3>
          <div>
            <div>{selectedLeave.userId}</div>
          </div>
        </div>
        <div className=" flex  items-center gap-3 my-5">
          <div className=" z-10">
            <LeaveApplication type={"reject"} selectedLeave={selectedLeave} />
          </div>
          <FontAwesomeIcon
            icon={showLeaveBalance ? faAnglesLeft : faAnglesRight}
            className=" text-[20px] text-[#023047] cursor-pointer "
            onClick={() => setShowLeaveBalance(!showLeaveBalance)}
          />
          <AnimatePresence>
            {showLeaveBalance && (
              <motion.div
                key="leave-details"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <LeaveDetails selectedLeave={selectedLeave} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showComment && (
            <motion.div
              initial={{ opacity: 0, y: 100, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 100, height: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
              className="overflow-hidden"
            >
              <div>
                <input
                  type="text"
                  placeholder="Add comments for rejection"
                  className="w-full border border-gray-300 rounded-md p-2 mt-4"
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className=" flex flex-row gap-5">
                  <button
                    className="bg-indigo-400 text-white px-4 py-1 rounded-[4px] mt-2 transition-all duration-300 hover:bg-indigo-500 cursor-pointer"
                    onClick={() => setShowReject(true)}
                  >
                    Submit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded-[4px] mt-2  cursor-pointer transition-all duration-300 hover:bg-red-600"
                    onClick={() => setShowComment(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showComment && (
          <div className=" mt-5 flex justify-end">
            <button
              className=" bg-indigo-400 text-white px-4 py-1 rounded-[4px] mr-5 cursor-pointer transition-all duration-300 hover:bg-indigo-500"
              onClick={handleAccept}
            >
              Approve
            </button>
            <button
              className=" bg-red-500 text-white px-4 py-1 rounded-[4px] transition-all duration-300 hover:bg-red-600 cursor-pointer"
              onClick={() => setShowComment(true)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {showReject && (
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
              <div className=" w-[400px] h-[100px] flex flex-col bg-white text-[20px] justify-center items-center gap-2">
                <div>Are sure want to reject leave?</div>
                <div className=" flex justify-center gap-10 text-[16px]">
                  <button
                    className=" text-red-500 bg-red-300 w-[100px] rounded-sm py-1 hover:text-red-50 hover:bg-red-600 transition-all duration-300"
                    onClick={applyReject}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      setShowReject(false);
                    }}
                    className=" bg-gray-400 text-gray-600 w-[100px] py-1 rounded-sm font-bold hover:bg-gray-700 cursor-pointer transition-all duration-300 hover:text-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaveReject;
