import { useState } from "react";
import { getData } from "../../services/authservice";
import { salesApprovalData } from "../../services/salesservices";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import emptyData from "../../assets/images/messages/emptyData.png";
import SalesSecondRes from "../Models/salesSecondRes";
import ResponseDetails from "../Models/ResponseDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import SearchBar from "./SearchBar";

const SalesApproval = () => {
  const { user } = useContext(AuthContext);
  const userId = user.userId;
  const [dataArray, setDataArray] = useState([]);
  const [resOpen, setResOpen] = useState(false);
  const [selectSale, setSelectSale] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [startIndex, setStartIndex] = useState(0);
  const [search, setSearch] = useState([]);

  const nextPage = () => {
    if (startIndex + itemsPerPage < dataArray.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  useEffect(() => {
    if (resOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [resOpen]);

  useEffect(() => {
    const getData = async () => {
      const response = await salesApprovalData(userId);
      if (!response.isZero) {
        setDataArray(response.data);
        setSearch(response.data);
      } else {
        setDataArray([]);
        setSearch([]);
      }
    };

    getData();
  }, [userId]);
  return (
    <>
      <div className="rounded-[10px] border-[1px]  border-slate-300  h-[800px] w-[100%] m-auto   bg-slate-0  pb-[20px]">
        <div className="  rounded-t-[10px] text-slate-700 p-2 flex flex-row items-center gap-2">
          <h2 className=" text-xl font-semibold    m-2">Approval sales</h2>
          <FontAwesomeIcon icon={faThumbsUp} />
        </div>
        <SearchBar data={dataArray} search={search} setSearch={setSearch} />
        <div className=" flex-col flex justify-between gap-10 ">
          <div className="h-[400px] ">
            <table className=" w-[100%] text-center">
              <thead className=" border-y border-gray-300 bg-slate-50 text-slate-600">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Country</th>
                <th className="px-4 py-3 text-left">No of days</th>
                <th className="px-4 py-3 text-left">Start Date</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Active status</th>
                <th className="px-4 py-3 text-left">Approved by</th>
              </thead>
              <tbody>
                {search.length > 0 ? (
                  search
                    .slice(startIndex, startIndex + itemsPerPage)
                    .map((elt, index) => (
                      <tr
                        key={index}
                        className=" border-y hover:bg-slate-50 border-gray-300 cursor-pointer text-slate-500"
                        onClick={() => {
                          setResOpen(true);
                          setSelectSale(elt);
                        }}
                      >
                        <td className="px-4 py-3 text-left ">
                          {elt.customerDetails.name}
                        </td>
                        <td className="px-4 py-3 text-left">{elt.country}</td>
                        <td className="px-4 py-3 text-left">{elt.noDays}</td>
                        <td className="px-4 py-3 text-left">
                          {elt.startDate.split("T")[0]}
                        </td>
                        <td className="px-4 py-2">
                          <div
                            className={`w-[90px]  text-center rounded-full ${
                              elt.priority === "low"
                                ? "bg-green-300 text-green-700"
                                : elt.priority === "normal"
                                ? "bg-yellow-300 text-yellow-700"
                                : "bg-red-300 text-red-700"
                            }  min-w-[80px]`}
                          >
                            {elt.priority[0].toUpperCase() +
                              elt.priority.substring(1)}
                          </div>
                        </td>
                        <td className={`px-4 py-2`}>
                          <div
                            className={`  w-[90px]  text-center rounded-full ${
                              elt.status === "pending"
                                ? "bg-red-300 text-red-700"
                                : elt.status === "active"
                                ? "bg-green-300 text-green-700"
                                : elt.status === "confirm"
                                ? " bg-orange-300 text-orange-600"
                                : "bg-blue-300 text-blue-700"
                            } `}
                          >
                            {elt.status[0].toUpperCase() +
                              elt.status.substring(1)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {elt.approvedBy}
                        </td>
                      </tr>
                    ))
                ) : (
                  <div className=" absolute w-[200px] h-[200px] left-0 right-0 m-auto opacity-50 ">
                    <img src={emptyData} />
                  </div>
                )}
              </tbody>
            </table>
          </div>

          <div className=" flex m-auto w-[70px] justify-around text-[#219ebc] h-[20px] z-[0]">
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
              disabled={startIndex + itemsPerPage >= dataArray.length}
            >
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                className=" cursor-pointer text-2xl"
                onClick={nextPage}
              />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {resOpen && selectSale && (
          <motion.div
            key="sales-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[222] bg-[#00000065] overflow-y-auto"
          >
            <div className="flex justify-center items-start min-h-screen p-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg w-full max-w-[900px]"
              >
                <ResponseDetails
                  resOpen={resOpen}
                  selectSale={selectSale}
                  setResOpen={setResOpen}
                  setSelectSale={setSelectSale}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SalesApproval;
