import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMagnifyingGlass,
  faChevronCircleLeft,
  faChevronCircleRight,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { getApprovedData } from "../../services/salesservices";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const OperationApproval = () => {
  const searchRef = useRef();
  const [type, setType] = useState(false);
  const [approvedData, setApprovedData] = useState([]);
  const { user } = useContext(AuthContext);

  const handledInput = (e) => {
    setType(e.target.value.length > 0);
  };

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const nextPage = () => {
    if (startIndex + itemsPerPage < approvedData.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  useState(() => {
    const getData = async () => {
      const response = await getApprovedData(user.userId);
      setApprovedData(response);
    };

    getData();
  });

  return (
    <div className="px-4 shadow-md  rounded-2xl h-[900px] my-5">
      <div className=" bg-slate-700 rounded-t-[10px] p-[5px] flex flex-row justify-start items-center gap-2">
                <h2 className=" text-xl font-semibold  text-white m-3 ">Approved</h2>
                <FontAwesomeIcon icon={faThumbsUp} className=" text-white  text-xl" />
              </div>
      <div className=" mx-10 my-10">
      <div className="flex justify-center mb-6 ">
        <div className="relative w-[70%]">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-2.5 left-4 text-black"
          />

          <input
            type="text"
            className="border-2 border-gray-600 w-250 h-[40px] rounded-2xl pl-10 pr-10 text-gray-800"
            placeholder="Search for a name"
            onChange={handledInput}
            ref={searchRef}
          />

          {type && (
            <FontAwesomeIcon
              icon={faClose}
              className="absolute top-2.5 right-4 text-black-500 cursor-pointer"
              onClick={() => {
                searchRef.current.value = "";
                setType(false);
              }}
            />
          )}
        </div>
      </div>

      <div className="overflow-x-auto h-[600px]">
        <table
          id="infoTable"
          className="min-w-full bg-white  rounded-lg overflow-hidden "
        >
          <thead>
            <tr>
              <th className="px-4 py-3 text-center">UserID</th>
              <th className="px-4 py-3 text-center">Country</th>
              <th className="px-4 py-3 text-center">Days</th>
              <th className="px-4 py-3 text-center">Passengers</th>
              <th className="px-4 py-3 text-center">Priority</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {approvedData.map((elt, index) => (
              <tr
                className="hover:bg-gray-50 border-t border-gray-300"
                key={index}
              >
                <td className="px-4 py-3 text-center">{elt.userId}</td>
                <td className="px-4 py-3 text-center">{elt.country}</td>
                <td className="px-4 py-3 text-center">{elt.noDays}</td>
                <td className="px-4 py-3 text-center">{`A${
                  elt.no_pax.adult ? elt.no_pax.adult : 0
                }C${elt.no_pax.child ? elt.no_pax.child : 0}I${
                  elt.no_pax.infant ? elt.no_pax.infant : 0
                }`}</td>
                <td className="px-4 py-2 justify-items-center">
                  <div
                    className={`w-[45%] text-center rounded-full  min-w-[60px] border  ${
                      elt.priority == "low"
                        ? "bg-green-300 text-green-700 border-green-700"
                        : elt.priority == "high"
                        ? "bg-orange-300 text-orange-700 border-orange-700"
                        : "bg-yellow-300 text-yellow-700 border-yellow-700"
                    }`}
                  >
                    {elt.priority}
                  </div>
                </td>
                <td className="px-4 py-2 justify-items-center">
                  <div
                    className={`w-[30%] text-center rounded-full   min-w-[100px] bg-blue-300 text-blue-700 border border-blue-700`}
                  >
                    {elt.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
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
            disabled={startIndex + itemsPerPage >= approvedData.length}
          >
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className=" cursor-pointer text-2xl"
              onClick={nextPage}
            />
          </button>
        </div>
        </div>
    </div>
  );
};

export default OperationApproval;
