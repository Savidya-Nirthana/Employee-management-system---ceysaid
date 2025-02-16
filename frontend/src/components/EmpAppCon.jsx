const EmpAppCon = () => {
  return (
    <div className="bg-slate-50 w-[600px] p-5 my-2 h-[350px]">
      <div className="w-[100%] my-1 text-[20px] text-slate-600 mb-5">
        New employee details approval
      </div>
      <div className=" h-[230px] scroll-auto overflow-y-scroll">
        {Array.from({ length: 5 }).map((_, i) => (
          <>
            <div className=" flex flex-row w-[500px] m-auto justify-between border-b-[1px] border-slate-300 py-5 px-5" key={i}>
              <div>
                <div className=" texty-[15px] text-slate-700">
                  James Pieris
                </div>
                <div className=" text-[13px] text-slate-400">
                  emp1ceysaid@gmail.com
                </div>
              </div>
              <div className=" flex flex-row gap-2 items-center">
                <button className=" text-[14px] text-[#262626]  border-[1px] w-[100px] h-[25px] rounded-sm cursor-pointer">
                  View
                </button>
                <button className=" text-[14px] bg-indigo-400 text-white w-[100px] h-[25px] rounded-sm">
                  Reject
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default EmpAppCon;
