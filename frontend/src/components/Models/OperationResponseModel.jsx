import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faPenToSquare,
  faPlusCircle,
  faFile,
  faFileSignature,
  faUpload,
  faPlane,
  faSitemap,
  faHotel,
  faBoxArchive,
  faWebAwesome,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  operationDetails,
  opertationUpload,
  proceedClose,
  saveFiles,
} from "../../services/salesservices";
import { useDropzone } from "react-dropzone";
import UploadLoading from "./UploadLoading.jsx";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const OperationResponseModel = ({
  setOpenResponse,
  selectSale,
  user,
  refresh,
  setRefresh,
}) => {
  const [isUpload, setIsUpload] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [openLoading, setOpenLoading] = useState(false);
  const [newFlight, setNewFlight] = useState({
    flight: "",
    departure: { dateTime: "", from: "", to: "" },
    arrival: { time: "" },
  });

  const [showFlightController, setShowFlightController] = useState(null);
  const [flightDetails, setFlightDetails] = useState([]);
  const [addFlightDetails, setAddFlightDetails] = useState(0);
  const [editFlightIndex, setEditFlightIndex] = useState(null);

  const closeProceed = () => {
    setOpenResponse(false);
    // proceedClose(selectSale._id, user.userId);
  };

  const addFlight = () => {
    setFlightDetails((prev) => [...prev, newFlight]);
    setNewFlight({
      flight: "",
      departure: { dateTime: "", from: "", to: "" },
      arrival: { time: "" },
    });
    setAddFlightDetails(addFlightDetails - 1);
  };
  const deleteFlight = (index) => {
    let realIndex = -1;
    for (let i = 0; i <= index; i++) {
      if (flightDetails[i] !== null) {
        realIndex++;
      }
    }
    if (realIndex >= 0 && realIndex < flightDetails.length) {
      setFlightDetails((prev) => prev.filter((_, idx) => idx !== realIndex));
    }
  };
  const updateFlight = (index) => {
    const newArrayFlights = [...flightDetails];
    newArrayFlights[index] = newFlight;
    setFlightDetails(newArrayFlights);
    setEditFlightIndex(null);
  };

  const [newHotel, setNewHotel] = useState("");
  const [showHotelController, setShowHotelController] = useState(null);
  const [addHotelDetails, setAddHotelDetails] = useState(0);
  const [hotelDetails, setHotelDetails] = useState([]);
  const [editHotelIndex, setEditHotelIndex] = useState(null);

  const addHotel = () => {
    setHotelDetails((prev) => [...prev, newHotel]);
    // setNewHotel([]);
    setAddHotelDetails(addHotelDetails - 1);
  };

  const deleteHotel = (index) => {
    let realIndex = -1;
    for (let i = 0; i <= index; i++) {
      if (hotelDetails[i] !== null) {
        realIndex++;
      }
    }
    if (realIndex >= 0 && realIndex < hotelDetails.length) {
      setHotelDetails((prev) => prev.filter((_, idx) => idx !== realIndex));
    }
  };

  const updateHotel = (index) => {
    const newArrayHotel = [...hotelDetails];
    newArrayHotel[index] = newHotel;
    setHotelDetails(newArrayHotel);
    setEditHotelIndex(null);
  };

  const [newItenary, setNewItenary] = useState("");
  const [showIternaryController, setshowIternaryController] = useState(null);
  const [addIternaryDetails, setAddIternaryDetails] = useState(0);
  const [itenaryDetails, setItenaryDetails] = useState([]);
  const [editIternaryIndex, setEditIternaryIndex] = useState(null);

  const addItenary = () => {
    setItenaryDetails((prev) => [...prev, newItenary]);
    // setNewHotel([]);
    setAddIternaryDetails(addIternaryDetails - 1);
  };

  const updateItenary = (index) => {
    const newArrayItenary = [...itenaryDetails];
    newArrayItenary[index] = newItenary;
    setItenaryDetails(newArrayItenary);
    setEditIternaryIndex(null);
  };

  const deleteItenary = (index) => {
    let realIndex = -1;
    for (let i = 0; i <= index; i++) {
      if (itenaryDetails[i] !== null) {
        realIndex++;
      }
    }
    if (realIndex >= 0 && realIndex < itenaryDetails.length) {
      setItenaryDetails((prev) => prev.filter((_, idx) => idx !== realIndex));
    }
  };

  const [newPackage, setNewPackage] = useState("");
  const [showPackageController, setshowPackageController] = useState(null);
  const [addPackageDetails, setAddPackageDetails] = useState(0);
  const [packageDetails, setPackageDetails] = useState([]);
  const [editPackageIndex, setEditPackageIndex] = useState(null);

  const addPackage = () => {
    setPackageDetails((prev) => [...prev, newPackage]);
    setAddPackageDetails(addPackageDetails - 1);
  };

  const updatePackage = (index) => {
    const newArrayPackage = [...packageDetails];
    newArrayPackage[index] = newPackage;
    setPackageDetails(newArrayPackage);
    setEditPackageIndex(null);
  };

  const deletePackage = (index) => {
    let realIndex = -1;
    for (let i = 0; i <= index; i++) {
      if (packageDetails[i] !== null) {
        realIndex++;
      }
    }
    if (realIndex >= 0 && realIndex < packageDetails.length) {
      setPackageDetails((prev) => prev.filter((_, idx) => idx !== realIndex));
    }
  };

  const [newSpRequest, setNewSpRequest] = useState("");
  const [showSpecialController, setshowSpecialController] = useState(null);
  const [addSpecialDetails, setAddSpecialDetails] = useState(0);
  const [specialDetails, setSpecialDetails] = useState([]);
  const [editSpecialIndex, setEditSpecialIndex] = useState(null);

  const addSpecial = () => {
    setSpecialDetails((prev) => [...prev, newSpRequest]);
    setAddSpecialDetails(addSpecialDetails - 1);
  };

  const updatetSpecial = (index) => {
    const newArraySpecial = [...specialDetails];
    newArraySpecial[index] = newSpRequest;
    setSpecialDetails(newArraySpecial);
    setEditSpecialIndex(null);
  };

  const deleteSpecial = (index) => {
    let realIndex = -1;
    for (let i = 0; i <= index; i++) {
      if (specialDetails[i] !== null) {
        realIndex++;
      }
    }
    if (realIndex >= 0 && realIndex < specialDetails.length) {
      setSpecialDetails((prev) => prev.filter((_, idx) => idx !== realIndex));
    }
  };

  const submitHandler = async () => {
    const formData = {
      packageDetails,
      itenaryDetails,
      hotelDetails,
      flightDetails,
      specialDetails,
      selectSale,
    };
    const response = await operationDetails(formData);
    if (!response.isError) {
      setRefresh((prev) => !prev);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const submitHandlerFiles = async () => {
    const urls = [];
    await setOpenLoading(true);
    for (const elt of uploadedFiles) {
      const res = await opertationUpload(selectSale.subject, elt);
      urls.push(res);
      setUploadCount((prev) => prev + 1);
    }
    setOpenLoading(false);
    const response = await saveFiles(urls, selectSale);
    if (!response.isError) {
      setRefresh((prev) => !prev);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "application/excel": [".xls", ".xlsx"],
    },
  });

  return (
    <div className="">
      <div className="bg-white p-5 rounded-lg shadow-lg relative mt-10 mb-10 w-full max-w-4xl min-w-[800px] min-h-[500px]">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className=" absolute top-[-6px] right-[-6px] text-[35px] text-[#023047] cursor-pointer hover:text-red-500 z-[1000]"
          onClick={() => {
            setOpenResponse(false);
          }}
        />
        <div className=" flex gap-7  absolute top-0 left-0 w-[100%] rounded-t-xl p-5 font-display">
          <div
            onClick={() => {
              setIsUpload(false);
            }}
            className={`flex flex-row gap-2 items-center hover:text-sky-700 cursor-pointer transition-all duration-300 ease-in-out ${
              !isUpload ? "text-2xl" : "text-[16px]"
            }`}
          >
            <button>Fill details</button>
          </div>
          <div
            onClick={() => {
              setIsUpload(true);
            }}
            className={`flex flex-row gap-2 items-center hover:text-sky-700 cursor-pointer transition-all duration-300 ease-in-out ${
              isUpload ? "text-2xl" : "text-[16px]"
            }`}
          >
            <button>Upload files</button>
          </div>
        </div>
        <ToastContainer />
        {!isUpload ? (
          <div>
            <div className="">
              <div>
                <div className=" flex flex-row justify-between my-10">
                  <div>
                    <div className="m-5">
                      <div className="text-xl flex flex-row gap-2 items-center font-semibold text-gray-800 mb-2 pb-1 ">
                        <FontAwesomeIcon icon={faPlane} />
                        <div>Flight Details:</div>
                      </div>
                      <ul className="w-[300px] border-b-[1px] border-slate-200 ">
                        <div>
                          <AnimatePresence>
                            {[
                              ...flightDetails,
                              ...Array(addFlightDetails).fill(null),
                            ].map((value, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex m-2 justify-between overflow-hidden"
                                onMouseEnter={() =>
                                  setShowFlightController(index)
                                }
                                onMouseLeave={() =>
                                  setShowFlightController(null)
                                }
                              >
                                <div className="flex">
                                  <input
                                    className="text-[14px] w-6 h-6 mt-1"
                                    value={
                                      index + 1 < 10
                                        ? `0${index + 1}.`
                                        : `${index + 1}.`
                                    }
                                    disabled
                                  />

                                  <div className="flex flex-col gap-2 w-[200px] ml-2">
                                    {index < flightDetails.length ? (
                                      editFlightIndex === index ? (
                                        <input
                                          className="font-semibold border-b-2 border-slate-200 text-[13px]"
                                          value={newFlight.flight}
                                          onChange={(e) => {
                                            setNewFlight({
                                              ...newFlight,
                                              flight: e.target.value,
                                            });
                                          }}
                                        />
                                      ) : (
                                        <span className="text-[13px]">
                                          {value.flight}
                                        </span>
                                      )
                                    ) : (
                                      <input
                                        type="text"
                                        placeholder="Flight no."
                                        className="border-b-2 border-slate-200 text-[13px]"
                                        onChange={(e) =>
                                          setNewFlight({
                                            ...newFlight,
                                            flight: e.target.value,
                                          })
                                        }
                                      />
                                    )}

                                    {index < flightDetails.length ? (
                                      editFlightIndex === index ? (
                                        <input
                                          className="text-[13px] border-b-2 border-slate-200"
                                          value={newFlight.departure.dateTime}
                                          onChange={(e) =>
                                            setNewFlight({
                                              ...newFlight,
                                              departure: {
                                                ...newFlight.departure,
                                                dateTime: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                      ) : (
                                        <span className="text-[13px]">
                                          {value.departure.dateTime}
                                        </span>
                                      )
                                    ) : (
                                      <input
                                        type="text"
                                        placeholder="Time and date"
                                        className="border-b-2 border-slate-200 text-[13px]"
                                        onChange={(e) =>
                                          setNewFlight({
                                            ...newFlight,
                                            departure: {
                                              ...newFlight.departure,
                                              dateTime: e.target.value,
                                            },
                                          })
                                        }
                                      />
                                    )}

                                    {index < flightDetails.length ? (
                                      editFlightIndex === index ? (
                                        <input
                                          className="text-[13px] border-b-2 border-slate-200"
                                          value={newFlight.departure.from}
                                          onChange={(e) =>
                                            setNewFlight({
                                              ...newFlight,
                                              departure: {
                                                ...newFlight.departure,
                                                from: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                      ) : (
                                        <span className="text-[13px]">
                                          {value.departure.from}
                                        </span>
                                      )
                                    ) : (
                                      <input
                                        type="text"
                                        placeholder="From"
                                        className="border-b-2 border-slate-200 text-[13px]"
                                        onChange={(e) =>
                                          setNewFlight({
                                            ...newFlight,
                                            departure: {
                                              ...newFlight.departure,
                                              from: e.target.value,
                                            },
                                          })
                                        }
                                      />
                                    )}

                                    {index < flightDetails.length ? (
                                      editFlightIndex === index ? (
                                        <input
                                          className="text-[13px] border-b-2 border-slate-200"
                                          value={newFlight.departure.to}
                                          onChange={(e) =>
                                            setNewFlight({
                                              ...newFlight,
                                              departure: {
                                                ...newFlight.departure,
                                                to: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                      ) : (
                                        <span className="text-[13px]">
                                          {value.departure.to}
                                        </span>
                                      )
                                    ) : (
                                      <input
                                        type="text"
                                        placeholder="To"
                                        className="border-b-2 border-slate-200 text-[13px]"
                                        onChange={(e) =>
                                          setNewFlight({
                                            ...newFlight,
                                            departure: {
                                              ...newFlight.departure,
                                              to: e.target.value,
                                            },
                                          })
                                        }
                                      />
                                    )}
                                  </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                  {index < flightDetails.length ? (
                                    showFlightController === index && (
                                      <>
                                        <FontAwesomeIcon
                                          icon={faCircleXmark}
                                          onClick={() => deleteFlight(index)}
                                          className="text-[#023047] cursor-pointer text-[20px] hover:text-red-500 transition-all duration-300 ease-in-out"
                                        />
                                        <FontAwesomeIcon
                                          icon={faPenToSquare}
                                          className="text-[#023047] cursor-pointer text-[20px] hover:text-blue-500 transition-all duration-300 ease-in-out"
                                          onClick={() => {
                                            setEditFlightIndex(index);
                                            setNewFlight(flightDetails[index]);
                                          }}
                                        />
                                        {editFlightIndex !== null && (
                                          <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            onClick={
                                              index !== editFlightIndex
                                                ? addFlight
                                                : () => updateFlight(index)
                                            }
                                            className="text-[#023047] cursor-pointer text-[20px] hover:green-blue-500 transition-all duration-300 ease-in-out"
                                          />
                                        )}
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="text-[#023047] cursor-pointer text-[20px] hover:text-red-500 transition-all duration-300 ease-in-out"
                                        onClick={() =>
                                          setAddFlightDetails(
                                            addFlightDetails - 1
                                          )
                                        }
                                      />
                                      <FontAwesomeIcon
                                        className="text-[#023047] cursor-pointer text-[20px] hover:text-green-500 transition-all duration-300 ease-in-out"
                                        icon={faCircleCheck}
                                        onClick={addFlight}
                                      />
                                    </>
                                  )}
                                </div>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </div>

                        <li>
                          <div
                            className="flex flex-row items-center gap-3 mt-4 cursor-pointer hover:text-blue-400 text-blue-500"
                            onClick={() =>
                              setAddFlightDetails(addFlightDetails + 1)
                            }
                          >
                            <FontAwesomeIcon classNam="" icon={faPlusCircle} />
                            <span className="">Add More</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className=" m-5">
                      <div className="text-xl flex flex-row gap-2 items-center font-semibold text-gray-800 mb-2 pb-1">
                        <FontAwesomeIcon icon={faHotel} />
                        <div>Hotel Details:</div>
                      </div>
                      <ul className=" w-[300px] border-b-[1px] border-slate-200">
                        <div className=" ml-2">
                          <AnimatePresence>
                            {[
                              ...hotelDetails,
                              ...Array(addHotelDetails).fill(null),
                            ].map((value, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex overflow-hidden items-center"
                                onMouseEnter={() =>
                                  setShowHotelController(index)
                                }
                                onMouseLeave={() =>
                                  setShowHotelController(null)
                                }
                              >
                                <input
                                  className="text-[14px] w-6 h-6 mt-1"
                                  value={
                                    index + 1 < 10
                                      ? `0${index + 1}.`
                                      : `${index + 1}.`
                                  }
                                  disabled
                                />

                                {index < hotelDetails.length ? (
                                  editHotelIndex === index ? (
                                    <input
                                      value={newHotel}
                                      onChange={(e) => {
                                        setNewHotel(e.target.value);
                                      }}
                                      className=" min-w-[200x]"
                                    />
                                  ) : (
                                    <span className=" min-w-[200px]">
                                      {value}
                                    </span>
                                  )
                                ) : (
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Hotel"
                                      className="border-b-2 border-slate-200 text-[13px] min-w-[200px]"
                                      onChange={(e) =>
                                        setNewHotel(e.target.value)
                                      }
                                    />
                                  </div>
                                )}

                                <div>
                                  {index < hotelDetails.length ? (
                                    showHotelController === index && (
                                      <>
                                        <FontAwesomeIcon
                                          icon={faCircleXmark}
                                          onClick={() => deleteHotel(index)}
                                          className="text-[#023047] cursor-pointer text-[20px] hover:text-red-500 transition-all duration-300 ease-in-out"
                                        />
                                        <FontAwesomeIcon
                                          icon={faPenToSquare}
                                          className="text-[#023047] cursor-pointer text-[20px] hover:text-blue-500 transition-all duration-300 ease-in-out"
                                          onClick={() => {
                                            setEditHotelIndex(index);
                                            console.log(editHotelIndex);
                                            setNewHotel(hotelDetails[index]);
                                          }}
                                        />
                                        {editHotelIndex !== null && (
                                          <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="text-[#023047] cursor-pointer text-[20px] hover:green-red-500 transition-all duration-300 ease-in-out"
                                            onClick={
                                              index !== editHotelIndex
                                                ? addHotel
                                                : () => updateHotel(index)
                                            }
                                          />
                                        )}
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        onClick={() =>
                                          setAddHotelDetails(
                                            addHotelDetails - 1
                                          )
                                        }
                                        className="text-[#023047] cursor-pointer text-[20px] hover:text-red-500 transition-all duration-300 ease-in-out"
                                      />
                                      {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                                      <FontAwesomeIcon
                                        icon={faCircleCheck}
                                        onClick={addHotel}
                                        className="text-[#023047] cursor-pointer text-[20px] hover:green-red-500 transition-all duration-300 ease-in-out"
                                      />
                                    </>
                                  )}
                                </div>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </div>
                        <li>
                          <div
                            onClick={() =>
                              setAddHotelDetails(addHotelDetails + 1)
                            }
                            className="flex flex-row items-center gap-3 mt-4 cursor-pointer hover:text-blue-400 text-blue-500"
                          >
                            <FontAwesomeIcon className="" icon={faPlusCircle} />
                            <span className="">Add More</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="m-5">
                      <div className=" flex flex-row items-center gap-2 text-xl font-semibold text-gray-800 mb-2 pb-1">
                        <FontAwesomeIcon icon={faSitemap} />
                        <div>Tour Iternary:</div>
                      </div>
                      <ul className="w-[300px] border-b-[1px] border-slate-200">
                        <div className=" ml-2">
                          <AnimatePresence>
                            {[
                              ...itenaryDetails,
                              ...Array(addIternaryDetails).fill(null),
                            ].map((value, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                onMouseEnter={() =>
                                  setshowIternaryController(index)
                                }
                                onMouseLeave={() =>
                                  setshowIternaryController(null)
                                }
                                className="flex flex-row gap-2 items-center"
                              >
                                <input
                                  className="text-[14px] w-6 h-6 mt-1"
                                  value={
                                    index + 1 < 10
                                      ? `0${index + 1}.`
                                      : `${index + 1}.`
                                  }
                                  disabled
                                />

                                {index < itenaryDetails.length ? (
                                  editIternaryIndex === index ? (
                                    <input
                                      value={newItenary}
                                      onChange={(e) => {
                                        setNewItenary(e.target.value);
                                      }}
                                      className=" min-w-[200px]"
                                    />
                                  ) : (
                                    <span className=" min-w-[200px]">
                                      {value}
                                    </span>
                                  )
                                ) : (
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Itenary"
                                      className="border-b-2 border-slate-200 text-[13px] min-w-[200px]"
                                      onChange={(e) =>
                                        setNewItenary(e.target.value)
                                      }
                                    />
                                  </div>
                                )}

                                <div>
                                  {index < itenaryDetails.length ? (
                                    showIternaryController === index && (
                                      <>
                                        <FontAwesomeIcon
                                          icon={faCircleXmark}
                                          onClick={() => deleteItenary(index)}
                                          className="text-[#023047] cursor-pointer text-[20px] hover:text-red-500 transition-all duration-300 ease-in-out"
                                        />
                                        <FontAwesomeIcon
                                          icon={faPenToSquare}
                                          className="text-[#023047] cursor-pointer text-[20px] hover:text-blue-500 transition-all duration-300 ease-in-out"
                                          onClick={() => {
                                            setEditIternaryIndex(index);
                                            setNewItenary(
                                              itenaryDetails[index]
                                            );
                                          }}
                                        />
                                        {editIternaryIndex !== null && (
                                          <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="text-[#023047] cursor-pointer text-[20px] hover:text-green-500 transition-all duration-300 ease-in-out"
                                            onClick={
                                              index !== editIternaryIndex
                                                ? addItenary
                                                : () => updateItenary(index)
                                            }
                                          />
                                        )}
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="text-[#023047] cursor-pointer text-[20px] hover:text-red-500 transition-all duration-300 ease-in-out"
                                        onClick={() =>
                                          setAddIternaryDetails(
                                            addIternaryDetails - 1
                                          )
                                        }
                                      />
                                      {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                                      <FontAwesomeIcon
                                        className="text-[#023047] cursor-pointer text-[20px] hover:text-green-500 transition-all duration-300 ease-in-out"
                                        icon={faCircleCheck}
                                        onClick={addItenary}
                                      />
                                    </>
                                  )}
                                </div>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </div>
                        <li>
                          <div
                            className="flex flex-row items-center gap-3 mt-4 cursor-pointer hover:text-blue-400 text-blue-500"
                            onClick={() =>
                              setAddIternaryDetails(addIternaryDetails + 1)
                            }
                          >
                            <FontAwesomeIcon className="" icon={faPlusCircle} />
                            <span className="">Add More</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className=" m-5">
                      <div className=" text-xl flex flex-row gap-2 items-center font-semibold text-gray-800 mb-2 pb-1">
                        <FontAwesomeIcon icon={faBoxArchive} />
                        <div>Package Include:</div>
                      </div>
                      <ul className=" w-[300px] border-b-[1px] border-slate-200 gap-2">
                        <div className=" ml-2">
                          <AnimatePresence>
                            {[
                              ...packageDetails,
                              ...Array(addPackageDetails).fill(null),
                            ].map((value, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex overflow-hidden items-center gap-2"
                                onMouseEnter={() =>
                                  setshowPackageController(index)
                                }
                                onMouseLeave={() =>
                                  setshowPackageController(null)
                                }
                              >
                                <input
                                  className="text-[14px] w-6 h-6 mt-1"
                                  value={
                                    index + 1 < 10
                                      ? `0${index + 1}.`
                                      : `${index + 1}.`
                                  }
                                  disabled
                                />

                                {index < packageDetails.length ? (
                                  editPackageIndex === index ? (
                                    <input
                                      value={newPackage}
                                      onChange={(e) => {
                                        setNewPackage(e.target.value);
                                      }}
                                      className=" min-w-[200px]"
                                    />
                                  ) : (
                                    <span className=" min-w-[200px]">
                                      {value}
                                    </span>
                                  )
                                ) : (
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Itenary"
                                      className="border-b-2 border-slate-200 text-[13px] min-w-[200px]"
                                      onChange={(e) =>
                                        setNewPackage(e.target.value)
                                      }
                                    />
                                  </div>
                                )}

                                <div>
                                  {index < packageDetails.length ? (
                                    showPackageController === index && (
                                      <>
                                        <FontAwesomeIcon
                                          className="text-[#023047] cursor-pointer text-[20px] hover:text-red-500 transition-all duration-300 ease-in-out"
                                          icon={faCircleXmark}
                                          onClick={() => deletePackage(index)}
                                        />
                                        <FontAwesomeIcon
                                          className="text-[#023047] cursor-pointer text-[20px] hover:text-blue-500 transition-all duration-300 ease-in-out"
                                          icon={faPenToSquare}
                                          onClick={() => {
                                            setEditPackageIndex(index);
                                            setNewPackage(
                                              packageDetails[index]
                                            );
                                          }}
                                        />
                                        {editPackageIndex !== null && (
                                          <FontAwesomeIcon
                                            className="text-[#023047] cursor-pointer text-[20px] hover:text-green-500 transition-all duration-300 ease-in-out"
                                            icon={faCircleCheck}
                                            onClick={
                                              index !== editPackageIndex
                                                ? addPackage
                                                : () => updatePackage(index)
                                            }
                                          />
                                        )}
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        className="text-[#023047] cursor-pointer text-[20px] hover:text-red-500 transition-all duration-300 ease-in-out"
                                        icon={faCircleXmark}
                                        onClick={() =>
                                          setAddPackageDetails(
                                            addPackageDetails - 1
                                          )
                                        }
                                      />
                                      {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                                      <FontAwesomeIcon
                                        className="text-[#023047] cursor-pointer text-[20px] hover:text-green-500 transition-all duration-300 ease-in-out"
                                        icon={faCircleCheck}
                                        onClick={addPackage}
                                      />
                                    </>
                                  )}
                                </div>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </div>

                        <li>
                          <div
                            className="flex flex-row items-center gap-3 mt-4 cursor-pointer hover:text-blue-400 text-blue-500"
                            onClick={() =>
                              setAddPackageDetails(addPackageDetails + 1)
                            }
                          >
                            <FontAwesomeIcon className="" icon={faPlusCircle} />
                            <span className="">Add More</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className=" m-5">
                      <div className="flex flex-row gap-2 items-center text-xl font-semibold text-gray-800 mb-2 pb-1">
                        <FontAwesomeIcon icon={faWebAwesome} />
                        <div>Special Requests:</div>
                      </div>
                      <ul className="w-[300px] border-b-[1px] border-slate-200">
                        <div className=" ml-2">
                          <AnimatePresence>
                            {[
                              ...specialDetails,
                              ...Array(addSpecialDetails).fill(null),
                            ].map((value, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex overflow-hidden items-center gap-2"
                                onMouseEnter={() =>
                                  setshowSpecialController(index)
                                }
                                onMouseLeave={() =>
                                  setshowSpecialController(null)
                                }
                              >
                                <input
                                  className="text-[14px] w-6 h-6 mt-1"
                                  value={
                                    index + 1 < 10
                                      ? `0${index + 1}.`
                                      : `${index + 1}.`
                                  }
                                  disabled
                                />

                                {index < specialDetails.length ? (
                                  editSpecialIndex === index ? (
                                    <input
                                      value={newSpRequest}
                                      onChange={(e) => {
                                        setNewSpRequest(e.target.value);
                                      }}
                                      className=" min-w-[200px]"
                                    />
                                  ) : (
                                    <span className=" min-w-[200px]">
                                      {value}
                                    </span>
                                  )
                                ) : (
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Special Requests"
                                      className="border-b-2 border-slate-200 text-[13px] min-w-[200px]"
                                      onChange={(e) =>
                                        setNewSpRequest(e.target.value)
                                      }
                                    />
                                  </div>
                                )}

                                <div>
                                  {index < specialDetails.length ? (
                                    showSpecialController === index && (
                                      <>
                                        <FontAwesomeIcon
                                          className="text-[#023047] cursor-pointer text-[20px] hover:text-red-500 transition-all duration-300 ease-in-out"
                                          icon={faCircleXmark}
                                          onClick={() => deleteSpecial(index)}
                                        />
                                        <FontAwesomeIcon
                                          className="text-[#023047] cursor-pointer text-[20px] hover:text-blue-500 transition-all duration-300 ease-in-out"
                                          icon={faPenToSquare}
                                          onClick={() => {
                                            setEditSpecialIndex(index);
                                            setNewSpRequest(
                                              specialDetails[index]
                                            );
                                          }}
                                        />
                                        {editSpecialIndex !== null && (
                                          <FontAwesomeIcon
                                            className="text-[#023047] cursor-pointer text-[20px] hover:text-green-500 transition-all duration-300 ease-in-out"
                                            icon={faCircleCheck}
                                            onClick={
                                              index !== editSpecialIndex
                                                ? addSpecial
                                                : () => updatetSpecial(index)
                                            }
                                          />
                                        )}
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        className="text-[#023047] cursor-pointer text-[20px] hover:text-red-500 transition-all duration-300 ease-in-out"
                                        icon={faCircleXmark}
                                        onClick={() =>
                                          setAddSpecialDetails(
                                            addSpecialDetails - 1
                                          )
                                        }
                                      />
                                      {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                                      <FontAwesomeIcon
                                        className="text-[#023047] cursor-pointer text-[20px] hover:text-green-500 transition-all duration-300 ease-in-out"
                                        icon={faCircleCheck}
                                        onClick={addSpecial}
                                      />
                                    </>
                                  )}
                                </div>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </div>
                        <li>
                          <div
                            className="flex flex-row items-center gap-3 mt-4 cursor-pointer hover:text-blue-400 text-blue-500"
                            onClick={() =>
                              setAddSpecialDetails(addSpecialDetails + 1)
                            }
                          >
                            <FontAwesomeIcon className="" icon={faPlusCircle} />
                            <span className=" ">Add More</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="w-full  p-5 rounded-b-lg flex flex-row justify-end gap-3">
                  <button
                    className="hover:bg-slate-700 text-slate-800 hover:text-white bg-white border-[2px] border-slate-700 px-2.5 py-1.5 rounded cursor-pointer transtion-all duration-300 ease-in-out"
                    onClick={submitHandler}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : !openLoading ? (
          <div>
            <div
              {...getRootProps()}
              className="border-2 border-dashed mt-20 border-blue-500 p-10  m-5 rounded-md text-center cursor-pointer bg-blue-50"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <>
                  <FontAwesomeIcon
                    icon={faFile}
                    className="text-blue-500 text-9xl mb-2"
                  />
                  <p className="text-blue-700">Drop the files here...</p>
                </>
              ) : uploadedFiles.length == 0 ? (
                <>
                  <FontAwesomeIcon
                    icon={faFile}
                    className="text-blue-500 text-9xl mb-2"
                  />
                  <p className="text-blue-700">
                    Drop files here, or click to select
                  </p>
                </>
              ) : (
                <div className="flex overflow-x-auto space-x-4 p-3 ">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative min-w-[100px] h-40 bg-gray-100 shadow items-center p-5 mr-6"
                    >
                      <FontAwesomeIcon
                        icon={faFile}
                        className="text-blue-500 text-8xl mb-2"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="absolute bottom-35 left-22 text-blue-400 hover:text-blue-700"
                      >
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="text-3xl"
                        />
                      </button>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-500 break-words">
                          {file.name.length > 15
                            ? file.name.slice(0, 15) + "..."
                            : file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className=" flex gap-3 justify-end">
              <button
                className="m-5 hover:bg-slate-700 text-slate-700 border-[2px] border-slate-700  hover:text-white px-2.5 py-1.5  rounded cursor-pointer bg-white transition-all duration-300 ease-in-out"
                onClick={submitHandlerFiles}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <UploadLoading
            uploadCount={uploadCount}
            length={uploadedFiles.length}
          />
        )}
      </div>
    </div>
  );
};

export default OperationResponseModel;
