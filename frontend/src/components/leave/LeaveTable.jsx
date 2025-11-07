import React, { useState, useEffect } from "react";
import { leaveData } from "../../services/leaveService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import EmployerPreInfo from "../Models/EmployerPreInfo";

export default function LeaveTable() {
  const [summery, setSummery] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await leaveData();
      setSummery(response.data);
      console.log(summery);
    };
    getData();
  }, []);

  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(summery);
  const [showEmployeeInfo, setShowEmployeeInfo] = useState(null);
  useEffect(() => {
    if (!search.trim()) {
      setFilteredEmployees(summery);
      return;
    }

    const filter = search.toLowerCase();
    const results = summery.filter(
      (emp) =>
        emp.id.toLowerCase().includes(filter) ||
        emp.name.toLowerCase().includes(filter)
    );
    setFilteredEmployees(results);
  }, [search]);

  const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        )
      );
  };

  return (
    <div className="rounded-[10px]   border-[1px] m-auto border-slate-300  pb-[20px] h-[700px]">
      <div className="flex items-center justify-between my-6 mx-5">
        <h2 className="text-[20px] text-[#023047] font-semibold pb-3">
          Employee Leave Records
        </h2>
        <input
          type="text"
          placeholder="Search by Employee ID or Name..."
          className=" border-[1px] border-slate-300 rounded-lg p-1 px-2 ml-10 text-[14px] w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredEmployees.length === 0 && search && (
        <p className="text-red-600 font-bold mb-4">❌ No employee found</p>
      )}

      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 text-slate-600 border border-slate-300">
            <th className="p-3">Employee ID</th>
            <th className="p-3">Employee Name</th>
            <th className="p-3">Department</th>
            <th className="p-3">Month Used Leave</th>
            <th className="p-3">Month Quota</th>
            <th className="p-3">Annual Used Leave</th>
            <th className="p-3">Allocated Annual Leave</th>
          </tr>
        </thead>
        <tbody className="text-slate-500 ">
          {summery.map((emp, index) => {
            const warning =
              emp.monthUsedLeave >= 3 || emp.annualUsedLeave >= 14;

            return (
              <tr
                key={index}
                className={`text-center border-b border-slate-300 text-slate-500  ${
                  warning ? "bg-red-50 text-[14px]" : ""
                }`}
              >
                <td className="p-3" onClick={() => setShowEmployeeInfo(emp)}>
                  <div className="flex items-center justify-center gap-2">
                    {emp.img ? (
                      <img
                        src={emp.img}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faUser} />
                    )}
                    {highlightText(emp.employeeId, search)}
                  </div>
                </td>
                <td className="p-3">
                  {highlightText(emp.employeeName, search)}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full  ${
                      emp.department === "accounts"
                        ? "bg-[#2e8b563c] text-[#2E8B57] font-semibold"
                        : emp.department === "sales"
                        ? "bg-[#e67d224c] text-[#E67E22] font-semibold"
                        : "bg-[#3498db44] text-[#3498DB] font-semibold"
                    }`}
                  >
                    {emp.department}
                  </span>
                </td>
                <td className="p-3">{emp.monthUsedLeave}</td>
                <td className="p-3">{3}</td>
                <td className="p-3">{emp.annualUsedLeave}</td>
                <td className="p-3">{14}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AnimatePresence>
        {showEmployeeInfo && (
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
              <EmployerPreInfo
                setShowEmployeeInfo={setShowEmployeeInfo}
                showEmployeeInfo={showEmployeeInfo}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
