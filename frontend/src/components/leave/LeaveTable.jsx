import React, { useState, useEffect } from "react";

const employeesData = [
  {
    id: "EMP001",
    name: "John Micheal",
    dept: "Accounts",
    deptColor: "bg-green-600",
    monthUsed: 2,
    monthQuota: 3,
    annualUsed: 10,
    annualQuota: 20,
    img: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    dept: "Sales",
    deptColor: "bg-orange-500",
    monthUsed: 3,
    monthQuota: 3,
    annualUsed: 18,
    annualQuota: 18,
    img: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: "EMP003",
    name: "David Lee",
    dept: "IT",
    deptColor: "bg-blue-500",
    monthUsed: 4,
    monthQuota: 3,
    annualUsed: 5,
    annualQuota: 15,
    img: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: "EMP004",
    name: "Cane Williamson",
    dept: "Sales",
    deptColor: "bg-orange-500",
    monthUsed: 1,
    monthQuota: 3,
    annualUsed: 22,
    annualQuota: 22,
    img: "https://i.pravatar.cc/40?img=4",
  },
];

export default function LeaveTable() {
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employeesData);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredEmployees(employeesData);
      return;
    }

    const filter = search.toLowerCase();
    const results = employeesData.filter(
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
          {filteredEmployees.map((emp, index) => {
            const warning =
              emp.monthUsed >= emp.monthQuota ||
              emp.annualUsed >= emp.annualQuota;

            return (
              <tr
                key={index}
                className={`text-center border-b border-slate-300 text-slate-500  ${
                  warning ? "bg-red-50 text-[14px]" : ""
                }`}
              >
                <td className="p-3">
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={emp.img}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {highlightText(emp.id, search)}
                  </div>
                </td>
                <td className="p-3">{highlightText(emp.name, search)}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${emp.deptColor}`}
                  >
                    {emp.dept}
                  </span>
                </td>
                <td className="p-3">{emp.monthUsed}</td>
                <td className="p-3">{emp.monthQuota}</td>
                <td className="p-3">{emp.annualUsed}</td>
                <td className="p-3">{emp.annualQuota}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
