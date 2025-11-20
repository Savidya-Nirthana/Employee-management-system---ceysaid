import { useEffect, useState } from "react";
import { getAddProfit } from "../../services/profitservices";
import LoadingModal from "../Models/LoadingModel";
import { AnimatePresence, motion } from "framer-motion";
import AllSales from "../Home/AllSales";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

const ProfitTable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(11);
  const [startIndex, setStartIndex] = useState(0);

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
    const getData = async () => {
      const response = await getAddProfit();
      const flattenedUsers = response.map((user) => {
        // 1. Initialize the new object with base properties
        const baseObject = {
          userId: user.userId,
          name: user.fullName,
        };

        const statusCounts = user.statuses.reduce((acc, statusItem) => {
          acc[statusItem.status] = statusItem.count;
          return acc;
        }, {});

        return { ...baseObject, ...statusCounts };
      });

      console.log(flattenedUsers);
      setData(flattenedUsers);
    };
    getData();
  }, []);


  return (
    <div className="bg-slate-50 px-10 py-4  rounded-[10px]  border border-slate-300 w-[1000px] ml-5 relative">
      <div className="text-xl font-semibold  text-slate-600 m-2 flex gap-5 items-center">
        <div>User Sales Report</div>
        <FontAwesomeIcon icon={faClipboard} />
      </div>

      <div className="w-full overflow-x-auto  rounded-lg h-[600px]">
        <table className="w-full min-w-max">
          {/* Table Header */}
          <thead className="h-[50px] text-slate-700 text-[14px]">
            <tr>
              <th className="text-center  px-6 py-4 ">User_ID</th>
              <th className="text-center  px-6 py-4 ">Name</th>
              <th className="text-center px-6 py-4 ">Pending</th>
              <th className="text-center  px-6 py-4 ">Approval</th>
              <th className="text-center px-6 py-4 ">Confirm</th>
              <th className="text-center  px-6 py-4 ">Processing</th>
              <th className="text-center  px-6 py-4 ">Completed</th>
              <th className="text-center  px-6 py-4 ">Total</th>
            </tr>
          </thead>
          {data ? (
            <tbody className="">
              {data.map((row, index) => (
                <tr
                  className=" h-[50px]   hover:bg-slate-100 cursor-pointer text-[14px] text-slate-600"
                  key={index}
                  onClick={() => setOpen(row.userId)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {row.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowGrap text-sm text-gray-700 text-center">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {row.pending ? row.pending : 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {row.approval ? row.approval : 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {row.confirm ? row.confirm : 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {row.processing ? row.processing : 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {row.completed ? row.completed : 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {row.pending
                      ? row.pending
                      : 0 + row.approval
                      ? row.approval
                      : 0 + row.confirm
                      ? row.confirm
                      : 0 + row.processing
                      ? row.processing
                      : 0 + row.completed
                      ? row.completed
                      : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <LoadingModal />
          )}
        </table>
      </div>
      {console.log(open)}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[222] bg-[#00000065] overflow-y-auto flex items-center justify-center p-4"
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
              className="w-full max-w-[900px] mx-auto mt-70 my-8"
            >
              <AllSales type={"profit"} setOpenA={setOpen} openA={open} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className=" flex m-auto w-[70px] justify-around h-[40px] text-[#219ebc]  z-[0] ">
        <button disabled={startIndex === 0} className=" disabled:opacity-50">
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            onClick={prevPage}
            className="cursor-pointer text-2xl"
          />
        </button>
        <button
          className="disabled:opacity-50"
          disabled={startIndex + itemsPerPage >= data.length}
        >
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            className=" cursor-pointer text-2xl"
            onClick={nextPage}
          />
        </button>
      </div>
    </div>
  );
};

export default ProfitTable;
