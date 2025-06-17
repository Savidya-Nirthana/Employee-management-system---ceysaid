import { useEffect, useRef, useState } from "react";
import { Countries } from "../../data/countries.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faClose,
  faSquareCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { getData, uploadContent } from "../../services/groupTourService.js";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import { Upload } from "lucide-react";
import LoadingModal from "../Models/LoadingModel.jsx";

const AddGroupTours = () => {
  const [groupTourName, setGroupTourName] = useState(null);
  const [totalSeats, setTotalSeats] = useState(null);
  const [availableSeats, setAvailableSeats] = useState(null);
  const [flyer, setFlyer] = useState(null);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [countriesArray, setCountriesArray] = useState(Countries);
  const [country, setCountry] = useState("");
  const [showCountries, setShowCountries] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [cityArray, setCityArray] = useState([]);
  const showCountriesRef = useRef(null);
  const showCityRef = useRef(null);
  const [flyerImage, setFlyerImage] = useState(null);
  const fileInputRef = useRef(null);
  const [profileBlur, setProfileBlur] = useState(false);
  const [tourPdfError, setTourPdfError] = useState(null);
  const [pdf, setPdf] = useState(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCountriesRef.current &&
        !showCountriesRef.current.contains(event.target)
      ) {
        setShowCountries(false);
      }
      if (showCityRef.current && !showCityRef.current.contains(event.target)) {
        setShowCities(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const refreshForm = () => {
    setCities([]);
    setCountry("");
    setFlyerImage(null);
    setPdf(null);
    setFlyer(null);
  };

  const handleTourPdf = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setPdf(file ? file : "no file selected");
        setTourPdfError("Please upload a valid PDF file");
      } else {
        setPdf(file ? file : "no file selected");
        setTourPdfError(null);
      }
    }
  };

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    setFlyer(file ? file : "");
    setFlyerImage(URL.createObjectURL(file ? file : ""));
  };

  const handleRemoveProfile = (e) => {
    e.preventDefault();
    setFlyer(null);
    setFlyerImage(null);
    setProfileBlur(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlesCountrySearch = async (e) => {
    const value = e.target.value;
    setShowCountries(true);
    setCountry(value);
    const results = await Countries.filter((c) =>
      c.country.toLowerCase().includes(value.toLowerCase())
    );

    setCountriesArray(results);
  };

  const handleCitySearch = async (e) => {
    const value = e.target.value;
    setShowCities(true);
    setCity(value);
    const result = await Countries.filter((item) => item.country === country)
      .map((item) => item.cities)
      .flat()
      .filter((c) => c.toLowerCase().includes(value.toLowerCase()));
    setCityArray(result);
  };

  const sendData = async (e) => {
    setLoading(true);
    if (!groupTourName) {
      toast.error("Group name not set");
      return;
    }
    e.preventDefault();
    const formData = new FormData();

    formData.append("userId", user.userId);
    formData.append("groupTourName", groupTourName);
    formData.append("country", country);
    formData.append("cities", cities);
    formData.append("totalSeats", totalSeats);
    formData.append("availableSeats", availableSeats);

    if (flyerImage) {
      const uploadFlyer = await uploadContent(user.userId, "flyer", flyer);
      formData.append("flyer", uploadFlyer.data.path);
    }

    if (pdf) {
      const uploadPdf = await uploadContent(user.userId, "pdf", pdf);
      formData.append("pdf", uploadPdf.data.path);
    }

    const response = await getData(formData);
    setLoading(false);
    if (response.status == 200) {
      toast.success(response.data.message);
      refreshForm();
    } else {
      toast.error();
    }
  };
  return (
    <>
      <ToastContainer />
      {loading ? (
        <>
          <div className="fixed inset-0  flex justify-center bg-[#ffffffd2]">
            <div className=" p-5 ">
              <LoadingModal />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" w-[520px] bg-slate-50  px-10 py-4  rounded-[10px]  shadow-lg shadow-black/25">
            <div className=" text-xl font-semibold  text-slate-600 m-2">
              Add group tours
            </div>

            <form>
              <table className=" my-4">
                <tr>
                  <td>
                    <label htmlFor="" className=" text-[14px]  text-slate-600">
                      Group tour name: <span className=" text-red-500">*</span>
                    </label>
                  </td>
                  <td className=" py-1">
                    <input
                      type="text"
                      required
                      placeholder="Tour name"
                      className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[250px]"
                      onChange={(e) => {
                        setGroupTourName(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="" className="text-[14px]  text-slate-600">
                      Country: <span className=" text-red-500">*</span>
                    </label>
                  </td>
                  <td className=" py-1">
                    <input
                      type="text"
                      required
                      onChange={handlesCountrySearch}
                      onFocus={() => setShowCountries(true)}
                      value={country}
                      placeholder="Country"
                      className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[250px]"
                    />
                    {showCountries && (
                      <div
                        className=" absolute max-h-[400px] overflow-y-scroll scroll-auto bg-white w-[250px]  py-1 z-1 font-[14px]"
                        ref={showCountriesRef}
                      >
                        {countriesArray.map((c, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setShowCountries(false);
                              setCountry(c.country);
                              setCityArray(
                                Countries.filter(
                                  (item) => item.country === c.country
                                )
                                  .map((item) => item.cities)
                                  .flat()
                              );
                            }}
                            className=" cursor-pointer text-[14px] hover:bg-[#219ebc] hover:text-white p-2"
                          >
                            {c.country}
                          </div>
                        ))}
                        <div
                          className=" cursor-pointer"
                          onClick={() => {
                            setShowCountries(false);
                            setCountry(country);
                          }}
                        >
                          {country}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="" className="text-[14px]  text-slate-600">
                      Main cities: <span className=" text-red-500">*</span>
                    </label>
                  </td>
                  <td className=" py-1">
                    <input
                      type="text"
                      onFocus={() => setShowCities(true)}
                      placeholder="Main cities"
                      onChange={handleCitySearch}
                      className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[250px]"
                    />
                    {showCities && (
                      <div
                        className="absolute  overflow-y-scroll scroll-auto bg-white w-[250px]  py-1 z-1"
                        ref={showCityRef}
                      >
                        {!country ? (
                          <div className=" text-[13px] text-red-500 p-2">
                            Please select the country
                          </div>
                        ) : (
                          cityArray.map((e, index) => (
                            <div
                              className=" cursor-pointer text-[14px] hover:bg-[#219ebc] hover:text-white p-2"
                              key={index}
                              onClick={() => {
                                setCities((previouseCities) => [
                                  ...previouseCities,
                                  e,
                                ]),
                                  setShowCities(false);
                              }}
                            >
                              {e}
                            </div>
                          ))
                        )}
                        <div
                          onClick={() => {
                            setCities((previouseCity) => [
                              ...previouseCity,
                              city,
                            ]),
                              setShowCities(false);
                          }}
                          className=" text-[13px] text-slate-500 cursor-pointer"
                        >
                          {city}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>

                <tr className="">
                  <td colSpan={2}>
                    <div className=" flex flex-row flex-wrap rounded-md  w-[500px] col-span-2">
                      {cities.map((e, index) => (
                        <>
                          <div
                            key={index}
                            className=" bg-[#219ebc] px-4 text-white flex justify-center m-2 rounded-sm text-[14px] py-1"
                          >
                            {e}
                          </div>
                          <FontAwesomeIcon
                            icon={faClose}
                            className="  cursor-pointer text-[14px] relative right-4 bg-white text-[#219ebc] rounded-full px-[2px] border-[#219ebc] border-[0.5px]"
                            onClick={() => {
                              setCities(cities.filter((c) => c !== e));
                            }}
                          />
                        </>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="" className="text-[14px]  text-slate-600">
                      Total seats: <span className=" text-red-500">*</span>
                    </label>
                  </td>
                  <td className=" py-1">
                    <input
                      type="number"
                      name=""
                      id=""
                      className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[250px]"
                      required
                      placeholder="Total seats"
                      onChange={(e) => setTotalSeats(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="" className=" text-[14px]  text-slate-600">
                      Available: <span className=" text-red-500">*</span>
                    </label>
                  </td>
                  <td className=" py-1">
                    <input
                      type="number"
                      name=""
                      id=""
                      placeholder="Available"
                      className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[250px]"
                      onChange={(e) => setAvailableSeats(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="" className="text-[14px]  text-slate-600">
                      Flyer:{" "}
                    </label>
                  </td>
                  <td className=" py-1">
                    <div className=" gap-3 flex flex-row m-5 items-end">
                      <div className="flex flex-col items-center">
                        <label className="border-2 border-slate-300 w-30 h-30 flex flex-col items-center justify-center rounded-xl relative cursor-pointer hover:border-blue-500 transition">
                          {!flyerImage ? (
                            <>
                              <Upload className="w-10 h-10 text-gray-400" />
                              <span className="absolute top-[75%] text-sm text-gray-500 text-[14px]">
                                {"Upload Flyer"}
                              </span>
                            </>
                          ) : (
                            <div className=" relative">
                              <FontAwesomeIcon
                                icon={faTrash}
                                onMouseEnter={() => setProfileBlur(true)}
                                onMouseLeave={() => setProfileBlur(false)}
                                className={`absolute text-red-500 bottom-[20%] left-0 right-0 m-auto  ${
                                  profileBlur
                                    ? "text-3xl"
                                    : "text-[1px] border-none"
                                } z-100 duration-150 border-[2px] border-red-500 p-1 rounded-sm`}
                                onClick={(e) => handleRemoveProfile(e)}
                              />
                              <img
                                src={flyerImage}
                                alt=""
                                className={`w-30 h-30 rounded-xl ${
                                  profileBlur ? "opacity-45" : ""
                                }`}
                                onMouseEnter={() => setProfileBlur(true)}
                                onMouseLeave={() => setProfileBlur(false)}
                              />
                            </div>
                          )}

                          <input
                            type="file"
                            className="hidden"
                            name="profilePhoto"
                            onChange={handleProfileChange}
                            disabled={profileBlur}
                            ref={fileInputRef}
                          />
                        </label>
                        <div className=" flex justify-between w-30">
                          <div className="text-[13px] text-slate-400">
                            {flyer ? flyer.name : "No file selected"}
                          </div>
                          {flyer ? (
                            <FontAwesomeIcon
                              icon={faSquareCheck}
                              className="text-green-600 text-md"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className=" relative">
                  <td className="">
                    <label htmlFor="" className=" text-[14px]  text-slate-600">
                      PDF:
                    </label>
                  </td>
                  <td className=" py-1 flex-col">
                    <label
                      htmlFor="pdf-upload"
                      className="mx-5 text-slate-500 border-2 border-slate-300 w-30 h-8 flex flex-row items-center justify-center gap-3 rounded-md relative cursor-pointer hover:border-blue-500 transition"
                    >
                      <FontAwesomeIcon
                        icon={faArrowUpFromBracket}
                        className=" text-slate-500"
                      />
                      <span className=" text-[14px]">Upload</span>
                      <input
                        type="file"
                        name=""
                        id="pdf-upload"
                        className=" hidden"
                        onChange={handleTourPdf}
                      />
                    </label>
                    <div className=" flex  items-center">
                      <div className=" text-[13px] text-slate-400 mx-5">
                        {pdf ? pdf.name : "No file selected"}
                      </div>
                      {pdf && !tourPdfError ? (
                        <FontAwesomeIcon
                          icon={faSquareCheck}
                          className="text-green-600 text-md"
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div
                      className={`absolute top-9 left-[180px] text-[12px] overflow-hidden bg-red-200 text-red-600 p-1 border-[2px] border-red-500 font-semibold rounded-md  transition-all duration-500 w-50 h-8 ${
                        tourPdfError
                          ? " opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      {tourPdfError || ""}
                    </div>
                  </td>
                </tr>
              </table>
              <div className=" relative left-[80%]">
                <input
                  type="submit"
                  className=" bg-[#219ebc] hover:bg-black text-white px-4 py-2 text-[14px] rounded-sm cursor-pointer"
                  value="Submit"
                  onClick={sendData}
                />
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddGroupTours;
