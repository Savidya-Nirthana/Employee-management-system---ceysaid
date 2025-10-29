import {
  faBullseye,
  faClose,
  faFlag,
  faLayerGroup,
  faMagnifyingGlass,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const SearchBar = ({ refresh, data, search, setSearch, searchBy }) => {
  const searchRef = useRef(null);
  const [type, setType] = useState("");

  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState(false);
  const [filteredCountry, setFilteredCountry] = useState(null);

  const [showPriority, setShowPriority] = useState(false);
  const [filteredPriority, setFilteredPriority] = useState(null);

  const [showActiveStatus, setShowActiveStatus] = useState(false);
  const [filteredActiveStatus, setFilteredActiveStatues] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let filteredData = [...data].reverse();

      if (filteredCountry) {
        filteredData = filteredData.filter(
          (u) => u.country === filteredCountry
        );
      }

      if (filteredPriority) {
        filteredData = filteredData.filter(
          (u) => u.priority === filteredPriority
        );
      }

      if (filteredActiveStatus) {
        filteredData = filteredData.filter(
          (u) => u.status === filteredActiveStatus
        );
      }

      if (type) {
        if (searchBy === "userId") {
          filteredData = filteredData.filter((u) =>
            String(u.userId.toLowerCase()).includes(type)
          );
        } else {
          filteredData = filteredData.filter((u) =>
            String(u.customerDetails.name.toLowerCase()).includes(type)
          );
        }
      }
      setCountries([...new Set(data.map((u) => String(u.country)))]);
      setSearch(filteredData);
    };
    getData();
  }, [
    refresh,
    filteredPriority,
    filteredActiveStatus,
    filteredCountry,
    type,
    data,
  ]);

  const handledInput = async (e) => {
    e.preventDefault();
    setType(e.target.value.trim().toLowerCase());
  };

  const filterHandler = (filterType, filterValue) => {
    if (filterType === "country") {
      setShowCountries(false);
      setFilteredCountry(filterValue);
    } else if (filterType === "priority") {
      setShowPriority(false);
      setFilteredPriority(filterValue);
    } else if (filterType === "activeStatus") {
      setShowActiveStatus(false);
      setFilteredActiveStatues(filterValue);
    }
  };

  return (
    <div className=" w-[100%] flex-col flex items-center  relative pt-10">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className=" absolute left-[10%] top-[58px] pl-[15px]"
      />
      <input
        type="text"
        className=" border-gray-600 border-2 w-[80%] h-[50px] rounded-4xl px-[50px] focus:border-slate-600 focus:ring-4 focus:ring-blue-400 transition-all duration-300 ease-in-out"
        placeholder="Search by name"
        onChange={handledInput}
        ref={searchRef}
      />
      {type ? (
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className=" absolute top-[58px] right-[10%] pr-[15px] cursor-pointer text-slate-500 hover:text-red-400 trasition-all duration-300 ease-in-out"
          onClick={() => {
            searchRef.current.value = null;
            setType("");
          }}
        />
      ) : (
        ""
      )}
      <div className="flex flex-row justify-between w-[90%] mt-10 gap-10 items-center">
        <div className=" flex flex-row gap-10 items-center">
          <div
            className=" border-b-[4px] border-white hover:border-b-sky-600 bg-white text-center rounded-t-2xl p-[10px] cursor-pointer text-slate-500 hover:text-sky-600 transition-all duration-200 ease-in-out "
            onMouseEnter={() => setShowCountries(true)}
            onMouseLeave={() => {
              setShowCountries(false);
            }}
          >
            <div className=" flex flex-row items-center justify-center gap-2 py-2">
              <div>
                <FontAwesomeIcon icon={faFlag} className="  text-[25px]" />
                <div className="  font-semibold text-[13px]">Country</div>
              </div>
            </div>

            <div
              className={`h-[570px] absolute ml-[-16px] mt-[13px] z-10 transition-all duration-300 ease-in-out transform ${
                showCountries && !filteredCountry
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible pointer-events-none"
              }`}
            >
              <div className="bg-white p-5 rounded-lg shadow-lg max-w-[600px]">
                <ul className="flex flex-row flex-wrap gap-4">
                  {countries.map((c, index) => (
                    <li
                      onClick={() => {
                        filterHandler("country", c);
                      }}
                      key={index}
                      className="bg-slate-100 px-3 py-1 rounded-md text-slate-800 cursor-pointer hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className=" border-b-[4px] border-white hover:border-b-sky-600 bg-white text-center rounded-t-2xl p-[10px] cursor-pointer text-slate-500 hover:text-sky-600 transition-all duration-200 ease-in-out"
            onMouseEnter={() => setShowPriority(true)}
            onMouseLeave={() => {
              setShowPriority(false);
            }}
          >
            <div className=" flex flex-row items-center justify-center gap-2 py-2">
              <div>
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className="  text-[25px]"
                />
                <div className="  font-semibold text-[13px]">Priority</div>
              </div>
            </div>

            <div
              className={`h-[570px] absolute ml-[-18px] mt-[13px] z-10 transition-all duration-300 ease-in-out transform  ${
                showPriority && !filteredPriority
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible pointer-events-none"
              }`}
            >
              <div className="bg-white p-5 rounded-lg shadow-lg max-w-[600px]">
                <ul className=" flex flex-row flex-wrap gap-4">
                  <li
                    onClick={() => {
                      filterHandler("priority", "high");
                    }}
                    className="  px-3 rounded-md bg-red-300 text-red-700 cursor-pointer py-1"
                  >
                    High
                  </li>
                  <li
                    onClick={() => {
                      filterHandler("priority", "normal");
                    }}
                    className="  px-3 rounded-md  bg-yellow-300 text-yellow-700 cursor-pointer py-1"
                  >
                    Normal
                  </li>
                  <li
                    onClick={() => {
                      filterHandler("priority", "low");
                    }}
                    className=" px-3 rounded-md bg-green-300 text-green-700 cursor-pointer py-1"
                  >
                    Low
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="  bg-white text-center rounded-t-2xl p-[10px] cursor-pointer text-slate-500 hover:text-sky-600 transition-all duration-200 ease-in-out border-b-[4px] border-white hover:border-b-sky-600"
            onMouseEnter={() => setShowActiveStatus(true)}
            onMouseLeave={() => {
              setShowActiveStatus(false);
            }}
          >
            <div className=" flex flex-row items-center justify-center gap-2 py-2">
              <div>
                <FontAwesomeIcon icon={faBullseye} className=" text-[25px]" />
                <div className=" font-semibold text-[13px]">Active Status</div>
              </div>
            </div>

            <div
              className={`h-[570px] absolute ml-[-16px] mt-[13px] z-10 transition-all duration-300 ease-in-out transform ${
                showActiveStatus && !filteredActiveStatus
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible pointer-events-none"
              }`}
            >
              <div className="bg-white p-5 rounded-lg shadow-lg max-w-[600px]">
                <ul className=" flex flex-row flex-wrap gap-4">
                  <li
                    onClick={() => filterHandler("activeStatus", "pending")}
                    className="  px-3 rounded-md  bg-red-300 text-red-700 cursor-pointer py-1"
                  >
                    Pending
                  </li>
                  <li
                    onClick={() => filterHandler("activeStatus", "approved")}
                    className="px-3 rounded-md bg-blue-300 text-blue-700 cursor-pointer py-1"
                  >
                    Approved
                  </li>
                  <li
                    onClick={() => filterHandler("activeStatus", "review")}
                    className=" bg-slate-100 px-3 rounded-md text-slate-800 cursor-pointer py-1"
                  >
                    Review
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-row gap-10 items-center">
          <div className=" font-semibold text-[#023047]  font-round">{`${search.length} Items`}</div>
          {type && (
            <div className=" flex flex-row items-center gap-2 bg-slate-100 px-5 py-1 rounded-2xl">
              <div>{`"${type}"`}</div>
              <FontAwesomeIcon
                icon={faClose}
                className=" text-slate-600 text-[14px] hover:text-red-400 cursor-pointer"
                onClick={() => {
                  searchRef.current.value = null;
                  setType("");
                }}
              />
            </div>
          )}
          {filteredCountry && (
            <div className=" flex flex-row  items-center gap-2 px-5 py-1 bg-slate-100 rounded-2xl">
              <div>{filteredCountry}</div>
              <FontAwesomeIcon
                className=" text-[14px] hover:text-red-400 text-slate-600 cursor-pointer"
                icon={faClose}
                onClick={() => setFilteredCountry(null)}
              />
            </div>
          )}
          {filteredPriority && (
            <div className=" flex flex-row items-center gap-2 px-5 py-1 bg-slate-100 rounded-2xl">
              <div>{filteredPriority}</div>
              <FontAwesomeIcon
                icon={faClose}
                className=" text-[14px] text-slate-600 cursor-pointer hover:text-red-400"
                onClick={() => setFilteredPriority(null)}
              />
            </div>
          )}
          {filteredActiveStatus && (
            <div className=" flex flex-row gap-2 items-center px-5 py-1 bg-slate-100 rounded-2xl">
              <div>{filteredActiveStatus}</div>
              <FontAwesomeIcon
                icon={faClose}
                className=" text-[14px] text-slate-600 cursor-pointer hover:text-red-400 "
                onClick={() => setFilteredActiveStatues(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
