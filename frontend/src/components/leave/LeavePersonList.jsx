import React, { useEffect, useState } from "react";
import { leaveUserDetails } from "../../services/leaveService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const LeavePersonList = () => {
  const [leave, setLeave] = useState();
  const [selectYear, setSelectYear] = useState();
  const [type, setType] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await leaveUserDetails();
    };
    getData();
  }, []);

  const leaves = [
    {
      year: "2025",
      type: "Annual",
      status: "Approved",
      from: "2025-03-12",
      to: "2025-03-15",
    },
    {
      year: "2025",
      type: "Casual",
      status: "Pending",
      from: "2025-05-01",
      to: "2025-05-02",
    },
    {
      year: "2025",
      type: "Lieu",
      status: "Rejected",
      from: "2025-08-10",
      to: "2025-08-12",
    },
  ];

  return (
    <div className="  min-h-screen flex justify-center">
      <div className="bg-slate-50 shadow-md  p-6 w-full max-w-5xl rounded-[10px] border border-slate-300">
        <div className=" flex flex-row justify-between">
          <h2 className="text-[20px] text-[#023047] font-semibold pb-5">
            Leaves
          </h2>
          <div className=" flex items-center gap-10">
            <select onChange={(e) => setSelectYear(e.target.value)}>
              <option value="">Select year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
            <select onChange={(e) => setType(e.target.value)}>
              <option>Select leave type</option>
              <option value="annual">Annual</option>
              <option value="casual">Casual</option>
            </select>
            <div>
              <label htmlFor="">From</label>
              <input type="date" onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div>
              <label htmlFor="">To</label>
              <input type="date" onChange={(e) => setTo(e.target.value)} />
            </div>
          </div>
        </div>
        <div className=" flex flex-row justify-end gap-8 ">
          {selectYear && (
            <div className=" flex bg-slate-200  px-3 py-1 rounded-[30px] gap-2 items-center">
              <div className=" ">{selectYear}</div>
              <FontAwesomeIcon
                icon={faClose}
                className=" hover:text-red-500 cursor-pointer transition-all duration-200"
                onClick={() => setSelectYear(null)}
              />
            </div>
          )}
          {type && (
            <div className=" flex bg-slate-200  px-3 py-1 rounded-[30px] gap-2 items-center">
              <div className=" ">{type}</div>
              <FontAwesomeIcon
                icon={faClose}
                className=" hover:text-red-500 cursor-pointer transition-all duration-200"
                onClick={() => setSelectYear(null)}
              />
            </div>
          )}
          {from && (
            <div className=" flex bg-slate-200  px-3 py-1 rounded-[30px] gap-2 items-center">
              <div className=" ">{from}</div>
              <FontAwesomeIcon
                icon={faClose}
                className=" hover:text-red-500 cursor-pointer transition-all duration-200"
                onClick={() => setSelectYear(null)}
              />
            </div>
          )}
          {to && (
            <div className=" flex bg-slate-200  px-3 py-1 rounded-[30px] gap-2 items-center">
              <div className=" ">{to}</div>
              <FontAwesomeIcon
                icon={faClose}
                className=" hover:text-red-500 cursor-pointer transition-all duration-200"
                onClick={() => setSelectYear(null)}
              />
            </div>
          )}
        </div>
        <div className="overflow-x-auto mt-10">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className=" text-[14px] text-slate-500">
                <th className="py-3 px-4 rounded-tl-xl">Leave Year</th>
                <th className="py-3 px-4">Leave Type</th>
                <th className="py-3 px-4">From</th>
                <th className="py-3 px-4">To</th>
                <th className="py-3 px-4 rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody className=" text-[14px]">
              {leaves.map((leave, i) => (
                <tr key={i} className=" hover:bg-gray-50 transition-all">
                  <td className="py-3 px-4  text-center">{leave.year}</td>
                  <td className="py-3 px-4 text-center">{leave.type}</td>
                  <td className="py-3 px-4 text-center">{leave.from}</td>
                  <td className="py-3 px-4 text-center">{leave.to}</td>
                  <td
                    className={`py-3 px-4 font-medium ${
                      leave.status === "Approved"
                        ? "text-green-600"
                        : leave.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {leave.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeavePersonList;
