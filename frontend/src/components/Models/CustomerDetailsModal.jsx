import { useContext, useState } from "react";
import OperationResponseModel from "./OperationResponseModel";
import { AuthContext } from "../../contexts/AuthContext";
import { proceed } from "../../services/salesservices";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const CustomerDetailsModal = ({
  setOpen,
  selectSale,
  view,
  refresh,
  setRefresh,
}) => {
  const [openResponse, setOpenResponse] = useState(null);
  const { user } = useContext(AuthContext);
  const { role } = user;

  const proceedHandled = async () => {
    setOpenResponse(true);
    proceed(selectSale._id, user.userId);
  };

  return (
    <div>
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-[600px] relative">
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className="absolute top-[-5px] right-[-5px] text-slate-700 hover:text-red-500 cursor-pointer text-[30px]"
          onClick={() => setOpen(false)}
        />
        <div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-2 pr-30">Name</td>
                <td className="p-2">{selectSale.customerDetails.name}</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-2 w-[40%]">Contact Details</td>
                <td className="p-2">
                  {selectSale.customerDetails.contactDetails}
                </td>
              </tr>

              <tr className="border-t border-gray-300">
                <td className="p-2">Lead</td>
                <td className="p-2">{selectSale.customerDetails.lead}</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-2">Subject</td>
                <td className="p-2">{selectSale.subject}</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-2">Country</td>
                <td className="p-2">{selectSale.country}</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-2">Main Cities</td>
                <td className="p-2">{selectSale.mainCities.join(", ")}</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="pl-2 pt-2">Number of:</td>
              </tr>
              <tr>
                <td className="p-1 pl-10">Adults</td>
                <td className="pl-2">{selectSale.no_pax.adult}</td>
              </tr>
              <tr>
                <td className="p-1 pl-10">Child</td>
                <td className="pl-2">{selectSale.no_pax.child}</td>
              </tr>
              <tr>
                <td className="p-1 pb-2 pl-10">Infant</td>
                <td className="pl-2">{selectSale.no_pax.infant}</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-2">No of Days</td>
                <td className="p-2">{selectSale.noDays}</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-2">Starting Day</td>
                <td className="p-2">{selectSale.startDate.split("T")[0]}</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-2">Additional Details</td>
                <td className="p-2">{selectSale.additionalInfo}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-10 pt-2">
          {role != "sales" && role != "admin" ? (
            <button
              className="hover:bg-slate-700 hover:text-white text-slate-800 border-slate-700 border-[2px]  px-2.5 py-1.5 rounded cursor-pointer bg-white"
              onClick={proceedHandled}
            >
              Proceed
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <AnimatePresence>
        {openResponse && (
          <motion.div
            className="fixed inset-0 flex justify-center z-[222] bg-[#00000065] items-center overflow-y-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OperationResponseModel
                setOpenResponse={setOpenResponse}
                selectSale={selectSale}
                user={user}
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

export default CustomerDetailsModal;
