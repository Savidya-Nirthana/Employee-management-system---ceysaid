import { useContext, useState } from "react";
import OperationResponseModel from "./OperationResponseModel";
import { AuthContext } from "../../contexts/AuthContext";

const CustomerDetailsModal = ({ setOpen, selectSale, view }) => {
  const [openResponse, setOpenResponse] = useState(null);
  const { user } = useContext(AuthContext);
  const { role } = user;
  return (
    <div className=" w-[400px] h-[570px] ">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-[600px]">
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
          {role != "sales" ? (
            <button
              className="bg-[#2fa4c2] text-white px-2.5 py-1.5 rounded cursor-pointer hover:bg-black"
              onClick={() => setOpenResponse(true)}
            >
              Proceed
            </button>
          ) : (
            ""
          )}
          <button
            className="bg-[#c80000] text-white px-2.5 py-1.5 rounded cursor-pointer hover:bg-black"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
      {openResponse && (
        <OperationResponseModel setOpenResponse={setOpenResponse} />
      )}
    </div>
  );
};

export default CustomerDetailsModal;
