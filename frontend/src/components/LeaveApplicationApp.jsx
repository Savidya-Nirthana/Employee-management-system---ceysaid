const LeaveApplicationApp = () => {
  return (
    <div className=" bg-slate-50 py-5 px-5 rounded-[10px]  shadow-lg shadow-black/25">
      <div className="text-[20px] text-[#023047] font-semibold pb-5">
        Leave Application approvals
      </div>
      <table className="min-w-[600px]">
        <thead className=" text-[14px] text-slate-500">
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className=" text-[14px] text-slate-500 text-center">
          <tr className=" border-b h-[60px] m-auto">
            <td className="">John Doe</td>
            <td>Annual Leave</td>
            <td>2023-01-01</td>
            <td>2023-01-10</td>
            <td>Approved</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>Casual Leave</td>
            <td>2023-02-15</td>
            <td>2023-02-20</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaveApplicationApp;
