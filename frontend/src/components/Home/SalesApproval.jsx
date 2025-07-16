import { useState } from "react";
import { getData } from "../../services/authservice";
import { salesApprovalData } from "../../services/salesservices";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import emptyData from "../../assets/images/messages/emptyData.png";
import SalesSecondRes from "../Models/salesSecondRes";
import ResponseDetails from "../Models/ResponseDetails";

const SalesApproval = () => {
  const { user } = useContext(AuthContext);
  const userId = user.userId;
  const [dataArray, setDataArray] = useState([]);
  const [resOpen, setResOpen] = useState(false);
  const [selectSale, setSelectSale] = useState(null);

  useState(() => {
    const getData = async () => {
      const response = await salesApprovalData(userId);
      if (!response.isZero) {
        setDataArray(response.data);
      } else {
        setDataArray([]);
      }
    };

    getData();
  }, []);
  return (
    <div className="rounded-[10px]  my-2 shadow-md h-[600px] shadow-black/25 m-5 bg-slate-0 px-[20px] py-[20px]">
      <h2 className=" text-xl font-semibold  text-slate-600 m-2">
        Approval sales
      </h2>
      <hr className="border-t border-gray-300 my-4"></hr>
      <table className=" w-[100%] text-center ">
        <thead>
          <th className="px-4 py-3 text-center">Name</th>
          <th className="px-4 py-3 text-center">Country</th>
          <th className="px-4 py-3 text-center">No of days</th>
          <th className="px-4 py-3 text-center">Start Date</th>
          <th className="px-4 py-3 text-center">Priority</th>
          <th className="px-4 py-3 text-center">Approved by</th>
        </thead>
        <tbody>
          {dataArray.length > 0 ? (
            dataArray.map((elt, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 border-t border-gray-300"
                onClick={() => {
                  setResOpen(true);
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
                    className={`w-[40%]  text-center rounded-full ${
                      elt.priority === "low"
                        ? "bg-green-300 text-green-700"
                        : elt.priority === "normal"
                        ? "bg-yellow-300 text-yellow-700"
                        : "bg-red-300 text-red-700"
                    }  min-w-[80px]`}
                  >
                    {elt.priority[0].toUpperCase() + elt.priority.substring(1)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">{elt.approvedBy}</td>
              </tr>
            ))
          ) : (
            <div className=" absolute w-[200px] h-[200px] left-0 right-0 m-auto opacity-50 ">
              <img src={emptyData} />
            </div>
          )}
        </tbody>
      </table>
      {resOpen && selectSale && (
        <div className="fixed inset-0 flex justify-center  z-222 bg-[#ffffffd2] items-center overflow-y-scroll">
          <ResponseDetails resOpen={resOpen} selectSale={selectSale} setResOpen={setResOpen} setSelectSale={setSelectSale}/> 
        </div>
      )}
    </div>
  );
};

export default SalesApproval;
