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
import { leaveAccept } from "../../services/leaveService";
const LeaveReject = ({
  showComment,
  setShowComment,
  setShowDetails,
  selectedLeave,
  toast,
  update,
  setUpdate,
  setSelectedLeave,
}) => {
  const [showLeaveBalance, setShowLeaveBalance] = useState(false);
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

  const handleAccept = async () => {
    const response = await leaveAccept(selectedLeave._id);
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
                />
                <div className=" flex flex-row gap-5">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded-[4px] mt-2">
                    Submit
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-1 rounded-[4px] mt-2 "
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
              className=" bg-red-500 text-white px-4 py-1 rounded-[4px] transition-all duration-300 hover:bg-red-600 cursor-pointer"
              onClick={() => setShowComment(true)}
            >
              Reject
            </button>
            <button
              className=" bg-indigo-400 text-white px-4 py-1 rounded-[4px] ml-2 cursor-pointer transition-all duration-300 hover:bg-indigo-500"
              onClick={handleAccept}
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveReject;
