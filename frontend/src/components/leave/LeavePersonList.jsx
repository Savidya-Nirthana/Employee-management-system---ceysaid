import React, { useEffect, useState } from "react";
import { leaveUserDetails } from "../../services/leaveService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faChevronCircleLeft,
  faChevronCircleRight,
  faClose,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import PulseLoader from "react-spinners/PulseLoader";
import zeroData from "../../assets/images/messages/emptyData.png";
import { AnimatePresence, motion } from "framer-motion";
import LeaveApplication from "../LeaveApplication";

const LeavePersonList = ({
  refresh,
  setRefresh,
  showLeaveDetails,
  setShowLeaveDetails,
  types,
}) => {
  const [leave, setLeave] = useState();
  const [selectYear, setSelectYear] = useState();
  const [type, setType] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [startIndex, setStartIndex] = useState(0);
  const [data, setData] = useState(null);
  const [filterUser, setFilterUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const nextPage = () => {
    if (startIndex + itemsPerPage < data.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  useEffect(() => {
    if (types !== "details") {
      const getData = async () => {
        const response = await leaveUserDetails(null);
        setData(response);
        setFilterUser(response);
      };
      getData();
    } else {
      const getDataByUser = async () => {
        const getData = await leaveUserDetails(showLeaveDetails);

        setData(getData);
        setFilterUser(data);
      };

      getDataByUser();
    }
  }, [refresh]);

  useEffect(() => {
    if (!data) return;

    let filtered = data;

    if (selectYear) {
      filtered = filtered.filter((item) => item.year == selectYear);
    }

    if (type) {
      filtered = filtered.filter((item) => item.leave_type === type);
    }

    if (from) {
      filtered = filtered.filter(
        (item) => item.startDate.split("T")[0] >= from
      );
    }

    if (to) {
      filtered = filtered.filter((item) => item.endDate.split("T")[0] <= to);
    }

    setFilterUser(filtered);
    setStartIndex(0);
  }, [selectYear, type, from, to, data]);

  return (
    <div className="flex justify-center h-full relative">
      {types === "details" && (
        <div
          className=" absolute w-[40px] h-[40px] bg-red-500 rounded-full flex items-center justify-center right-[-20px] top-[-20px] cursor-pointer transition-all duration-300 hover:bg-red-600 hover:w-[45px] hover:h-[45px]"
          onClick={() => setShowLeaveDetails(null)}
        >
          <FontAwesomeIcon icon={faClose} className=" text-white text-[20px]" />
        </div>
      )}

      {types === "details" && (
        <div className=" absolute right-10 top-5">{showLeaveDetails.employeeId}</div>
      )}
      <div className="bg-slate-50 shadow-md  p-6   rounded-[10px] border border-slate-300">
        <div className="">
          <h2 className="text-[20px] text-[#023047] font-semibold pb-5">
            Leaves
          </h2>
          <div className=" flex items-center gap-10 text-[12px] w-[650px] justify-around h-[60px] border-b-[1px] border-slate-400 my-1">
            <div className=" flex flex-col">
              <FontAwesomeIcon
                icon={faCalendar}
                className=" text-[40px] text-slate-500"
              />
              <select
                onChange={(e) => setSelectYear(e.target.value)}
                className=" text-center"
              >
                <option value="">Select year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>

            <div className=" flex flex-col">
              <FontAwesomeIcon
                icon={faFolder}
                className="text-[40px] text-slate-500"
              />
              <select
                onChange={(e) => setType(e.target.value)}
                className=" text-center"
              >
                <option>Select leave type</option>
                <option value="annual">Annual</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            <div>
              <label htmlFor="" className=" font-bold">
                From:{" "}
              </label>
              <input type="date" onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div>
              <label htmlFor="" className="  font-bold">
                To:{" "}
              </label>
              <input type="date" onChange={(e) => setTo(e.target.value)} />
            </div>
          </div>
        </div>
        <div className=" flex flex-row justify-end gap-8 text-[12px]">
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
                onClick={() => setType(null)}
              />
            </div>
          )}
          {from && (
            <div className=" flex bg-slate-200  px-3 py-1 rounded-[30px] gap-2 items-center">
              <div className=" ">{from}</div>
              <FontAwesomeIcon
                icon={faClose}
                className=" hover:text-red-500 cursor-pointer transition-all duration-200"
                onClick={() => setFrom(null)}
              />
            </div>
          )}
          {to && (
            <div className=" flex bg-slate-200  px-3 py-1 rounded-[30px] gap-2 items-center">
              <div className=" ">{to}</div>
              <FontAwesomeIcon
                icon={faClose}
                className=" hover:text-red-500 cursor-pointer transition-all duration-200"
                onClick={() => setTo(null)}
              />
            </div>
          )}

          <div className=" h-[26px] flex items-center ">{`${data?.length} records`}</div>
        </div>

        {filterUser ? (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border-collapse mb-10">
              <thead>
                <tr className=" text-[14px] text-slate-500">
                  <th className="py-3 px-4 rounded-tl-xl">Leave Year</th>
                  <th className="py-3 px-4">Leave Type</th>
                  <th className="py-3 px-4">From</th>
                  <th className="py-3 px-4">To</th>
                  <th className="py-3 px-4 rounded-tr-xl">Status</th>
                </tr>
              </thead>
              {filterUser.length !== 0 ? (
                <tbody className=" text-[14px]">
                  {filterUser
                    .slice(startIndex, startIndex + itemsPerPage)
                    .map((leave, i) => (
                      <tr
                        key={i}
                        className=" hover:bg-slate-100 transition-all cursor-pointer"
                        onClick={() => setShowDetails(leave)}
                      >
                        <td className="py-3 px-4  text-center">{leave.year}</td>
                        <td className="py-3 px-4 text-center">
                          {leave.leave_type}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {leave.startDate.split("T")[0]}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {leave.endDate.split("T")[0]}
                        </td>
                        <td className=" py-3 px-4">
                          <div
                            className={`font-medium text-center rounded-[4px] ${
                              leave.status === "approved"
                                ? "bg-green-600 text-white "
                                : leave.status === "rejected"
                                ? "bg-red-600 text-white"
                                : "bg-yellow-600 text-white"
                            }`}
                          >
                            {leave.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              ) : (
                <td colSpan={5}>
                  <img src={zeroData} alt="" className=" w-[200px] m-auto" />
                  <div className=" text-center m-auto mt-[-20px]">No data</div>
                </td>
              )}
            </table>
            <div className=" flex m-auto w-[70px] justify-around text-[#219ebc] z-[0] absolute bottom-5 left-0 right-0  ">
              <button
                disabled={startIndex === 0}
                className=" disabled:opacity-50"
              >
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  onClick={prevPage}
                  className="cursor-pointer text-2xl"
                />
              </button>
              <button
                className="disabled:opacity-50"
                disabled={startIndex + itemsPerPage >= filterUser.length}
              >
                <FontAwesomeIcon
                  icon={faChevronCircleRight}
                  className=" cursor-pointer text-2xl"
                  onClick={nextPage}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex items-center justify-center mt-10 h-full">
            <PulseLoader color="oklch(0.673 0.182 276.935)" size={12} />
          </div>
        )}
      </div>
      <AnimatePresence>
        {showDetails && (
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
              <LeaveApplication
                type={"details"}
                selectedLeave={showDetails}
                setShowDetails={setShowDetails}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeavePersonList;
