import { faDiagramPredecessor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getProcess } from "../../services/salesservices";
import LoadingModal from "../Models/LoadingModel";
import NoData from "../../assets/images/messages/emptyData.png";
import { AnimatePresence, motion } from "framer-motion";
import AllDetailSales from "../Models/AllDetailSales";

const Processing = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useState(() => {
    const getData = async () => {
      const response = await getProcess();
      setData(response.data.data);
    };
    getData();
  }, [refresh]);

  return (
    <div className="rounded-[10px]   border-[1px] m-auto border-slate-300 h-auto  pb-[20px] mx-9">
      <div className="rounded-t-[10px] p-[5px] flex flex-row justify-start items-center gap-2">
        <h2 className=" text-xl font-semibold  text-slate-700 m-3 ">
          Processing
        </h2>
        <FontAwesomeIcon
          icon={faDiagramPredecessor}
          className=" text-slate-700 text-xl"
        />
      </div>
      {/* <SearchBar data={salesArray} search={search} setSearch={setSearch} /> */}
      <div>
        <div className=" h-[600px]  w-[100%]  m-auto rounded-md">
          {!data ? (
            <LoadingModal />
          ) : (
            <table className="table-auto m-auto rounded-md w-[100%]">
              <thead className=" ">
                <tr className=" border border-gray-300 bg-slate-50 text-slate-600 ">
                  <th className="px-4 py-3 text-center ">Name</th>
                  <th className="px-4 py-3 text-center ">Country</th>
                  <th className="px-4 py-3 text-center">No of Days</th>
                  <th className="px-4 py-3 text-center">Start Date</th>
                  <th className="px-4 py-3 text-center ">Priority</th>
                  <th className="px-4 py-3 text-center ">User Id</th>
                </tr>
              </thead>
              <tbody className="">
                {data.length == 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className=" flex items-center flex-col">
                        <img src={NoData} alt="" className="w-[200px]" />
                        <div className="mt-[-30px] text-slate-600">
                          No data found
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((elt, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 border-t border-gray-300 cursor-pointer transition-all duration-200"
                      onClick={() => setOpen(elt)}
                    >
                      <td className=" text-center">
                        {elt.customerDetails.name}
                      </td>
                      <td className=" text-center">{elt.country}</td>
                      <td className=" text-center">{elt.noDays}</td>
                      <td className=" text-center">
                        {elt.startDate.split("T")[0]}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div
                          className={`w-[90px]  m-auto rounded-full  ${
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
                      <td className=" text-center">{elt.userId}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
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
              <AllDetailSales
                open={open}
                setOpen={setOpen}
                setRefresh={setRefresh}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Processing;
