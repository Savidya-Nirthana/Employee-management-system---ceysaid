import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronCircleLeft,
  faChevronCircleRight,
  faCircleXmark,
  faPlane,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { getParticipants } from "../../services/groupTourService";
import noData from "../../assets/images/messages/emptyData.png";
const GroupTourParticipants = ({ setShowParticipants, showParticipants }) => {
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await getParticipants(showParticipants._id);
      setParticipants(response.data);
    };
    getData();
  }, [showParticipants._id]);


  const [itemsPerPage, setItemsPerPage] = useState(13);
  const [startIndex, setStartIndex] = useState(0);
  const nextPage = () => {
    if (startIndex + itemsPerPage < participants.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className=" w-[1000px] bg-white rounded-xl h-[750px] relative px-5">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className=" absolute top-[-10px] right-[-10px] text-red-500 hover:text-red-600 cursor-pointer text-[30px] bg-white rounded-full"
        onClick={() => setShowParticipants(null)}
      />
      {/* Header */}
      <div className=" flex flex-row items-center gap-5 text-slate-700">
        <div className="text-slate-700 bg-white  p-4 rounded-t-lg font-semibold text-lg ">
          CHINA TOUR
        </div>
        <FontAwesomeIcon icon={faPlane} />
      </div>

      {/* Table */}
      <div className=" flex flex-col justify-between ">
        <div className="overflow-x-auto  rounded-b-lg bg-white h-[620px]">
          <table className="w-full border-collapse text-sm ">
            <thead className="text-slate-700 text-[14px] uppercase ">
              <tr>
                <th className="p-3 text-left">Sales Person ID</th>
                <th className="p-3 text-left">Passenger Name</th>
                <th className="p-3 text-left">Contact No</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-center">Air Ticket</th>
                <th className="p-3 text-center">Visa</th>
                <th className="p-3 text-left">Foods</th>
                <th className="p-3 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {participants.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-3 text-center text-gray-500">
                    <img
                      src={noData}
                      alt="No Data"
                      className="mx-auto w-[200px]"
                    />
                    <div>No participants found</div>
                  </td>
                </tr>
              )}
              {participants
                .slice(startIndex, startIndex + itemsPerPage)
                .map((p, index) => (
                  <tr
                    key={index}
                    className={` ${
                      index % 2 === 0 ? "bg-slate-50" : "bg-white"
                    } hover:bg-slate-100 transition-colors`}
                  >
                    <td className="p-3 font-medium text-gray-800">
                        <div></div>
                      <div>{p.userId}</div>
                    </td>
                    <td className="p-3 text-gray-700">{p.fullName}</td>
                    <td className="p-3 text-gray-700">{p.contactNo}</td>

                    {/* Payment column with color */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          p.payment === "Full Payment"
                            ? "bg-green-100 text-green-700 border border-green-700"
                            : "bg-blue-100 text-blue-700 border border-blue-700"
                        }`}
                      >
                        {p.payment}
                      </span>
                    </td>

                    {/* Air Ticket (checkbox style) */}
                    <td className="p-3 text-center">
                      {p.airTicket ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-green-600 text-lg"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="text-gray-400 text-lg"
                        />
                      )}
                    </td>

                    {/* Visa column with tag */}
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          p.visa
                            ? "bg-green-100 text-green-700 border border-green-700"
                            : "bg-gray-300 text-gray-700 border border-gray-700"
                        }`}
                      >
                        {p.visa ? "Visa Done" : "Pending"}
                      </span>
                    </td>

                    {/* Foods */}
                    <td className="p-3 text-gray-700">{p.foods || "-"}</td>

                    {/* Remarks */}
                    <td className="p-3 text-gray-700">{p.remarks || "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className=" flex m-auto w-[70px] justify-around h-[40px] text-[#219ebc]  z-[0] ">
          <button disabled={startIndex === 0} className=" disabled:opacity-50">
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              onClick={prevPage}
              className="cursor-pointer text-2xl"
            />
          </button>
          <button
            className="disabled:opacity-50"
            disabled={startIndex + itemsPerPage >= participants.length}
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

export default GroupTourParticipants;
