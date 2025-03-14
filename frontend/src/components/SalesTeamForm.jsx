import { useState } from "react";

const SalesTeamForm = () => {
    const [subject, setSubject] = useState("");
    const [country, setCountry] = useState("");
    const [visitingPlaces, setVisitingPlaces] = useState("");
    const [seats, setSeats] = useState("");
    const [numofday, setNumofdays] = useState("");
    const [numofnights, setNumofnights] = useState("");
    const [urgent, setUrgent] = useState("");
    const [travelStartDate, setTravelStartDate] = useState("");
    const [travelEndDate, setTravelEndDate] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");

    const handleSumbit = async (e) => {
        e.preventDefault();

        const salesDetails = {
            subject,
            country,
            visitingPlaces,
            seats,
            numofday,
            numofnights,
            urgent,
            travelStartDate,
            travelEndDate,
            additionalDetails,
        };
        
        console.log("Sales Details dent to Operation Team:", salesDetails);


        setSubject("");
        setCountry("");
        setVisitingPlaces("");
        setSeats("");
        setNumofdays("");
        setNumofnights("");
        setUrgent("");
        setTravelStartDate("");
        setTravelEndDate("");
        setAdditionalDetails("");
    };
    return (
        <div className="width-[100%] my-1 pl-[30px] text-[20px] text-slate-600">
        <h2 className="text-xl font-semibold mb-4">Add Sales Details</h2>
    
    
        <form className ="m-auto" onSubmit={handleSumbit}>
            <div className="mb-4 flex items-center gap-3" >
                <label className="block text-sm font-medium text-gray-700">Subject : </label>
                <input
                    type="text"
                    name="subject"
                    id=""
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"  
                    required
                    /> 
            </div>
            <div className="mb-4 flex items-center gap-3">
                <label className="block text-sm font-medium text-gray-700">Country : </label>
                <select
                    className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    >
                    <option value="" disabled>Select Country</option>
                    <option value="USA">USA</option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    </select>
            </div>    

            <div className="mb-4 flex items-center gap-3">
                <label className="block text-sm font-medium text-gray-700">Visiting Places : </label>
                <input
                    type="text"
                    name="visitingPlaces"
                    id=""
                    value={visitingPlaces}
                    placeholder="Enter Visiting Places"
                    onChange={(e) => setVisitingPlaces(e.target.value)}
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    rows="4"
                    />
            </div>

            <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <label className="block text-sm font-medium text-gray-700">Number of Seats : </label>
                    <input
                        type="number"
                        name="seats"
                        id=""
                        value={seats}
                        placeholder="Enter Number of Seats"
                        onChange={(e) => setSeats(e.target.value)}
                        className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"   
                        required
                    />
                </div>
            </div>
            <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <label className="block text-sm font-medium text-gray-700">Number Of Days : </label>
                    <input
                        type="number"
                        name="numofdays"
                        id=""
                        value={numofday}
                        placeholder="Enter Number of Days"
                        onChange={(e) => setNumofdays(e.target.value)}
                        className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600" 
                        required
                    />
                </div>
            

                <div className="flex items-center gap-3">
                    <label className="block text-sm font-medium text-gray-700">Number Of Nights : </label>
                    <input
                        type="number"
                        name="numofnights"
                        id=""
                        value={numofnights}
                        placeholder="Enter Number of nights"
                        onChange={(e) => setNumofnights(e.target.value)}
                        className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600" 
                        required
                    />
                </div>
            </div>

            <div className="mb-4 flex items-center gap-3">
                <label className="block text-sm font-medium text-gray-700">Urgent Request : </label>
                <div className="flex item-center gap-4">
                    <label className="block text-sm font-medium text-gray-700">
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
                    <label className="block text-sm font-medium text-gray-700">
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
                    <label className="block text-sm font-medium text-gray-700">Travel Start Date : </label>
                    <input
                        type="date"
                        name="travelStartDate"
                        id=""
                        value={travelStartDate}
                        onChange={(e) => setTravelStartDate(e.target.value)}
                        className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                        required
                    />
                </div>
                <div className="flex items-center gap-3">
                    <label className="block text-sm font-medium text-gray-700">Travel End Date : </label>
                    <input
                        type="date"
                        name="travelEndDate"
                        id=""
                        value={travelEndDate}
                        onChange={(e) => setTravelEndDate(e.target.value)}
                        className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                        required
                    />
                </div>
            </div>

            <div className="">
                <label className="pb-1 block text-sm font-medium text-gray-700">Additional Details : </label>
                <textarea
                    name="additionalDetails"
                    id=""
                    value={additionalDetails}
                    placeholder="Enter Additional Details"
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    rows="4"
                />
            </div>
                
            <div>
                <input
                    type="submit"
                    value="Submit to Operation Team"
                    className=" bg-indigo-400 hover:bg-indigo-500 text-white text-[14px] px-5 py-1 rounded-sm cursor-pointer"
                    />
            </div>
        </form>
    </div>    
    )
}

export default SalesTeamForm;