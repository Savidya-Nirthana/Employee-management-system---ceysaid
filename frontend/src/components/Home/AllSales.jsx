import { useState } from "react";
import { getSalesById } from "../../services/salesservices";

const AllSales = () => {
  const [salesArray, setSalesArray] = useState(null);
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
    <div className="">
      <table className="table-auto w-full">
        <thead className="">
          <tr>
            <th className="px-4 py-3 text-center">Name</th>
            <th className="px-4 py-3 text-center">Country</th>
            <th className="px-4 py-3 text-center">No of Days</th>
            <th className="px-4 py-3 text-center">Start Date</th>
            <th className="px-4 py-3 text-center">Active Status</th>
          </tr>
        </thead>
        <tbody>
          {salesArray.map((elt, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 border-t border-gray-300"
            >
              <td className="px-4 py-3 text-center">
                {elt.customerDetails.name}
              </td>
              <td className="px-4 py-3 text-center">{elt.country}</td>
              <td className="px-4 py-3 text-center">{elt.noDays}</td>
              <td className="px-4 py-3 text-center">
                {elt.startDate.split("T")[0]}
              </td>
              <td className="px-4 py-3 justify-items-center">
                <div
                  className={`w-[30%] text-center rounded-full ${
                    elt.status === "pending"
                      ? "bg-red-300 text-red-700"
                      : elt.status === "active"
                      ? "bg-green-300 text-green-700"
                      : "bg-blue-300 text-blue-700"
                  }`}
                >
                  {elt.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSales;
