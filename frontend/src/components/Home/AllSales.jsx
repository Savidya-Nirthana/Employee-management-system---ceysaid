import { useState } from "react";
import { getSalesById } from "../../services/salesservices";
import CustomerDetailsModal from "../Models/CustomerDetailsModal";

const AllSales = () => {
  const [salesArray, setSalesArray] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectSale, setSelectSale] = useState(false);
  useState(() => {
    const getData = async () => {
      const response = await getSalesById("ceysaid01");
      setSalesArray(response);
      console.log(salesArray);
    };
    getData();
  });
  if (salesArray === null) return <div>loading</div>;
  return (
    <div className="rounded-[10px] my-2 shadow-lg shadow-black/25 m-5 bg-slate-50">
      <div className="flex items-center justify-center py-5 space-x-2">
        <input
          type="text"
          placeholder="Search by customer's name..."
          className="border rounded w-1/3 p-2 h-10"
        />
        <button className="bg-[#219ebc] hover:bg-black cursor-pointer text-white px-4 py-2 rounded h-10">
          Search
        </button>
      </div>
      <table className="table-auto w-[98%] m-auto">
        <thead className="">
          <tr>
            <th className="px-4 py-3 text-center">Name</th>
            <th className="px-4 py-3 text-center">Country</th>
            <th className="px-4 py-3 text-center">No of Days</th>
            <th className="px-4 py-3 text-center">Start Date</th>
            <th className="px-4 py-3 text-center">Argent</th>
            <th className="px-4 py-3 text-center">Active Status</th>
          </tr>
        </thead>
        <tbody className="">
          {salesArray.map((elt, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 border-t border-gray-300"
              onClick={() => {
                setOpen(!open);
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
                  className={`w-[30%] text-center rounded-full ${
                    elt.urgent
                      ? "bg-red-300 text-red-700"
                      : "text-green-700 bg-green-300"
                  }  min-w-[60px]`}
                >
                  {elt.urgent ? "Yes" : "No"}
                </div>
              </td>
              <td className="px-4 py-3 justify-items-center">
                <div
                  className={`w-[30%] text-center rounded-full ${
                    elt.status === "pending"
                      ? "bg-red-300 text-red-700"
                      : elt.status === "active"
                      ? "bg-green-300 text-green-700"
                      : "bg-blue-300 text-blue-700"
                  } min-w-[100px]`}
                >
                  {elt.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && (
        <CustomerDetailsModal setOpen={setOpen} selectSale={selectSale} />
      )}
    </div>
  );
};

export default AllSales;
