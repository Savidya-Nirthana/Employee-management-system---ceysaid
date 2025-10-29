import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { fetchLeaves } from "../services/leaveService";

const LeaveApplicationApp = () => {
  const [leaves, setLeaves] = useState([]);
  useEffect(() => {
    const getLeaves = async () => {
      const data = await fetchLeaves();
      setLeaves(data);
    };
    getLeaves();
  }, []);

  console.log(leaves);
  return (
    <div className=" bg-slate-50 py-5 px-5 rounded-[10px]   border-[1px] m-auto border-slate-300 h-full ">
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
        <tbody className=" text-[14px] text-slate-500 text-center">
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td className="px-4 py-2">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-[20px] text-[#219ebc]"
                  />
                  <span>{leave.userId}</span>
                </div>
              </td>
              <td className="px-4 py-2">{leave.leave_type}</td>
              <td className="px-4 py-2">{leave.startDate.split("T")[0]}</td>
              <td className="px-4 py-2">{leave.endDate.split("T")[0]}</td>
              <td className="px-4 py-2">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveApplicationApp;
