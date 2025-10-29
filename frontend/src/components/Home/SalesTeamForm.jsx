import { useEffect, useRef, useState } from "react";
import { Countries } from "../../data/countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faClose, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { addSales } from "../../services/salesservices";
import { toast, ToastContainer } from "react-toastify";

const SalesTeamForm = ({ setRefresh }) => {
  const [customername, setCustomername] = useState("");
  const [lead, setLead] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [countriesArray, setCountriesArray] = useState(Countries);
  const [country, setCountry] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [cityArray, setCityArray] = useState([]);
  const showCountriesRef = useRef(null);
  const showCityRef = useRef(null);
  const [subject, setSubject] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [infants, setInfants] = useState("");
  const [numofdays, setNumofdays] = useState("");
  const [priority, setPriority] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

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

  const handleSumbit = async (e) => {
    e.preventDefault();
    const salesDetails = {
      subject,
      customername,
      contactMethod,
      contactValue,
      lead,
      country,
      cities,
      adults,
      children,
      infants,
      numofdays,
      priority,
      travelStartDate,
      additionalDetails,
    };
    const { err, message } = await addSales(salesDetails);
    if (!err) {
      setRefresh((prev) => !prev);
      toast.success(message);
      setCustomername("");
      setLead("");
      setContactMethod("");
      setContactValue("");
      setCountriesArray(Countries);
      setCountry("");
      setShowCities(false);
      setShowCountries(false);
      setCities([]);
      setCity("");
      setCityArray([]);
      setSubject("");
      setAdults("");
      setChildren("");
      setInfants("");
      setNumofdays("");
      setPriority("");
      setTravelStartDate("");
      setAdditionalDetails("");
    } else {
      toast.error(message);
    }
  };
  return (
    <div className="w-[800px]    pb-8  rounded-[10px]  border-[1px] border-slate-300">
      <ToastContainer />
      <div className=" flex flex-row items-center gap-2  rounded-t-[10px] text-slate-700 p-2">
        <h2 className=" text-xl font-semibold p-2">Add sales details</h2>
        <FontAwesomeIcon icon={faCartPlus} />
      </div>

      <form className="m-auto px-8 mt-6" onSubmit={handleSumbit}>
        <div className=" ">
          <div className="my-4 ">
            <input
              type="text"
              name="customername"
              id=""
              className="w-full border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
              value={customername}
              onChange={(e) => setCustomername(e.target.value)}
              required
              placeholder="Customer name"
            />
          </div>

          <div className="my-4 ">
            <div className=" flex w-full gap-2">
              <select
                name="contactMethod"
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
                className="w-full border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="">Contact method</option>
                <option value="phone">Telephone</option>
                <option value="email">E-mail</option>
              </select>
              {contactMethod && (
                <input
                  type={contactMethod === "phone" ? "tel" : "email"}
                  name={contactMethod}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  className="w-full border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
                  placeholder={
                    contactMethod === "phone" ? "Phone number" : "Email"
                  }
                  required 
                />
              )}
            </div>
          </div>

          <div className="my-4">
            <select
              name="lead"
              id=""
              className="w-full border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
              required
              value={lead}
              onChange={(e) => setLead(e.target.value)}
            >
              <option value="" className="">
                Connected media
              </option>
              <option value="facebook">Facebook</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">Linkedin</option>
            </select>
          </div>
        </div>

        {/* <hr className="border-t-[2px] border-slate-600 my-4"></hr> */}

        <div className="mb-1">
          <input
            type="text"
            name="subject"
            id=""
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
            placeholder="Subject"
            required
          />
        </div>
        <div className="my-4 relative">
          <input
            type="text"
            name="country"
            id=""
            className="w-full border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
            value={country}
            onChange={handlesCountrySearch}
            placeholder="Country"
            onFocus={() => setShowCountries(true)}
            required
          />
          <div className="absolute left-0   top-12 cursor-pointer">
            {showCountries && (
              <div
                className="absolute max-h-[400px] overflow-y-scroll scroll-auto bg-white w-[750px] py-1 z-1 font-[14px]"
                ref={showCountriesRef}
              >
                {countriesArray.map((c, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setShowCountries(false);
                      setCountry(c.country);
                      setCityArray(
                        Countries.filter((item) => item.country === c.country)
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
                  className=" cursor-pointer text-[14px] hover:bg-[#219ebc] hover:text-white p-2 flex flex-row items-center gap-2"
                  onClick={() => {
                    setShowCountries(false);
                    setCountry(country);
                  }}
                >
                  <FontAwesomeIcon icon={faKeyboard}/><div>{country}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-1 relative">
          <input
            type="text"
            id=""
            name="city"
            value={city}
            onFocus={() => setShowCities(true)}
            placeholder="Main Cities & Places"
            onChange={handleCitySearch}
            className="w-full border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
          />
          <div className="absolute left-0 top-12 cursor-pointer">
            {showCities && (
              <div
                className="absolute  overflow-y-scroll scroll-auto bg-white w-[750px]  py-1 z-1"
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
                        setCities((previousCities) => [...previousCities, e]),
                          setShowCities(false);
                      }}
                    >
                      {e}
                    </div>
                  ))
                )}
                <div
                  onClick={() => {
                    setCities((previousCity) => [...previousCity, city]),
                      setShowCities(false);
                  }}
                  className=" cursor-pointer text-[14px] hover:bg-[#219ebc] hover:text-white p-2 flex flex-row items-center gap-2"
                >
                  <FontAwesomeIcon icon={faKeyboard} />
                  <div>{city}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-row flex-wrap rounded-md w-[500px] col-span-2">
            {cities.map((e, index) => (
              <>
                <div
                  key={index}
                  className="bg-[#219ebc] px-4 text-white flex justify-center m-2 rounded-sm text-[14px] py-1"
                >
                  {e}
                </div>
                <FontAwesomeIcon
                  icon={faClose}
                  className="cursor-pointer text-[14px] relative right-4 bg-white text-[#219ebc] rounded-full px-[2px] border-[#219ebc] border-[0.5px]"
                  onClick={() => {
                    setCities(cities.filter((c) => c !== e));
                  }}
                />
              </>
            ))}
          </div>
        </div>

        <div className="mb-4 flex-col items-center">
          <div className="text-[14px]  text-slate-600">Passangers:</div>
          <div className="flex gap-2 w-full">
            <input
              type="number"
              name="adults"
              id=""
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="flex-1 border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
              placeholder="Adults"
              required
            />
            <input
              type="number"
              name="children"
              id=""
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="flex-1 border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
              placeholder="Children"
            />
            <input
              type="number"
              name="infants"
              id=""
              value={infants}
              onChange={(e) => setInfants(e.target.value)}
              className="flex-1 border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
              placeholder="Infants"
            />
          </div>
        </div>
        <div className="my-4 flex-col gap-3">
          <select
            name="priority"
            id=""
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out 
             focus:border-slate-600 focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Select priority</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex-col flex flex-1">
            <label className="text-[14px]  text-slate-600">
              Travel start date :{" "}
            </label>
            <input
              type="date"
              name="travelStartDate"
              id=""
              value={travelStartDate}
              onChange={(e) => setTravelStartDate(e.target.value)}
              className="border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out focus:border-slate-600 focus:ring-2 focus:ring-blue-300 w-full"
              required
            />
          </div>
          <div className="flex-col flex flex-1">
            <label className="text-[14px]  text-slate-600 ">
              Number of days :{" "}
            </label>
            <input
              type="number"
              name="numofdays"
              id=""
              value={numofdays}
              onChange={(e) => setNumofdays(e.target.value)}
              className="border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out focus:border-slate-600 focus:ring-2 focus:ring-blue-300 w-full"
              placeholder="Number of days"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <textarea
            name="additionalDetails"
            id=""
            value={additionalDetails}
            placeholder="Enter additional details"
            onChange={(e) => setAdditionalDetails(e.target.value)}
            className="border-[1px] border-slate-300 py-2 rounded-lg px-2 outline-none  placeholder:text-slate-600  text-slate-600 transition-all duration-300 ease-in-out focus:border-slate-600 focus:ring-2 focus:ring-blue-300 w-full"
            rows="4"
            required
          />
        </div>

        <div className="pt-5 float-right ">
          <input
            type="submit"
            value="Submit"
            className="bg-white text-slate-600 px-4 py-2 text-[14px] rounded-sm cursor-pointer border-[1px] border-slate-600 
           hover:bg-slate-700 hover:text-white hover:border-white 
           transition-all duration-300 ease-in-out"
          />
        </div>
      </form>
    </div>
  );
};

export default SalesTeamForm;
