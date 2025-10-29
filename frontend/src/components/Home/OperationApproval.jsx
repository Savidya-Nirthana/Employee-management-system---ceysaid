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
import SearchBar from "./SearchBar";

const OperationApproval = () => {
  const searchRef = useRef();
  const [type, setType] = useState(false);
  const [approvedData, setApprovedData] = useState([]);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState([]);

  const handledInput = (e) => {
    setType(e.target.value.length > 0);
  };

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      setSearch(response);
    };

    getData();
  });

  return (
    <div className="px-4 rounded-[10px] border-[1px]  border-slate-300 mx-5 h-[900px] my-5">
      <div className="  rounded-t-[10px] p-[5px] flex flex-row justify-start items-center gap-2">
        <h2 className=" text-xl font-semibold  text-slate-500 m-3 ">Approved</h2>
        <FontAwesomeIcon icon={faThumbsUp} className=" text-slate-500  text-xl" />
      </div>
      <SearchBar data={approvedData} search={search} setSearch={setSearch} searchBy={'userId'}/>
      <div className=" mx-10 my-10">
      

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
              {search
                .slice(startIndex, startIndex + itemsPerPage)
                .map((elt, index) => (
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
