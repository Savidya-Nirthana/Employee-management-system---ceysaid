import { useEffect, useState, useContext } from "react";
import { getSalesById } from "../../services/salesservices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../contexts/AuthContext";
import emptyData from "../../assets/images/messages/emptyData.png";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faGlobe,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "./SearchBar";
import AllDetailSales from "../Models/AllDetailSales";
import LoadingModal from "../Models/LoadingModel";

const AllSales = ({ refresh, type, setOpenA, openA }) => {
  const { user } = useContext(AuthContext);

  const [salesArray, setSalesArray] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectSale, setSelectSale] = useState(null);

  const [itemsPerPage] = useState(11);
  const [startIndex, setStartIndex] = useState(0);

  const nextPage = () => {
    if (startIndex + itemsPerPage < search.length) {
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
      setLoading(true);

      let response;
      if (type === "profit") {
        response = await getSalesById(openA);
      } else {
        response = await getSalesById(user.userId);
      }

      setSalesArray(response.data || []);
      setSearch(response.data || []);
      setStartIndex(0);
      setLoading(false);
    };

    getData();
  }, [refresh]);

  return (
    <div className="rounded-[10px] border m-auto border-slate-300 bg-white pb-[20px] relative">
      {type === "profit" && (
        <div
          onClick={() => setOpenA(null)}
          className="bg-red-500 absolute right-[-10px] top-[-10px] w-[40px] h-[40px] rounded-full text-white flex items-center justify-center cursor-pointer hover:bg-red-600"
        >
          <FontAwesomeIcon icon={faClose} className="text-[20px]" />
        </div>
      )}

      <div className="rounded-t-[10px] p-[5px] flex items-center gap-2">
        <h2 className="text-xl font-semibold text-slate-700 m-3">All sales</h2>
        <FontAwesomeIcon icon={faGlobe} className="text-slate-700 text-xl" />
      </div>

      {loading ? (
        <LoadingModal />
      ) : (
        <SearchBar data={salesArray} search={search} setSearch={setSearch} />
      )}

      <div className="h-[600px] w-full m-auto rounded-md">
        <table className="table-auto w-full">
          <thead>
            <tr className="border border-gray-300 bg-slate-50 text-slate-600">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Country</th>
              <th className="px-4 py-3 text-left">No of Days</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Active Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  <LoadingModal />
                </td>
              </tr>
            ) : search.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <div className="w-[200px] m-auto opacity-50">
                    <img src={emptyData} className="w-[200px]" />
                    <div className="text-center text-[14px] font-bold text-blue-700 -mt-2">
                      NO DATA
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              search
                .slice(startIndex, startIndex + itemsPerPage)
                .map((elt, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 cursor-pointer border-b text-slate-500"
                    onClick={() => {
                      setOpen(true);
                      setSelectSale(elt);
                    }}
                  >
                    <td className="px-4 py-3">{elt.customerDetails.name}</td>
                    <td className="px-4 py-3">{elt.country}</td>
                    <td className="px-4 py-3">{elt.noDays}</td>
                    <td className="px-4 py-3">
                      {elt.startDate.split("T")[0]}
                    </td>
                    <td className="px-4 py-2">
                      <div
                        className={`w-[90px] text-center rounded-full ${
                          elt.priority === "low"
                            ? "bg-green-300 text-green-700"
                            : elt.priority === "normal"
                            ? "bg-yellow-300 text-yellow-700"
                            : "bg-red-300 text-red-700"
                        }`}
                      >
                        {elt.priority[0].toUpperCase() +
                          elt.priority.substring(1)}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div
                        className={`w-[100px] text-center rounded-full ${
                          elt.status === "pending"
                            ? "bg-red-300 text-red-700"
                            : elt.status === "completed"
                            ? "bg-green-300 text-green-700"
                            : elt.status === "confirm"
                            ? "bg-orange-300 text-orange-600"
                            : elt.status === "processing"
                            ? "bg-blue-300 text-blue-700"
                            : "bg-yellow-300"
                        }`}
                      >
                        {elt.status[0].toUpperCase() +
                          elt.status.substring(1)}
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && search.length > 0 && (
        <div className="flex m-auto w-[70px] justify-around h-[40px] text-[#219ebc]">
          <button disabled={startIndex === 0} className="disabled:opacity-50">
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              onClick={prevPage}
              className="text-2xl cursor-pointer"
            />
          </button>

          <button
            disabled={startIndex + itemsPerPage >= search.length}
            className="disabled:opacity-50"
          >
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              onClick={nextPage}
              className="text-2xl cursor-pointer"
            />
          </button>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#00000065] flex justify-center items-center z-[222] overflow-y-scroll"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AllDetailSales open={selectSale} setOpen={setOpen} type={"allsales"} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllSales;
