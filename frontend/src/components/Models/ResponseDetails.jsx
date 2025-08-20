import { useEffect, useState } from "react";
import { getPermRegUser } from "../../services/authservice";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faFileExcel,
  faFilePdf,
  faFileWord,
  faHotel,
  faPaperclip,
  faPerson,
  faPlane,
  faSitemap,
  faUmbrellaBeach,
  faWebAwesome,
} from "@fortawesome/free-solid-svg-icons";
import SalesSecondRes from "./salesSecondRes";
import { motion, AnimatePresence } from "framer-motion";
import MultipleFileUpload from "../Home/MultipleFileUpload";
const ResponseDetails = ({
  selectSale,
  resOpen,
  setResOpen,
  setSelectSale,
}) => {
  console.log(selectSale.priority);
  const [profile, setProfile] = useState(null);
  const [saleResponse, setSaleResponse] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  useEffect(() => {
    const getImage = async () => {
      const response = await getPermRegUser(selectSale.approvedBy);
      setProfile(response.attachments.employeeImage);
    };

    getImage();
  });
  return (
    <div className=" w-[900px] my-10 rounded-2xl bg-white m-auto">
      <div className=" flex  flex-row w-[80%] m-auto my-10 justify-between items-center ">
        <div className="">
          <div
            className={`w-[200px]  rounded-xl px-5 py-3 ${
              selectSale.priority === "low"
                ? "bg-green-300 text-green-700"
                : selectSale.priority === "normal"
                ? "bg-yellow-300 text-yellow-700"
                : "bg-red-300 text-red-700"
            }`}
          >
            {selectSale.priority[0].toUpperCase() +
              selectSale.priority.slice(1)}
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
        <div className="">
          <div className=" flex items-center gap-4">
            <FontAwesomeIcon icon={faPaperclip} className=" text-2xl" />
            <div>Attachments</div>
          </div>
          <div className=" bg-purple-200 w-[300px] h-[100px] flex items-center justify-center rounded-2xl my-2 gap-10">
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
              <div className=" text-purple-700">No attachments available</div>
            )}
          </div>
        </div>
      </div>
      <hr className=" h-[2px] bg-slate-700 border-none" />
      <div className=" w-[100%] m-auto pb-10">
        <div className=" flex flex-col mx-5">
          <div className=" flex flex-row justify-between gap-5 my-10">
            <div className=" bg-slate-100 p-5 rounded-lg min-w-[300px]">
              <div className=" flex items-center gap-4">
                <FontAwesomeIcon icon={faPerson} className=" text-2xl" />
                <div className=" text-[22px] my-2 ">Customer Details:-</div>
              </div>
              <div className=" flex gap-2 ml-2">
                <div className=" font-bold">Customer name:</div>{" "}
                {selectSale.customerDetails.name}
              </div>
              <div className=" flex gap-2 ml-2">
                <div className=" font-bold">Contact details: </div>
                {selectSale.customerDetails.contactDetails}
              </div>
              <div className=" flex gap-2 ml-2">
                <div className=" font-bold">Lead: </div>
                {selectSale.customerDetails.lead}
              </div>
            </div>
            <div className=" flex-1 bg-slate-100 p-5 rounded-lg">
              <div className=" flex items-center gap-4">
                <FontAwesomeIcon icon={faUmbrellaBeach} className=" text-2xl" />
                <div className=" text-[22px] my-2">Tour:-</div>
              </div>
              <div className=" flex gap-2 ml-2">
                <div className=" font-bold">Country: </div>
                <span className=" bg-yellow-300 px-2">
                  {selectSale.country}
                </span>
              </div>
              <div className=" flex  ml-2">
                <div className=" font-bold">Cities: </div>
                {selectSale.mainCities.map((elt, index) => (
                  <div key={index} className=" ml-5">
                    <div className=" bg-green-300 my-1 px-1">{elt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=" flex flex-col w-[100%] m-auto ">
            <div className=" mb-10 bg-slate-100 p-5 rounded-lg">
              <div className=" flex items-center gap-4">
                <FontAwesomeIcon icon={faPlane} className=" text-2xl" />
                <div className=" text-[22px] my-2">Flight Details:-</div>
              </div>
              <div className=" flex flex-row flex-wrap gap-10">
                {selectSale.logs.acceptance[0].flights?.map((flight, index) => (
                  <div key={index} className=" flex gap-2">
                    <span>
                      {index + 1 <= 9 ? `0${index + 1}.` : `${index}.`}
                    </span>
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
            <div className=" flex flex-row justify-between gap-5">
              <div className=" mb-10 bg-slate-100 flex-1 p-5 rounded-lg">
                <div className=" flex items-center gap-4">
                  <FontAwesomeIcon icon={faHotel} className=" text-2xl" />
                  <div className=" text-[22px] my-2">Hotel Details:-</div>
                </div>
                {selectSale.logs.acceptance[0].hotels?.map((hotel, index) => (
                  <div key={index} className=" flex flex-row ml-2 gap-2">
                    <div>{index + 1 <= 9 ? `0${index + 1}.` : `${index}`}</div>
                    <div>{hotel}</div>
                  </div>
                ))}
              </div>

              <div className=" mb-10 bg-slate-100 flex-1 p-5 rounded-lg">
                <div className=" flex items-center gap-4">
                  <FontAwesomeIcon icon={faSitemap} className=" text-2xl" />
                  <div className=" text-[22px] my-2">Tour itenerary:-</div>
                </div>
                {selectSale.logs.acceptance[0].itenary?.map(
                  (itenary, index) => (
                    <div key={index} className=" flex flex-row gap-2 ml-2">
                      <div>
                        {index + 1 <= 9 ? `0${index + 1}.` : `${index + 1}.`}
                      </div>
                      <div>{itenary}</div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className=" flex flex-row gap-5 justify-between">
              <div className=" mb-10 flex-1 bg-slate-100 p-5 rounded-lg">
                <div className=" flex items-center gap-4">
                  <FontAwesomeIcon icon={faBoxArchive} className=" text-2xl" />
                  <div className=" text-[22px] my-2">Package:-</div>
                </div>
                {selectSale.logs.acceptance[0].package?.map(
                  (packages, index) => (
                    <div key={index} className=" flex flex-row gap-2 ml-2">
                      <div>
                        {index + 1 <= 9 ? `0${index + 1}.` : `${index + 1}.`}
                      </div>
                      <div>{packages}</div>
                    </div>
                  )
                )}
              </div>

              <div className=" mb-10 flex-1 bg-slate-100 p-5 rounded-lg">
                <div className=" flex items-center gap-4">
                  <FontAwesomeIcon icon={faWebAwesome} className=" text-2xl" />
                  <div className=" text-[22px] my-2">Special:-</div>
                </div>
                {selectSale.logs.acceptance[0].special?.map(
                  (special, index) => (
                    <div key={index} className=" flex flex-row gap-2 ml-2">
                      <div>
                        {index + 1 <= 9 ? `0${index + 1}.` : `${index + 1}.`}
                      </div>
                      <div>{special}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" m-5 flex flex-row justify-end gap-3">
          <button
            className="cursor-pointer hover:bg-slate-700 hover:text-white  border-[2px] border-slate-700 text-slate-700 text-[14px] px-4 py-2 rounded transition-all duration-300 ease-in-out"
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
      </div>
      <div className=" relative mb-10">
        <div className=" w-[100%] h-[2px] bg-slate-600 "></div>
        <button
          className=" bg-slate-700 text-white px-2.5 py-1.5 rounded-md cursor-pointer absolute top-[-17px] left-0 right-0  m-auto block w-[200px] border-[1px] broder-slate-700 hover:bg-white hover:text-slate-700 transition-all duration-300 ease-in-out"
          onClick={() => {
            setConfirmation(!confirmation);
          }}
        >
          Confirmation
        </button>
      </div>
      <div
        className={`transform transition-all duration-300 ease-in-out origin-top ${
          confirmation ? "scale-y-100 h-[400px]" : "scale-y-0 h-[0px]"
        } w-full`}
      >
        <div className="overflow-auto">
          <MultipleFileUpload />
        </div>
      </div>

      <AnimatePresence>
        {saleResponse && (
          <motion.div
            key="sales-modal"
            className="fixed inset-0 flex justify-center z-[222] bg-[#00000065] items-center overflow-y-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SalesSecondRes
                setSaleResponse={setSaleResponse}
                selectSale={selectSale}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
