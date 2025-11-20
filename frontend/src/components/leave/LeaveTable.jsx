import { useState, useEffect } from "react";
import { leaveData } from "../../services/leaveService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarDay,
  faChevronCircleLeft,
  faChevronCircleRight,
  faClose,
  faPersonWalkingLuggage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import EmployerPreInfo from "../Models/EmployerPreInfo";
import LeavePersonList from "./LeavePersonList";

export default function LeaveTable() {
  const [summery, setSummery] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(summery);
  const [showEmployeeInfo, setShowEmployeeInfo] = useState(null);
  const [department, setDepartment] = useState(null);
  const [monthlyUse, setMothelyUse] = useState(null);
  const [annulaUse, setAnnualUser] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [startIndex, setStartIndex] = useState(0);
  const [showLeaveDetails, setShowLeaveDetails] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const response = await leaveData();
      setSummery(response.data);
      console.log(summery);
    };
    getData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, department, monthlyUse, annulaUse, summery]);

  const applyFilters = () => {
    let filtered = [...summery];

    if (department) {
      filtered = filtered.filter(
        (emp) => emp.department?.toLowerCase() === department.toLowerCase()
      );
    }

    if (monthlyUse) {
      filtered = filtered.sort((a, b) => {
        return monthlyUse === "low"
          ? a.monthUsedLeave - b.monthUsedLeave
          : b.monthUsedLeave - a.monthUsedLeave;
      });
    }

    if (annulaUse) {
      filtered = filtered.sort((a, b) => {
        return annulaUse === "low"
          ? a.annualUsedLeave - b.annualUsedLeave
          : b.annualUsedLeave - a.annualUsedLeave;
      });
    }

    if (search.trim()) {
      const filter = search.toLowerCase();
      filtered = filtered.filter((emp) =>
        emp.employeeId?.toLowerCase().includes(filter)
      );
    }

    setFilteredEmployees(filtered);
  };

  const nextPage = () => {
    if (startIndex + itemsPerPage < filteredEmployees.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

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
    <div className="bg-slate-50 shadow-md py-3 px-4  rounded-[10px] border border-slate-300  h-[700px] w-[650px] relative">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] text-[#023047] font-semibold py-3">
          Employee Leave Records
        </h2>
        <input
          type="text"
          placeholder="Search by Employee ID..."
          className="    border-slate-500 border-[2px] p-1 rounded-lg text-[14px] w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className=" flex text-[12px] m-3 gap-5 border-b-[1px] border-slate-400">
        <div className=" flex flex-col">
          <FontAwesomeIcon
            icon={faPersonWalkingLuggage}
            className=" text-[40px] text-slate-500"
          />
          <select onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Department</option>
            <option value="sales">Sales</option>
            <option value="operation">Operation</option>
            <option value="hr">HR</option>
          </select>
        </div>
        <div className=" flex flex-col">
          <FontAwesomeIcon
            icon={faCalendarDay}
            className=" text-[40px] text-slate-500"
          />
          <select name="" id="" onChange={(e) => setMothelyUse(e.target.value)}>
            <option value="">Monthly use</option>
            <option value="low">Low to high</option>
            <option value="high">High to low</option>
          </select>
        </div>
        <div className=" flex flex-col">
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className=" text-[40px] text-slate-500"
          />
          <select name="" id="" onChange={(e) => setAnnualUser(e.target.value)}>
            <option value="">Annual use</option>
            <option value="low">Low to high</option>
            <option value="high">High to low</option>
          </select>
        </div>
      </div>
      <div className=" flex justify-end gap-5 items-center text-[12px]">
        {department && (
          <div className=" flex bg-slate-200  px-3 py-1 rounded-[30px] gap-2 items-center">
            <div className=" ">{department}</div>
            <FontAwesomeIcon
              icon={faClose}
              className=" hover:text-red-500 cursor-pointer transition-all duration-200"
              onClick={() => setDepartment(null)}
            />
          </div>
        )}
        {annulaUse && (
          <div className=" flex bg-slate-200  px-3 py-1 rounded-[30px] gap-2 items-center">
            <div className=" ">Annual: {annulaUse}</div>
            <FontAwesomeIcon
              icon={faClose}
              className=" hover:text-red-500 cursor-pointer transition-all duration-200"
              onClick={() => setAnnualUser(null)}
            />
          </div>
        )}
        {monthlyUse && (
          <div className=" flex bg-slate-200  px-3 py-1 rounded-[30px] gap-2 items-center">
            <div className=" ">Month: {monthlyUse}</div>
            <FontAwesomeIcon
              icon={faClose}
              className=" hover:text-red-500 cursor-pointer transition-all duration-200"
              onClick={() => setMothelyUse(null)}
            />
          </div>
        )}
        <div className=" flex flex-row justify-end h-[32px] items-center">
          <div className=" text-[12px]">{`${filteredEmployees.length} Employers`}</div>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 text-slate-600 text-[12px]">
            <th className="p-3">Employee ID</th>
            <th className="p-3">Department</th>
            <th className="p-3">Month Used Leave</th>
            <th className="p-3">Month Quota</th>
            <th className="p-3">Annual Used Leave</th>
            <th className="p-3">Annual Quota</th>
          </tr>
        </thead>
        <tbody className="text-slate-500 text-[12px]">
          {filteredEmployees.map((emp, index) => {
            const warning =
              emp.monthUsedLeave >= 3 || emp.annualUsedLeave >= 14;

            return (
              <tr
                key={index}
                className={`text-center  text-slate-800 text-[14px] cursor-pointer hover:bg-slate-100 transition-all duration-200 ${
                  warning ? "bg-red-50 text-[14px]" : ""
                }`}
                onClick={() => setShowLeaveDetails(emp)}
              >
                <td className="p-3" onClick={() => setShowEmployeeInfo(emp)}>
                  <div className="flex items-center justify-center gap-2">
                    {emp.img ? (
                      <img
                        src={emp.img}
                        alt="profile"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faUser} />
                    )}
                    {highlightText(emp.employeeId, search)}
                  </div>
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
      <div className=" flex m-auto w-[70px] justify-around text-[#219ebc] z-[0] absolute bottom-5 left-0 right-0  ">
        <button disabled={startIndex === 0} className=" disabled:opacity-50">
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            onClick={prevPage}
            className="cursor-pointer text-2xl"
          />
        </button>
        <button
          className="disabled:opacity-50"
          disabled={startIndex + itemsPerPage >= filteredEmployees.length}
        >
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            className=" cursor-pointer text-2xl"
            onClick={nextPage}
          />
        </button>
      </div>
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
      <AnimatePresence>
        {showLeaveDetails && (
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
              <LeavePersonList
                showLeaveDetails={showLeaveDetails}
                setShowLeaveDetails={setShowLeaveDetails}
                types={"details"}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
