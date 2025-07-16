import { useEffect, useRef, useState } from "react";
import { getAllData } from "../../services/salesservices";
import CustomerDetailsModal from "../Models/CustomerDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMagnifyingGlass,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import socket from "../../services/socket";
import zeroLoading from "../../assets/images/messages/emptyData.png";

const PendingSales = () => {
  const [arrayData, setArrayData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectSale, setSelectSale] = useState(null);
  const [view, setView] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [refresh, setRefresh] = useState(false);

  const searchRef = useRef(null);
  const [type, setType] = useState(null);
  const getAll = async () => {
    const response = await getAllData();
    setArrayData(response.reverse());
  };

  const nextPage = () => {
    if (startIndex + itemsPerPage < arrayData.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  useEffect(() => {
    getAll();

    const onConnect = () => {
      console.log("Connected to socket server:", socket.id);
    };
    socket.on("connect", onConnect);

    socket.on("contentUpdated", getAll);

    socket.on("hidden", getAll);

    return () => {
      socket.off("connect", onConnect);
      socket.off("contentUpdated", getAll);
      socket.off("hidden", getAll);
    };
  }, [socket, refresh]);

  const handledInput = (e) => {
    e.preventDefault();
    const value = e.target.value.trim().toLowerCase();
    setType(value);
  };

  if (!arrayData) {
    return <div className=" h-[800px]">loading</div>;
  } else {
    return (
      <div className=" h-[800px] shadow-md my-6 rounded-2xl">
        <div className=" ml-10 mt-3 text-slate-600 text-[20px]">Pendings</div>
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
              className="absolute top-[53px] right-[10%] pr-[15px]"
              onClick={() => {
                searchRef.current.value = null;
                // setSearch(salesArray);
              }}
            />
          ) : (
            ""
          )}
        </div>
        <div className=" h-[600px]">
          <table>
            <thead>
              <tr>
                <th className="px-10 py-3 pt-7 text-center">UserID</th>
                <th className="px-10 py-3 pt-7 text-center">Country</th>
                <th className="px-10 py-3 pt-7 text-center">Days</th>
                <th className="px-10 py-3 pt-7 text-center">Passangers</th>
                <th className="px-10 py-3 pt-7 text-center">Priority</th>
                <th className="px-10 py-3 pt-7 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {arrayData.length != 0 ? (
                arrayData.map((elt, index) => (
                  <tr
                    className={`hover:bg-gray-50 border-t border-gray-300 ${
                      elt.isLocked ? "opacity-50 cursor-not-allowed " : ""
                    }`}
                    key={index}
                    onClick={() => {
                      setOpen(!elt.isLocked && true);
                      setSelectSale(elt);
                    }}
                  >
                    <td className="px-4 py-3 text-center">{elt.userId}</td>
                    <td className="px-4 py-3 text-center">{elt.country}</td>
                    <td className="px-4 py-3 text-center">{elt.noDays}</td>
                    <td className="px-4 py-3 text-center">{`A${elt.no_pax.adult}C${elt.no_pax.child}I${elt.no_pax.infant}`}</td>
                    <td className="px-4 py-3 text-center">
                      <div
                        className={`w-[45%] text-center rounded-full 
                    ${
                      elt.priority == "normal"
                        ? "bg-yellow-300 text-yellow-700 border border-yellow-700"
                        : elt.priority == "high"
                        ? "bg-red-300 text-red-700 border border-red-700"
                        : "bg-green-300 text-green-700 border border-green-700"
                    }
                     min-w-[100px] `}
                      >
                        {elt.priority}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div
                        className={`w-[30%] text-center rounded-full
                    ${
                      elt.status == "active"
                        ? " bg-purple-300 text-purple-700 border border-purple-700"
                        : elt.status == "pending"
                        ? "bg-orange-300 text-orange-700 border border-orange-700"
                        : "bg-blue-300 text-blue-700 border border-blue-700"
                    } min-w-[100px]`}
                      >
                        {elt.status}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="">
                  <td className=" w-[100%]" colSpan={6}>
                    <img
                      src={zeroLoading}
                      className="w-[200px] h-[200px] m-auto "
                      alt="zero data"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {open && selectSale && (
          <div>
            <CustomerDetailsModal
              view={view}
              selectSale={selectSale}
              setOpen={setOpen}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </div>
        )}
        <div className=" flex m-auto w-[70px] justify-around text-[#219ebc] h-[100px] z-[0]">
          <button disabled={startIndex === 0} className=" disabled:opacity-50">
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              onClick={prevPage}
              className="cursor-pointer text-2xl"
            />
          </button>
          <button
            className="disabled:opacity-50"
            disabled={startIndex + itemsPerPage >= arrayData.length}
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
  }
};

export default PendingSales;
