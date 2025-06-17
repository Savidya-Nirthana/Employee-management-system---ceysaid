import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faPenToSquare,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const OperationResponseModel = ({ setOpenResponse }) => {
  const [newFlight, setNewFlight] = useState({
    flight: "",
    departure: { dateTime: "", from: "", to: "" },
    arrival: { time: "" },
  });

  const [newHotel, setNewHotel] = useState("");
  const [showFlightController, setShowFlightController] = useState(null);
  const [flightDetails, setFlightDetails] = useState([]);
  const [addFlightDetails, setAddFlightDetails] = useState(0);
  const [editFlightIndex, setEditFlightIndex] = useState(null);

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

  const [showHotelController, setShowHotelController] = useState(null);
  const [addHotelDetails, setAddHotelDetails] = useState(null);
  const [hotelDetails, setHotelDetails] = useState([]);
  const [editHotelIndex, setEditHotelIndex] = useState(null);

  const addHotel = () => {
    setHotelDetails((prev) => [...prev, newHotel]);
    // setNewHotel([]);
    setAddFlightDetails(addHotelDetails - 1);
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
  return (
    <div className="fixed inset-0 flex justify-center bg-[#ffffffd2] items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-[600px]">
        <h2 className="text-md font-bold pb-2">Customer Details</h2>
        <div className=" w-[600px]">
          <form action="">
            <div className=" m-5">
              <div className=" text-xl font-semibold  text-slate-600 m-2 border-b-[1px] ">
                Flight Details:
              </div>
              <ul className="w-[300px]">
                <div>
                  {[
                    ...flightDetails,
                    ...Array(addFlightDetails).fill(null),
                  ].map((value, index) => (
                    <li
                      className="flex m-2 justify-between"
                      key={index}
                      onMouseEnter={() => setShowFlightController(index)}
                      onMouseLeave={() => setShowFlightController(null)}
                    >
                      <div className="flex">
                        <input
                          className="text-[14px] w-6 h-6 mt-1"
                          value={
                            index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`
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
                              />
                              <FontAwesomeIcon
                                icon={faPenToSquare}
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
                                />
                              )}
                            </>
                          )
                        ) : (
                          <>
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              onClick={() =>
                                setAddFlightDetails(addFlightDetails - 1)
                              }
                            />
                            {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              onClick={addFlight}
                            />
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </div>

                <li>
                  <div className="flex flex-row items-center gap-3 mt-4">
                    <div className="w-[80px] h-[2px] bg-slate-700"></div>
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      onClick={() => setAddFlightDetails(addFlightDetails + 1)}
                    />
                    <div className="w-[80px] h-[2px] bg-slate-700"></div>
                  </div>
                </li>
              </ul>
            </div>
            <div className=" m-5">
              <div className=" text-xl font-semibold  text-slate-600 m-2 border-b-[1px] ">
                Hotel Details
              </div>
              <ul>
                <div>
                  {[...hotelDetails, ...Array(addHotelDetails).fill(null)].map(
                    (value, index) => (
                      <li key={index}>
                        <input
                          className="text-[14px] w-6 h-6 mt-1"
                          value={
                            index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`
                          }
                          disabled
                        />

                        {index < hotelDetails.length ? (
                          editFlightIndex === index ? (
                            <></>
                          ) : (
                            <></>
                          )
                        ) : (
                          <div>
                            <input
                              type="text"
                              placeholder="Flight no."
                              className="border-b-2 border-slate-200 text-[13px]"
                              onChange={(e) =>
                                setNewFlight(...newHotel, e.target.value)
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
                                />
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  onClick={() => {
                                    setEditHotelIndex(index);
                                    setNewHotel(hotelDetails[index]);
                                  }}
                                />
                                {editHotelIndex !== null && (
                                  <FontAwesomeIcon
                                    icon={faCircleCheck}
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
                                  setAddHotelDetails(addHotelDetails - 1)
                                }
                              />
                              {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                              <FontAwesomeIcon
                                icon={faCircleCheck}
                                onClick={addHotel}
                              />
                            </>
                          )}
                        </div>
                      </li>
                    )
                  )}
                </div>
                <li>
                  {" "}
                  <div className=" flex flex-row items-center gap-3">
                    <div className=" w-[80px] h-[2px] bg-slate-700"></div>
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      onClick={() => setAddHotelDetails(addHotelDetails + 1)}
                    />
                    <div className=" w-[80px] h-[2px] bg-slate-700"></div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="m-5">
              <div className=" text-xl font-semibold  text-slate-600 m-2 border-b-[1px]">
                Tour Iternary
              </div>
              <ul>
                <li>
                  <div>Day 01</div>
                  <div>Arrival + Dhow Cruise Dinner - Creek</div>
                </li>
                <li>
                  <div>Day 02</div>
                  <div>Arrival + Dhow Cruise Dinner - Creek</div>
                </li>
                <li>
                  <div>Day 03</div>
                  <div>Arrival + Dhow Cruise Dinner - Creek</div>
                </li>
                <li>
                  {" "}
                  <div className=" flex flex-row items-center gap-3">
                    <div className=" w-[80px] h-[2px] bg-slate-700"></div>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <div className=" w-[80px] h-[2px] bg-slate-700"></div>
                  </div>
                </li>
              </ul>
            </div>
            <div className=" m-5">
              <div className=" text-xl font-semibold  text-slate-600 m-2 border-b-[1px]">
                Package Include
              </div>
              <ul>
                <li>
                  <div>Ecconomy class return air ticket</div>
                </li>
                <li>
                  <div>04-Night hotel in dubai</div>
                </li>
                <li>
                  <div>Dubai visa</div>
                </li>
                <li>
                  {" "}
                  <div className=" flex flex-row items-center gap-3">
                    <div className=" w-[80px] h-[2px] bg-slate-700"></div>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <div className=" w-[80px] h-[2px] bg-slate-700"></div>
                  </div>
                </li>
              </ul>
            </div>
            <div className=" flex gap-10">
              <button className="bg-[#2fa4c2] text-white px-2.5 py-1.5 rounded cursor-pointer hover:bg-black">
                Send
              </button>
              <button
                className="bg-[#c80000] text-white px-2.5 py-1.5 rounded cursor-pointer hover:bg-black"
                onClick={() => setOpenResponse(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OperationResponseModel;
