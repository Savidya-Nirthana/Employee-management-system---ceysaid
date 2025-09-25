import { useEffect, useRef, useState } from "react";
import { getSalesById } from "../../services/salesservices";
import CustomerDetailsModal from "../Models/CustomerDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import emptyData from "../../assets/images/messages/emptyData.png";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faGlobe,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "./SearchBar";

const AllSales = ({ refresh }) => {
  const { user } = useContext(AuthContext);
  const [salesArray, setSalesArray] = useState(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [selectSale, setSelectSale] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(11);
  const [startIndex, setStartIndex] = useState(0);
  const [search, setSearch] = useState([]);

  const nextPage = () => {
    if (startIndex + itemsPerPage < salesArray.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const response = await getSalesById(user.userId);
      setSalesArray(response.data);
      setSearch(response.data);
      // if (!response.isError) {
      //   if (!response.isEmpty) {
      //     let data = response.data.reverse();

      //     if (filteredCountry) {
      //       data = data.filter((u) => u.country === filteredCountry);
      //     }

      //     if (filteredPriority) {
      //       data = data.filter((u) => u.priority === filteredPriority);
      //     }

      //     if (filteredActiveStatus) {
      //       data = data.filter((u) => u.status === filteredActiveStatus);
      //     }

      //     if (type) {
      //       data = data.filter((u) =>
      //         String(u.customerDetails.name.toLowerCase()).includes(type)
      //       );
      //     }

      //     if (data.length <= 0) {
      //       setSalesArray([]);
      //       setCountries([]);
      //       setSearch([]);
      //     } else {
      //       setSalesArray(data);
      //       setCountries([...new Set(data.map((u) => String(u.country)))]);
      //       setSearch(data);
      //     }
      //   } else {
      //     setSalesArray([]);
      //     setCountries([]);
      //     setSearch([]);
      //   }
      // }
    };
    getData();
  }, [refresh]);

  return (
    <div className="rounded-[10px]   shadow-md shadow-black/25  bg-slate-0 h-auto  pb-[20px]">
      <div className="rounded-t-[10px] p-[5px] flex flex-row justify-start items-center gap-2">
        <h2 className=" text-xl font-semibold  text-slate-700 m-3 ">All sales</h2>
        <FontAwesomeIcon icon={faGlobe} className=" text-slate-700 text-xl" />
      </div>
      <SearchBar data={salesArray} search={search} setSearch={setSearch} />
      <div>
        <div className=" h-[600px] bg-slate-50 w-[100%] m-auto rounded-md">
          <table className="table-auto w-[100%] m-auto">
            <thead className="">
              <tr className=" border-b border-gray-300 text-slate-700 font-semibold">
                <th className="px-4 py-3 text-center">Name</th>
                <th className="px-4 py-3 text-center">Country</th>
                <th className="px-4 py-3 text-center">No of Days</th>
                <th className="px-4 py-3 text-center">Start Date</th>
                <th className="px-4 py-3 text-center">Priority</th>
                <th className="px-4 py-3 text-center">Active Status</th>
              </tr>
            </thead>
            <tbody className="">
              {search.length <= 0 ? (
                <div className="absolute w-[200px] h-[200px] left-0 right-0 m-auto opacity-50">
                  <img src={emptyData} className=" w-[200px] flex" />
                  <div className=" text-center text-[14px] font-bold text-blue-700 mt-[-10px]">
                    NO DATA
                  </div>
                </div>
              ) : (
                <>
                  {search
                    .slice(startIndex, startIndex + itemsPerPage)
                    .map((elt, index) => (
                      <tr
                        key={index}
                        className="hover:bg-white cursor-pointer border-t border-gray-300"
                        onClick={() => {
                          setOpen(true);
                          setSelectSale(elt);
                        }}
                      >
                        <td className="px-4 py-3 text-center">
                          {elt.customerDetails.name}
                        </td>
                        <td className="px-4 py-3 text-center">{elt.country}</td>
                        <td className="px-4 py-3 text-center">{elt.noDays}</td>
                        <td className="px-4 py-3 text-center">
                          {elt.startDate.split("T")[0]}
                        </td>
                        <td className="px-4 py-2 justify-items-center">
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
                        <td className="px-4 py-2 justify-items-center">
                          <div
                            className={`w-[90px] text-center rounded-full ${
                              elt.status === "pending"
                                ? "bg-red-300 text-red-700"
                                : elt.status === "active"
                                ? "bg-green-300 text-green-700"
                                : elt.status === "confirm"
                                ? " bg-orange-300 text-orange-600"
                                : " bg-blue-300 text-blue-700"
                            } min-w-[100px]`}
                          >
                            {elt.status[0].toUpperCase() +
                              elt.status.substring(1)}
                          </div>
                        </td>
                      </tr>
                    ))}
                </>
              )}
            </tbody>
          </table>
        </div>
        {search.length > 0 && (
          <div className=" flex m-auto w-[70px] justify-around h-[40px] text-[#219ebc]  z-[0] ">
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
              disabled={startIndex + itemsPerPage >= salesArray.length}
            >
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                className=" cursor-pointer text-2xl"
                onClick={nextPage}
              />
            </button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex justify-center z-[222] bg-[#00000065] items-center overflow-y-scroll"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CustomerDetailsModal
                view={view}
                selectSale={selectSale}
                setOpen={setOpen}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllSales;
