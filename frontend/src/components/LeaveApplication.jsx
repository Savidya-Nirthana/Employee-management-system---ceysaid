import { useState } from "react";
import { leaveApply } from "../services/leaveService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const LeaveApplication = ({
  type,
  selectedLeave,
  refresh,
  setRefresh,
  setShowDetails,
}) => {
  const navigate = useNavigate();
  const [leaveYear, setLeaveYear] = useState(null);
  const [leaveType, setLeaveType] = useState(null);
  const [leaveFrom, setLeaveFrom] = useState(null);
  const [leaveTo, setLeaveTo] = useState(null);
  const [reason, setReason] = useState(null);
  const [comment, setComment] = useState(null);
  const [halfDay, setHalfDay] = useState(false);

  const handleSubmit = async (event) => {
    console.log(halfDay);
    event.preventDefault();
    const response = await leaveApply({
      leaveYear: leaveYear,
      half_day: halfDay ? halfDay : "none",
      leaveType: leaveType,
      leaveFrom: leaveFrom,
      leaveTo: leaveTo ? leaveTo : leaveFrom,
      reason: reason,
      comment: comment,
    });
    if (response.error) {
      return toast.error(
        response.message || "Failed to submit leave application."
      );
    }
    setRefresh((prev) => !prev);
    toast.success("Leave application submitted successfully!");
  };
  return (
    <div className="bg-slate-50 w-[650px]  p-5 h-[420px] rounded-[10px]   border-[1px] m-auto border-slate-300 relative">
      <ToastContainer />
      {type === "details" && (
        <div
          onClick={() => {
            setShowDetails(null);
          }}
          className=" absolute top-[-10px] right-[-10px] bg-red-500 rounded-full w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:w-[37px] hover:h-[37px] hover:bg-red-600 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faClose} className=" text-white " />
        </div>
      )}
      {type === "details" && (
        <div
          className={`absolute right-10 font-medium text-center rounded-[4px] px-3 ${
            selectedLeave.status === "approved"
              ? "bg-green-600 text-white "
              : selectedLeave.status === "rejected"
              ? "bg-red-600 text-white"
              : "bg-yellow-600 text-white"
          }`}
        >
          {selectedLeave.status}
        </div>
      )}
      <div className="">
        {type !== "reject" && (
          <div className="text-[20px] text-[#023047] font-semibold pb-3">
            Leave application
          </div>
        )}
        <form action="" onSubmit={handleSubmit}>
          <table>
            <tr className="">
              <td className=" pb-5 w-[200px]">
                <label htmlFor="" className=" text-[14px] text-slate-600">
                  {" "}
                  Leave year: <span className=" text-red-500">*</span>
                </label>
              </td>
              <td className=" pb-5">
                <select
                  onChange={(e) => setLeaveYear(e.target.value)}
                  name=""
                  id=""
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  required
                  value={selectedLeave && selectedLeave.year}
                  disabled={type === "reject"}
                >
                  <option value="">Select year</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className=" pb-5">
                <label htmlFor="" className=" text-[14px] text-slate-600">
                  Leave type:<span className=" text-red-500">*</span>
                </label>
              </td>
              <td className=" pb-5">
                <select
                  onChange={(e) => setLeaveType(e.target.value)}
                  name=""
                  id=""
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  required
                  value={selectedLeave && selectedLeave.leave_type}
                  disabled={type === "reject"}
                >
                  <option value="">Select leave type</option>
                  <option value="annual">Annual leave</option>
                  <option value="casual">Casual leave</option>
                  <option value="lieu">Lieu leave</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className=" pb-5 flex flex-row items-center justify-start gap-3">
                <label htmlFor="" className=" text-[14px] text-slate-600">
                  Half day:
                </label>
                <div>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1  placeholder:text-slate-600"
                    onChange={() => setHalfDay(!halfDay)}
                    checked={selectedLeave && selectedLeave.half_day !== "none"}
                    disabled={type === "reject"}
                  />
                </div>
              </td>
              {((selectedLeave && selectedLeave.half_day !== "none") ||
                halfDay) && (
                <td className=" pb-5">
                  <select
                    onChange={(e) => setHalfDay(e.target.value)}
                    name=""
                    id=""
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    required
                    value={selectedLeave && selectedLeave.half_day != "none"}
                    disabled={type === "reject"}
                  >
                    <option value="">Select half day</option>
                    <option value="first_half">First half</option>
                    <option value="second_half">Second half</option>
                  </select>
                </td>
              )}
            </tr>
            {((selectedLeave && selectedLeave.half_day !== "none") ||
              halfDay) && (
              <tr className="">
                <td className=" pb-5">
                  <label htmlFor="" className=" text-[14px] text-slate-600">
                    Date:<span className=" text-red-500">*</span>
                  </label>
                </td>
                <td className=" pb-5">
                  <input
                    onChange={(e) => setLeaveFrom(e.target.value)}
                    type="date"
                    name=""
                    id=""
                    className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    required
                    value={
                      selectedLeave && selectedLeave.startDate.split("T")[0]
                    }
                    disabled={type === "reject"}
                  />
                </td>
              </tr>
            )}
            {!(
              (selectedLeave && selectedLeave.half_day !== "none") ||
              halfDay
            ) && (
              <tr className="">
                <td colSpan="2" className=" pb-5">
                  <div className=" flex flex-row gap-[20px]">
                    <div className=" flex flex-row gap-[10px] items-center">
                      <label htmlFor="" className=" text-[14px] text-slate-600">
                        From data:<span className=" text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => setLeaveFrom(e.target.value)}
                        type="date"
                        name=""
                        id=""
                        className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                        required
                        value={
                          selectedLeave && selectedLeave.startDate.split("T")[0]
                        }
                        disabled={type === "reject"}
                      />
                    </div>
                    <div className=" flex flex-row gap-[10px] items-center">
                      <label htmlFor="" className=" text-[14px] text-slate-600">
                        To date:<span className=" text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => setLeaveTo(e.target.value)}
                        type="date"
                        name=""
                        id=""
                        className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                        required
                        value={
                          selectedLeave && selectedLeave.endDate.split("T")[0]
                        }
                        disabled={type === "reject"}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            )}
            <tr>
              <td className=" pb-5">
                <label htmlFor="" className=" text-[14px] text-slate-600">
                  Reason for leave:
                </label>
              </td>
              <td className=" pb-5">
                <input
                  onChange={(e) => setReason(e.target.value)}
                  type="text"
                  name=""
                  id=""
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  required
                  value={selectedLeave && selectedLeave.reason}
                  disabled={type === "reject"}
                />
              </td>
            </tr>
            <tr>
              <td className=" pb-5">
                <label htmlFor="" className=" text-[14px] text-slate-600">
                  Comments:
                </label>
              </td>
              <td className=" pb-5">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  name=""
                  id=""
                  className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  value={selectedLeave && selectedLeave.comments}
                  disabled={type === "reject"}
                ></textarea>
              </td>
            </tr>
          </table>
          {type !== "reject" && type !== "details" && (
            <input
              type="submit"
              value="Apply"
              className=" float-end bg-indigo-400 text-white px-8 py-1 text-[14px] rounded-sm cursor-pointer"
            />
          )}
          {type === "details" && (
            <div className=" flex justify-between">
              <div className=" text-red-500 font-bold">
                {selectedLeave.reject}
              </div>
              <input
                className=" bg-red-500 text-white px-8 py-1 text-[14px] rounded-sm cursor-pointer transition-all duration-300 hover:bg-red-600"
                type="button"
                value="Close"
                onClick={() => setShowDetails(null)}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LeaveApplication;
