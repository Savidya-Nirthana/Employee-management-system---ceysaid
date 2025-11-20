  import {
    faCalendar,
    faChevronCircleLeft,
    faChevronCircleRight,
    faClose,
    faFolder,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { useEffect, useState } from "react";
  import { fetchLeaves } from "../services/leaveService";
  import { AnimatePresence, motion } from "framer-motion";
  import LeaveReject from "./Models/LeaveReject";
  import NoData from "../assets/images/messages/emptyData.png";
  import PulseLoader from "react-spinners/PulseLoader";

  const LeaveApplicationApp = ({toast}) => {
    const [leaves, setLeaves] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);

    const [to, setTo] = useState(null);
    const [from, setFrom] = useState(null);
    const [type, setType] = useState(null);
    const [selectYear, setSelectYear] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [startIndex, setStartIndex] = useState(0);
    const [refresh, setRefresh] = useState(false);

    const [filteredLeaves, setFilteredLeaves] = useState(null);
    const [search, setSearch] = useState("");

    const [update, setUpdate] = useState(false);
    useEffect(() => {
      const getLeaves = async () => {
        const data = await fetchLeaves();
        setLeaves(data);
        setFilteredLeaves(data);
      };
      getLeaves();
    }, [update, refresh]);

    const nextPage = () => {
      if (startIndex + itemsPerPage < leaves.length) {
        setStartIndex(startIndex + itemsPerPage);
      }
    };

    const prevPage = () => {
      if (startIndex - itemsPerPage >= 0) {
        setStartIndex(startIndex - itemsPerPage);
      }
    };

    useEffect(() => {
      if (!leaves) return;

      let filtered = leaves;

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

      if (search.trim()) {
        const filter = search.toLowerCase();
        filtered = filtered.filter((item) =>
          item.userId?.toLowerCase().includes(filter)
        );
      }

      setFilteredLeaves(filtered);
      setStartIndex(0);
    }, [selectYear, type, from, to, leaves, search]);
    return (
      <div className=" bg-slate-50 py-5 px-5 rounded-[10px]   border-[1px] m-auto border-slate-300 h-full w-[700px] relative">
        <div className=" flex flex-row justify-between pb-6">
          <div className="text-[20px] text-[#023047] font-semibold">
            Leave Application approvals
          </div>
          <input
            type="text"
            placeholder="Search by Employee ID..."
            className="    border-slate-500 border-[2px] p-1 rounded-lg text-[14px] w-[300px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
              className=" text-center"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select leave type</option>
              <option value="annual">Annual</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          <div>
            <label htmlFor="" className=" font-bold">
              From:{" "}
            </label>
            <input
              type="date"
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="" className="  font-bold">
              To:{" "}
            </label>
            <input
              type="date"
              onChange={(e) => {
                setTo(e.target.value);
              }}
            />
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

          <div className=" h-[26px] flex items-center ">{`${filteredLeaves?.length} records`}</div>
        </div>
        {filteredLeaves ? (
          <table className="min-w-[600px] m-auto">
            <thead className=" text-[14px] text-slate-500">
              <tr>
                <th className=" py-3">Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Leave Year</th>
              </tr>
            </thead>
            {filteredLeaves.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan="5" className="py-4">
                    <img src={NoData} alt="" className=" w-[200px] m-auto" />
                    <div className=" text-center text-slate-500 mt-2">
                      No leave applications found
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
            <tbody className=" text-[14px] text-slate-500 text-center">
              {filteredLeaves
                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                .slice(startIndex, startIndex + itemsPerPage)
                .map((leave) => (
                  <tr
                    key={leave._id}
                    className="  hover:bg-slate-100 cursor-pointer"
                    onClick={() => {
                      setShowDetails(true);
                      setSelectedLeave(leave);
                    }}
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        {leave.img ? (
                          <img
                            className=" w-7 h-7 rounded-full object-cover"
                            src={leave.img}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-[28px] text-[#219ebc]"
                          />
                        )}

                        <span>{leave.userId}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">{leave.leave_type}</td>
                    <td className="px-4 py-2">{leave.startDate.split("T")[0]}</td>
                    <td className="px-4 py-2">{leave.endDate.split("T")[0]}</td>
                    <td className="px-4 py-2">{leave.year}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className=" flex items-center justify-center mt-[-100px]   h-full ">
            <PulseLoader color="oklch(0.673 0.182 276.935)" size={12} />
          </div>
        )}

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
            disabled={startIndex + itemsPerPage >= leaves.length}
          >
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className=" cursor-pointer text-2xl"
              onClick={nextPage}
            />
          </button>
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
                <LeaveReject
                  showComment={showComment}
                  setShowComment={setShowComment}
                  setShowDetails={setShowDetails}
                  selectedLeave={selectedLeave}
                  toast={toast}
                  update={update}
                  setUpdate={setUpdate}
                  setSelectedLeave={setSelectedLeave}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  export default LeaveApplicationApp;
