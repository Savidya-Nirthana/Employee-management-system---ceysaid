import { useEffect, useState } from "react";
import { getPermRegUser } from "../../services/authservice";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFilePdf,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";
import SalesSecondRes from "./salesSecondRes";

const ResponseDetails = ({
  selectSale,
  resOpen,
  setResOpen,
  setSelectSale,
}) => {
  console.log(selectSale.priority);
  const [profile, setProfile] = useState(null);
  const [saleResponse, setSaleResponse] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      const response = await getPermRegUser(selectSale.approvedBy);
      setProfile(response.attachments.employeeImage);
    };

    getImage();
  });
  console.log(selectSale.logs.acceptance[0].isText);
  return (
    <div className=" flex  flex-col h-auto  bg-white min-w-[600px] mt-16">
      <div className="absolute top-20 left-20">
        <div
          className={`w-[200px]  rounded-xl px-5 py-3 ${
            selectSale.priority === "low"
              ? "bg-green-300 text-green-700"
              : selectSale.priority === "normal"
              ? "bg-yellow-300 text-yellow-700"
              : "bg-red-300 text-red-700"
          }`}
        >
          {selectSale.priority[0].toUpperCase() + selectSale.priority.slice(1)}
        </div>
        <div>
          <img
            src={profile}
            className=" w-[50px] h-[50px] rounded-full my-2"
            alt=""
          />
          <div>{selectSale.approvedBy}</div>
        </div>
      </div>
      <div className=" flex flex-col mx-5">
        <div className=" flex flex-row gap-12 my-10">
          <div>
            <div className=" bg-slate-700 text-white p-2 text-[14px] rounded-md my-5">
              Customer Details{" "}
            </div>
            <div>Customer name : {selectSale.customerDetails.name}</div>
            <div>
              Contact details: {selectSale.customerDetails.contactDetails}
            </div>
            <div>lead: {selectSale.customerDetails.lead}</div>
          </div>
          <div>
            <div className=" bg-slate-700 text-white p-2 text-[14px] rounded-md my-5">
              Tour
            </div>
            <div>
              Country:{" "}
              <span className=" bg-yellow-300 px-2">{selectSale.country}</span>
            </div>
            <div>
              Cities:{" "}
              {selectSale.mainCities.map((elt, index) => (
                <div key={index} className=" ml-5">
                  <div className=" bg-green-300 my-1 px-1">{elt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className=" flex flex-col">
          <div>
            <div className=" bg-slate-700 text-white p-2 text-[14px] rounded-md my-5">
              Flight Details
            </div>
            <div className=" flex flex-row flex-wrap gap-10">
              {selectSale.logs.acceptance[0].flights?.map((flight, index) => (
                <div key={index} className=" flex gap-2">
                  <span>{index + 1 <= 9 ? `0${index + 1}.` : `${index}.`}</span>
                  <div
                    key={index}
                    className=" border-l-[2px] border-slate-700 px-1 my-2"
                  >
                    <div>{flight.flight}</div>
                    <div>{flight.departure.dateTime}</div>
                    <div>{flight.departure.from}</div>
                    <div>{flight.departure.to}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className=" bg-slate-700 text-white p-2 text-[14px] rounded-md my-5">
              Hotel Details
            </div>
            {selectSale.logs.acceptance[0].hotels?.map((hotel, index) => (
              <div key={index} className=" flex flex-row">
                <div>{index + 1 <= 9 ? `0${index + 1}.` : `${index}`}</div>
                <div>{hotel}</div>
              </div>
            ))}
          </div>

          <div>
            <div className=" bg-slate-700 text-white p-2 text-[14px] rounded-md my-5">
              Tour itenary
            </div>
            {selectSale.logs.acceptance[0].itenary?.map((itenary, index) => (
              <div key={index} className=" flex flex-row">
                <div>{index + 1 <= 9 ? `0${index + 1}.` : `${index + 1}.`}</div>
                <div>{itenary}</div>
              </div>
            ))}
          </div>
          <div>
            <div className=" bg-slate-700 text-white p-2 my-2 rounded-md text-[14px]">
              Package
            </div>
            {selectSale.logs.acceptance[0].package?.map((packages, index) => (
              <div key={index} className=" flex flex-row gap-1">
                <div>{index + 1 <= 9 ? `0${index + 1}.` : `${index + 1}.`}</div>
                <div>{packages}</div>
              </div>
            ))}
          </div>

          <div>
            <div className=" bg-slate-700 text-white p-2 rounded-md my-5 text-[14px]">
              Special
            </div>
            {selectSale.logs.acceptance[0].special?.map((special, index) => (
              <div key={index} className=" flex flex-row gap-1">
                <div>{index + 1 <= 9 ? `0${index + 1}.` : `${index + 1}.`}</div>
                <div>{special}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" m-5">
        <button
          className="bg-[#2fa4c2] text-white px-2.5 py-1.5 rounded cursor-pointer hover:bg-black mr-3"
          onClick={() => setSaleResponse(true)}
        >
          Proceed
        </button>
        <button
          className="bg-[#c80000] text-white px-2.5 py-1.5 rounded cursor-pointer hover:bg-black"
          onClick={() => {
            setResOpen(false);
            setSelectSale(null);
          }}
        >
          Close
        </button>
      </div>
      <div className=" absolute right-20 top-20">
        <div>Attachments</div>
        <div className=" bg-blue-200 w-[300px] h-[100px] flex items-center justify-center rounded-2xl my-2 gap-10">
          {/* {selectSale} */}
          {!selectSale.logs.acceptance[0].isText ? (
            selectSale.logs.acceptance[0].attachements.map((elt, index) => (
              <div
                key={index}
                className=" hover:cursor-pointer hover:scale-110 transition-all"
              >
                {elt.split(".").pop().split("?")[0] == "pdf" ? (
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    onClick={() => {
                      window.open(elt, "_blank");
                    }}
                    className="text-7xl text-red-500"
                  />
                ) : elt.split(".").pop().split("?")[0] == "xls" ? (
                  <FontAwesomeIcon
                    onClick={() => {
                      window.open(elt, "_blank");
                    }}
                    icon={faFileExcel}
                    className="text-7xl text-green-500"
                  />
                ) : (
                  <FontAwesomeIcon
                    onClick={() => {
                      window.open(elt, "_blank");
                    }}
                    icon={faFileWord}
                    className="text-7xl text-blue-500"
                  />
                )}
              </div>
            ))
          ) : (
            <div>No attachments available</div>
          )}
        </div>
      </div>
      {saleResponse && (
        <div className="fixed inset-0 flex justify-center  z-222 bg-[#ffffffd2] items-center overflow-y-scroll">
          <SalesSecondRes
            setSaleResponse={setSaleResponse}
            selectSale={selectSale}
          />
        </div>
      )}
    </div>
  );
};

ResponseDetails.propTypes = {
  selectSale: PropTypes.object.isRequired,
  resOpen: PropTypes.func.isRequired,
  setResOpen: PropTypes.bool.isRequired,
  setSelectSale: PropTypes.func.isRequired,
};

export default ResponseDetails;
