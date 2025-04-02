import { useEffect, useRef, useState } from "react";
import { Countries } from "../data/countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";


const SalesTeamForm = () => {
    const [customername, setCustomername] = useState("");
    const[lead,setLead] = useState("");
    const [contactMethod, setContactMethod] = useState("");
    const [contactValue, setContactValue] = useState("");
    const[countriesArray, setCountriesArray] = useState(Countries);
    const [country, setCountry] = useState("");
    const [showCities, setShowCities] = useState(false);
    const[showCountries, setShowCountries] = useState(false);
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
    const [urgent, setUrgent] = useState("");
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
            if (showCityRef.current && ! showCityRef.current.contains(event.target)) {
                setShowCities(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handlesCountrySearch = async(e) => {
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
            country,
            adults,
            children,
            infants,
            numofdays,
            urgent,
            travelStartDate,
            additionalDetails,
        };
        console.log("Sales Details Submitted:", salesDetails);

    };
    return (
        <div className="w-[800px] bg-slate-50  px-10 py-4  rounded-[10px]  shadow-lg shadow-black/25 m-5">
        <h2 className=" text-xl font-semibold  text-slate-600 m-2">Add sales details</h2>
        <hr className="border-t border-gray-300 my-4"></hr>

        <form className ="m-auto" onSubmit={handleSumbit}>
            <div className="mb-4 gap-3 pl-5">
                <label className="block text-me font-medium text-gray-700">Customer details : </label>
                    <div className="mb-3 pl-2 pt-2">
                    <label className=" text-[14px]  text-slate-600">Name : </label>
                    <input
                        type="text"
                        name="customername"
                        id=""
                        className="border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[200px]"
                        placeholder="Enter customer name"
                        value={customername}
                        onChange={(e) => setCustomername(e.target.value)}
                        required
                    />
                    </div>

                <div className="mb-2 pl-2 flex items-center">
                    <label className=" text-[14px]  text-slate-600 mr-1">Contacts : </label>
                    <select
                        name="contactMethod"
                        value={contactMethod}
                        onChange={(e) => setContactMethod(e.target.value)}
                        className="border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[150px] block"
                        required
                    >
                        <option value="">Contact method</option>
                        <option value="phone" >Telephone</option>
                        <option value="email" >E-mail</option>
                    </select>
                    {contactMethod && (
                        <div className="flex items-center gap-1 pl-2">
                            <input 
                                type={contactMethod === "phone" ? "tel" : "email"}
                                name={contactMethod}
                                value={contactValue}
                                onChange={(e) => setContactValue(e.target.value)}
                                className="border-[1px] border-slate-300 outline-pink-400 p-[5px] text-slate-600 text-[13px] w-[200px]"
                                placeholder={contactMethod === "phone" ? "Phone number" : "Email"}
                                required
                            />
                        </div>
                    )}
                </div>

                <div className="mb-3 pl-2">
                    <label className=" text-[14px]  text-slate-600">Lead : </label>
                    <select
                        name="lead"
                        id=""
                        className="border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[200px]"
                        required
                        value={lead}
                        onChange={(e) => setLead(e.target.value)}
                    >
                        <option value="">Connected media</option>
                        <option value="facebook" >Facebook</option>
                        <option value="whatsapp" >WhatsApp</option>
                        <option value="instagram" >Instagram</option>
                        <option value="linkedin" >Linkedin</option>
                        <option value="" ></option>
                        <option value="" ></option>
                    </select>     
                </div>      
            </div>

             <hr className="border-t border-gray-300 my-4"></hr>

            <div className="mb-4 flex items-center gap-3" >
                <label className=" text-[14px]  text-slate-600 ml-2">Subject : </label>
                <input
                    type="text"
                    name="subject"
                    id=""
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[200px]"  
                    placeholder="Subject"
                    required
                /> 
            </div>
            <div className="mb-4 relative flex items-center gap-3">
                <label className="text-[14px]  text-slate-600 ml-2">Country : </label>
                <input
                    type="text"
                    name="country"
                    id=""
                    className="border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[200px]"
                    value={country}
                    onChange={handlesCountrySearch}
                    placeholder="Country"
                    onFocus={() => setShowCountries(true)}
                    required
                />
                <div className="absolute left-12 top-8 cursor-pointer">
                {showCountries && (
                    <div
                        className="absolute max-h-[400px] overflow-y-scroll scroll-auto bg-white w-[250px]  py-1 z-1 font-[14px]"
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
                </div>
            </div>  

            <div className="mb-4 relative flex items-center gap-3">
                <label className="text-[14px]  text-slate-600 ml-2">Main cities & places : </label>
                <input
                    type="text"
                    id=""
                    name="city"
                    value={city}
                    onFocus={() => setShowCities(true)}
                    placeholder="Main Cities & Places"
                    onChange={handleCitySearch}
                    className="border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[200px]"
                    />
                    <div className="absolute left-30 top-8 cursor-pointer">
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
                            cityArray.map((e,index) => (
                                <div
                                    className=" cursor-pointer text-[14px] hover:bg-[#219ebc] hover:text-white p-2"
                                    key={index}
                                    onClick={() => {
                                        setCities((previousCities) => [
                                            ...previousCities, 
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
                                setCities((previousCity) => [
                                    ...previousCity,
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
                </div>

            </div>

            <div className="mb-4 flex items-center gap-3">
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

            <div className="mb-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                    <label className="text-[14px]  text-slate-600 ml-2">Number of adults : </label>
                    <input
                        type="number"
                        name="adults"
                        id=""
                        value={adults}
                        onChange={(e) => setAdults(e.target.value)}
                        className="border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[90px]"   
                        placeholder="Adults"
                        required
                    />
                </div>

                <div className="flex items-center gap-1">
                    <label className="text-[14px]  text-slate-600 ml-2">Number of children : </label>
                    <input
                        type="number"
                        name="children"
                        id=""
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                        className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[90px]"
                        placeholder="Children"
                    />
                </div>

                <div className="flex items-center gap-1 ml-2">
                    <label className="text-[14px]  text-slate-600">Number of infants: </label>
                    <input
                        type="number"
                        name="infants"
                        id=""
                        value={infants}
                        onChange={(e) => setInfants(e.target.value)}
                        className="border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[90px]"   
                        placeholder="Infants"
                    />
                </div>
            </div>
            <div className="mb-4 flex items-center gap-3">
                <label className="text-[14px]  text-slate-600 ml-2">Urgent request : </label>
                <div className="flex item-center gap-4">
                    <label className="text-[14px]  text-slate-600">
                        <input
                            type="radio"
                            name="urgent"
                            id=""
                            value="Yes"
                            onChange={(e) => setUrgent(e.target.value)}
                            checked={urgent === "Yes"}
                        />
                        Yes
                    </label>
                    <label className="text-[14px]  text-slate-600">
                        <input
                            type="radio"
                            name="urgent"
                            id=""
                            value="No"
                            onChange={(e) => setUrgent(e.target.value)}
                            checked={urgent === "No"}
                        />
                        No
                    </label>
                </div>
            </div>
            <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <label className="text-[14px]  text-slate-600 ml-2">Travel start date : </label>
                    <input
                        type="date"
                        name="travelStartDate"
                        id=""
                        value={travelStartDate}
                        onChange={(e) => setTravelStartDate(e.target.value)}
                        className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[200px]"
                        required
                    />
                </div>
            </div>
            <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <label className="text-[14px]  text-slate-600 ml-2">Number of days : </label>
                    <input
                        type="number"
                        name="numofdays"
                        id=""
                        value={numofdays}
                        onChange={(e) => setNumofdays(e.target.value)}
                        className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[200px]" 
                        placeholder="Number of days"
                        required
                    />
                </div>
            </div>
            <div className="">
                <label className="text-[14px]  text-slate-600 block pb-2 ml-2">Additional details : </label>
                <textarea
                    name="additionalDetails"
                    id=""
                    value={additionalDetails}
                    placeholder="Enter additional details"
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    className="border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[200px] ml-2"
                    rows="4"
                />
            </div>
                
            <div className="pt-5 ml-2">
                <input
                    type="submit"
                    value="Submit"
                    className="bg-[#219ebc] text-white px-4 py-2 text-[14px] rounded-sm cursor-pointer"
                    />
            </div>
        </form>
    </div>    
    )
}

export default SalesTeamForm;