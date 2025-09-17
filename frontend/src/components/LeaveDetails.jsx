const LeaveDetails = () => {
  return (
    <div className=" bg-slate-50 py-5 px-5 rounded-[10px]  shadow-lg shadow-black/25">
      <div className="text-[20px] text-[#023047] font-semibold pb-3">Leave Balence</div>
      <table className="">
        <thead className=" text-[14px] text-slate-500">
          <th className=" w-[100px]">Leave type</th>
          <th className=" w-[100px]">All leave</th>
          <th className=" w-[100px]">Balance</th>
          <th className=" w-[100px]">Used</th>
          <th className=" w-[100px]">Pending</th>
        </thead>
        <tbody className=" text-[14px] text-slate-500 text-center">
          <tr>
            <td className=" py-3">Annual leave</td>
            <td>14.00</td>
            <td>14.00</td>
            <td>0.00</td>
            <td>0.00</td>
          </tr>
          <tr>
            <td>Casual leave</td>
            <td>14.00</td>
            <td>14.00</td>
            <td>0.00</td>
            <td>0.00</td>
          </tr>
          {/* <tr>
            <td>Lieu leave</td>
            <td>14.00</td>
            <td>14.00</td>
            <td>0.00</td>
            <td>0.00</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveDetails;
