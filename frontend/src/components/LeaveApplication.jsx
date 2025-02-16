import { useState } from "react";

const LeaveApplication = () => {
  const [leaveYear, setLeaveYear] = useState();
  const [leaveType, setLeaveType] = useState();
  const [leverFrom, setLeaveFrom] = useState();
  const [leaveTo, setLeaveTo] = useState();
  const [reason, setReason] = useState();
  const [comment, setComment] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <>
      <div className=" bg-slate-50 w-[600px] flex flex-col items-center pb-5">
        <div className="text-[20px] text-slate-600 w-[100%] m-5 pl-5">
          Leave application
        </div>
        <form action="" onSubmit={handleSubmit}>
          <table>
            <tr className="">
              <td className=" pb-5">
                <label htmlFor="" className=" text-[14px] text-slate-600">
                  {" "}
                  Leave year:
                </label>
              </td>
              <td className=" pb-5">
                <select
                  onChange={(e) => setLeaveYear(e.target.value)}
                  name=""
                  id=""
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className=" pb-5">
                <label htmlFor="" className=" text-[14px] text-slate-600">
                  Leave type:
                </label>
              </td>
              <td className=" pb-5">
                <select
                  onChange={(e) => setLeaveType(e.target.value)}
                  name=""
                  id=""
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                >
                  <option value="annual">Annual leave</option>
                  <option value="casual">Casual leave</option>
                  <option value="lieu">Lieu leave</option>
                </select>
              </td>
            </tr>
            <tr className="">
              <td colSpan="2" className=" pb-5">
                <div className=" flex flex-row gap-[20px]">
                  <div className=" flex flex-row gap-[10px] items-center">
                    <label htmlFor="" className=" text-[14px] text-slate-600">
                      From data:{" "}
                    </label>
                    <input
                      onChange={(e) => setLeaveFrom(e.target.value)}
                      type="date"
                      name=""
                      id=""
                      className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    />
                  </div>
                  <div className=" flex flex-row gap-[10px] items-center">
                    <label htmlFor="" className=" text-[14px] text-slate-600">
                      To date:
                    </label>
                    <input
                      onChange={(e) => setLeaveTo(e.target.value)}
                      type="date"
                      name=""
                      id=""
                      className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </td>
            </tr>
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
                ></textarea>
              </td>
            </tr>
          </table>
          <input
            type="submit"
            value="Apply"
            className=" float-end bg-indigo-400 text-white px-8 py-1 text-[14px] rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default LeaveApplication;
