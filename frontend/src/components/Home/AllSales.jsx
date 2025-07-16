import { useEffect, useRef, useState } from "react";
import { getSalesById } from "../../services/salesservices";
import CustomerDetailsModal from "../Models/CustomerDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import emptyData from "../../assets/images/messages/emptyData.png";
import {
  faCaretDown,
  faChevronCircleLeft,
  faChevronCircleRight,
  faClose,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const AllSales = ({ refresh }) => {
  const { user } = useContext(AuthContext);
  const searchRef = useRef(null);
  const [type, setType] = useState(null);
  const [salesArray, setSalesArray] = useState(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [selectSale, setSelectSale] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(11);
  const [startIndex, setStartIndex] = useState(0);
  const [search, setSearch] = useState([]);

  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState(false);
  const [filteredCountry, setFilteredCountry] = useState(null);
  const [applyFilter, setApplyFilter] = useState(false);

  const [showPriority, setShowPriority] = useState(false);
  const [filteredPriority, setFilteredPriority] = useState(null);

  const [showActiveStatus, setShowActiveStatus] = useState(false);
  const [filteredActiveStatus, setFilteredActiveStatues] = useState(null);

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

      if (!response.isError) {
        if (!response.isEmpty) {
          let filtered = response.data.reverse();
          if (filteredPriority) {
            filtered = response.filter((u) => u.priority === filteredPriority);
          }

          if (filteredActiveStatus) {
            filtered = response.filter(
              (u) => u.status === filteredActiveStatus
            );
          }

          if (filteredCountry) {
            filtered = response.filter((u) => u.country === filteredCountry);
          }

          if (filtered.length <= 0) {
            setSalesArray([]);
            setCountries([]);
            setSearch([]);
          } else {
            setSalesArray(filtered);
            setCountries([...new Set(filtered.map((u) => String(u.country)))]);
            setSearch(filtered);
          }
        } else {
          setSalesArray([]);
          setCountries([]);
          setSearch([]);
        }
      }
    };
    getData();
  }, [refresh, filteredPriority, filteredActiveStatus, filteredCountry]);

  const handleSearch = async () => {
    const value = type;
    let result;
    result = await salesArray.filter((u) =>
      String(u.customerDetails.name.toLowerCase()).includes(value)
    );

    setSearch(result);
  };

  const handledInput = async (e) => {
    e.preventDefault();
    const value = e.target.value.trim().toLowerCase();
    setType(value);
  };

  const filterHandler = (filterType, filterValue) => {
    if (filterType === "country") {
      setApplyFilter(true);
      setShowCountries(false);
      setFilteredCountry(filterValue);
    } else if (filterType === "priority") {
      setShowPriority(false);
      setFilteredPriority(filterValue);
      setApplyFilter(true);
    } else if (filterType === "activeStatus") {
      setShowActiveStatus(false);
      setFilteredActiveStatues(filterValue);
      setApplyFilter(true);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [type, applyFilter]);

  return (
    <div className="rounded-[10px]  my-2 shadow-md shadow-black/25 m-5 bg-slate-0 h-auto px-[20px] py-[20px]">
      <h2 className=" text-xl font-semibold  text-slate-600 m-2">All sales</h2>
      <hr className="border-t border-gray-300 my-4"></hr>
      <div className=" w-[100%] flex-col flex items-center  relative pt-10">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className=" absolute left-[10%] top-[53px] pl-[15px]"
        />
        <input
          type="text"
          className=" border-gray-600 border-2 w-[80%] h-[40px] rounded-2xl px-[50px]"
          placeholder="Search for a name"
          onChange={handledInput}
          ref={searchRef}
        />
        {type ? (
          <FontAwesomeIcon
            icon={faClose}
            className=" absolute top-[53px] right-[10%] pr-[15px]"
            onClick={() => {
              searchRef.current.value = null;
              setSearch(salesArray);
            }}
          />
        ) : (
          ""
        )}
        <div className=" flex-row flex w-[80%] justify-evenly mt-5">
          <div
            className="  w-[33.33%] bg-white text-center rounded-t-2xl p-[10px] "
            onMouseEnter={() => setShowCountries(true)}
            onMouseLeave={() => {
              setShowCountries(false);
            }}
          >
            <div className=" ">Country</div>
            <div className=" bg-slate-100 mx-2 rounded-md absolute">
              {filteredCountry && (
                <p className=" px-4">
                  {filteredCountry}{" "}
                  <FontAwesomeIcon
                    className=" cursor-pointer"
                    onClick={() => {
                      setFilteredCountry(null);
                      setApplyFilter(false);
                    }}
                    icon={faClose}
                  />
                </p>
              )}
            </div>

            {showCountries && !filteredCountry && (
              <div className="  h-[570px] absolute">
                <div className="bg-white p-5 rounded-lg shadow-lg max-w-[600px]">
                  <ul className=" flex flex-row flex-wrap gap-4">
                    {countries.map((c, index) => (
                      <li
                        onClick={() => filterHandler("country", c)}
                        key={index}
                        className=" bg-slate-100 px-3 rounded-md text-slate-800"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div
            className="  w-[33.33%] bg-white text-center rounded-t-2xl p-[10px] "
            onMouseEnter={() => setShowPriority(true)}
            onMouseLeave={() => {
              setShowPriority(false);
            }}
          >
            <div className=" ">Priority</div>
            <div className=" bg-slate-100 mx-2 rounded-md absolute">
              {filteredPriority && (
                <p className=" px-4">
                  {filteredPriority}{" "}
                  <FontAwesomeIcon
                    className=" cursor-pointer"
                    onClick={() => {
                      setFilteredPriority(null);
                      setApplyFilter(false);
                    }}
                    icon={faClose}
                  />
                </p>
              )}
            </div>

            {showPriority && !filteredPriority && (
              <div className="  h-[570px] absolute">
                <div className="bg-white p-5 rounded-lg shadow-lg max-w-[600px]">
                  <ul className=" flex flex-row flex-wrap gap-4">
                    <li
                      onClick={() => filterHandler("priority", "high")}
                      className=" bg-slate-100 px-3 rounded-md text-slate-800"
                    >
                      High
                    </li>
                    <li
                      onClick={() => filterHandler("priority", "normal")}
                      className=" bg-slate-100 px-3 rounded-md text-slate-800"
                    >
                      Normal
                    </li>
                    <li
                      onClick={() => filterHandler("priority", "low")}
                      className=" bg-slate-100 px-3 rounded-md text-slate-800"
                    >
                      Low
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div
            className="  w-[33.33%] bg-white text-center rounded-t-2xl p-[10px] "
            onMouseEnter={() => setShowActiveStatus(true)}
            onMouseLeave={() => {
              setShowActiveStatus(false);
            }}
          >
            <div className="">Active Status</div>
            <div className=" bg-slate-100 mx-2 rounded-md absolute">
              {filteredActiveStatus && (
                <p className=" px-4">
                  {filteredActiveStatus}{" "}
                  <FontAwesomeIcon
                    className=" cursor-pointer"
                    onClick={() => {
                      setFilteredActiveStatues(null);
                      setApplyFilter(false);
                    }}
                    icon={faClose}
                  />
                </p>
              )}
            </div>
            {showActiveStatus && !filteredActiveStatus && (
              <div className="  h-[570px] absolute">
                <div className="bg-white p-5 rounded-lg shadow-lg max-w-[600px]">
                  <ul className=" flex flex-row flex-wrap gap-4">
                    <li
                      onClick={() => filterHandler("activeStatus", "pending")}
                      className=" bg-slate-100 px-3 rounded-md text-slate-800"
                    >
                      Pending
                    </li>
                    <li
                      onClick={() => filterHandler("activeStatus", "done")}
                      className=" bg-slate-100 px-3 rounded-md text-slate-800"
                    >
                      Done
                    </li>
                    <li
                      onClick={() => filterHandler("activeStatus", "review")}
                      className=" bg-slate-100 px-3 rounded-md text-slate-800"
                    >
                      Review
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" flex-col flex justify-between gap-10">
        <div className=" h-[600px]">
          <table className="table-auto w-[98%] m-auto mt-10">
            <thead className="">
              <tr className=" border-b border-gray-300">
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
                        className="hover:bg-gray-50 border-t border-gray-300"
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
                            className={`w-[40%]  text-center rounded-full ${
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
          <div className=" flex m-auto w-[70px] justify-around text-[#219ebc] h-[100px] z-[0]">
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

      {open && (
        <div className="fixed inset-0 flex  z-222 bg-[#ffffffd2] justify-center items-center">
          <CustomerDetailsModal
            view={view}
            selectSale={selectSale}
            setOpen={setOpen}
          />
        </div>
      )}
    </div>
  );
};

export default AllSales;
