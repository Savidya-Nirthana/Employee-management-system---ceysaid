import { useEffect, useRef, useState } from "react";
import { getSalesById } from "../../services/salesservices";
import CustomerDetailsModal from "../Models/CustomerDetailsModal";
import { Countries } from "../../data/countries";

const AllSales = () => {
  const [salesArray, setSalesArray] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectSale, setSelectSale] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [selectCountry, setSelectCountry] = useState(null);
  const [countriesArray, setCountriesArray] = useState(Countries);
  const showCountryRef = useRef(false);
  const showPriorityRef = useRef(false);
  const [showPriority, setShowPriority] = useState(false);
  const [priority, setPriority] = useState("All");
  const showStatusRef = useRef(false);
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState("All");
  useState(() => {
    const getData = async () => {
      const response = await getSalesById("ceysaid01");
      setSalesArray(response);
      console.log(salesArray);
    };
    getData();
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCountryRef.current &&
        !showCountryRef.current.contains(event.target)
      ) {
        setShowCountries(false);
      }

      if (
        showPriorityRef.current &&
        !showPriorityRef.current.contains(event.target)
      ) {
        setShowPriority(false);
      }

      if (
        showStatusRef.current &&
        !showStatusRef.current.contains(event.targert)
      ) {
        setShowStatus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const handlesCountrySearch = async (e) => {
    const value = e.target.value;
    setShowCountries(true);
    setSelectCountry(value);
    const results = await Countries.filter((c) =>
      c.country.toLowerCase().includes(value.toLowerCase())
    );

    setCountriesArray(results);
  };
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
      <div className=" flex justify-around">
        <div className="">
          <div className=" text-slate-600 font-semibold my-2">Country:</div>
          <input
            type="text"
            onClick={() => setShowCountries(true)}
            onChange={handlesCountrySearch}
            value={selectCountry}
            placeholder="All"
            className=" w-[200px] outline-pink-400 border-[2px] rounded-md border-slate-300 p-1 text-slate-600"
            name=""
            id=""
          />
          {showCountries && (
            <div
              className=" bg-slate-50 max-h-[300px] scroll-auto overflow-y-scroll w-[200px] absolute"
              ref={showCountryRef}
            >
              {countriesArray.map((e, index) => (
                <div
                  className=" hover:bg-pink-400 hover:text-white p-2"
                  key={index}
                  onClick={() => {
                    setShowCountries(false);
                    setSelectCountry(e.country);
                  }}
                >
                  {e.country}
                </div>
              ))}
              <div
                className="hover:bg-pink-400 hover:text-white p-2"
                onClick={() => {
                  setShowCountries(false);
                  setSelectCountry(selectCountry);
                }}
              >
                {selectCountry}
              </div>
            </div>
          )}
        </div>
        <div ref={showPriorityRef}>
          <div onClick={() => setShowPriority(true)} className=" text-slate-600 font-semibold my-2">Priority:</div>
          <div
            type="text"
            className=" w-[200px] outline-pink-400 border-[2px] rounded-md border-slate-300 p-1 text-slate-400"
            onClick={() => setShowPriority(!showPriority)}
          >
            {priority}
          </div>
          {showPriority && (
            <div className="bg-slate-50 max-h-[300px]  w-[200px] absolute">
              <div
                className="hover:bg-pink-400 hover:text-white p-2"
                onClick={() => {
                  setPriority("All");
                  setShowPriority(false);
                }}
              >
                All
              </div>
              <div
                onClick={() => {
                  setPriority("Low");
                  setShowPriority(false);
                }}
                className="hover:bg-pink-400 hover:text-white p-2"
              >
                Low
              </div>
              <div
                onClick={() => {
                  setPriority("Medium");
                  setShowPriority(false);
                }}
                className="hover:bg-pink-400 hover:text-white p-2"
              >
                Medium
              </div>
              <div
                onClick={() => {
                  setPriority("High");
                  setShowPriority(false);
                }}
                className="hover:bg-pink-400 hover:text-white p-2"
              >
                High
              </div>
            </div>
          )}
        </div>

        <div ref={showStatusRef}>
          <div onClick={() => setShowStatus(true)} className="text-slate-600 font-semibold my-2">Status:</div>
          <div
            type="text"
            className=" w-[200px] outline-pink-400 border-[2px] rounded-md border-slate-300 p-1 text-slate-400"
            onClick={() => setShowStatus(!showStatus)}
          >
            {status}
          </div>
          {showStatus && (
            <div className="bg-slate-50 max-h-[300px]  w-[200px] absolute">
              <div
                className="hover:bg-pink-400 hover:text-white p-2"
                onClick={() => {
                  setStatus("All");
                  setShowStatus(false);
                }}
              >
                All
              </div>
              <div
                onClick={() => {
                  console.log("clicked");
                  setStatus("Pending");
                  setShowStatus(false);
                }}
                className="hover:bg-pink-400 hover:text-white p-2"
              >
                Pending
              </div>
              <div
                onClick={() => {
                  setStatus("Confirmed");
                  setShowStatus(false);
                }}
                className="hover:bg-pink-400 hover:text-white p-2"
              >
                Confirmed
              </div>
              <div
                onClick={() => {
                  setStatus("Cancled");
                  setShowStatus(false);
                }}
                className="hover:bg-pink-400 hover:text-white p-2"
              >
                Cancled
              </div>
            </div>
          )}
        </div>
      </div>
      <table className="table-auto w-[98%] m-auto mt-10">
        <thead className="">
          <tr>
            <th className="px-4 py-3 text-center">Name</th>
            <th className="px-4 py-3 text-center">Country</th>
            <th className="px-4 py-3 text-center">No of Days</th>
            <th className="px-4 py-3 text-center">Start Date</th>
            <th className="px-4 py-3 text-center">Urgent</th>
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
