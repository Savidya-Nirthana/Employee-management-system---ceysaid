import { useState } from "react";
import { Upload } from "lucide-react";
import { regConfirm } from "../services/authservice";


const RegStepOne = () => {
  const [date, setDate] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [nicFileName, setNicFileName] = useState("No file selected");
  const [LAFileName, setLAFileName] = useState("No file selected");
  const [GnFileName, setGnFileName] = useState("No file selected");

  const regHandler = async(e) => {

    
  };


  const [profile, setProfile] = useState("");

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    setProfile(file ? file.name : "");
  };

  const NicHandleFileChange = (event) => {
    const file = event.target.files[0];
    setNicFileName(file ? file.name : "No file selected");
  };
  const GnHandleFileChange = (event) => {
    const file = event.target.files[0];
    setGnFileName(file ? file.name : "No file selected");
  };
  const LAHandleFileChange = (event) => {
    const file = event.target.files[0];
    setLAFileName(file ? file.name : "No file selected");
  };

  return (
    <>
      <div className="w-[100%] my-1 pl-[30px] text-[20px] text-slate-600">
        Register new employee
      </div>

      <form className="  m-auto" onSubmit={regHandler}>
        <div className=" flex flex-row justify-around">
          <div>
            <div className=" gap-3 flex flex-row m-5 items-end">
              <div className="flex flex-col items-center gap-2">
                <label className="border-2 border-slate-300 w-30 h-30 flex flex-col items-center justify-center rounded-xl relative cursor-pointer hover:border-blue-500 transition">
                  <Upload className="w-10 h-10 text-gray-400" />
                  <span className="absolute top-[75%] text-sm text-gray-500 text-[14px]">
                    {"Upload Image"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    name="profilePhoto"
                    onChange={handleProfileChange}
                  />
                </label>
                {profile && (
                  <p className="text-gray-600 text-sm truncate max-w-xs">
                    {profile.substring(0, 15)}
                  </p>
                )}
              </div>
              <input
                className="placeholder:text-slate-600 text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[400px] h-[30px]"
                type="text"
                name="fullname"
                id=""
                placeholder="Full name"
                required
              />
            </div>
            <div className=" w-[100%] bg-[#262626] text-white pl-10 rounded-sm py-1 text-[14px]">
              Address
            </div>
            <div className=" m-5">
              <div>
                <input
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  type="text"
                  name="house_no"
                  id=""
                  placeholder="House no"
                />
              </div>
              <div className=" flex flex-row gap-[20px] my-5">
                <div>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="street_1"
                    id=""
                    placeholder="Street 1"
                  />
                </div>
                <div>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="street_2"
                    id=""
                    placeholder="Street 2"
                  />
                </div>
              </div>
              <div className=" flex flex-row gap-[20px] my-5">
                <div>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="city"
                    id=""
                    placeholder="City/Town"
                  />
                </div>
                <div>
                  <select
                    className="  text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600]"
                    id="district"
                    name="district"
                  >
                    <option value="" disabled>Select a district</option>
                    <option value="Ampara">Ampara</option>
                    <option value="Anuradhapura">Anuradhapura</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Batticaloa">Batticaloa</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Galle">Galle</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Hambantota">Hambantota</option>
                    <option value="Jaffna">Jaffna</option>
                    <option value="Kalutara">Kalutara</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Kegalle">Kegalle</option>
                    <option value="Kilinochchi">Kilinochchi</option>
                    <option value="Kurunegala">Kurunegala</option>
                    <option value="Mannar">Mannar</option>
                    <option value="Matale">Matale</option>
                    <option value="Matara">Matara</option>
                    <option value="Monaragala">Monaragala</option>
                    <option value="Mullaitivu">Mullaitivu</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Polonnaruwa">Polonnaruwa</option>
                    <option value="Puttalam">Puttalam</option>
                    <option value="Ratnapura">Ratnapura</option>
                    <option value="Trincomalee">Trincomalee</option>
                    <option value="Vavuniya">Vavuniya</option>
                  </select>
                </div>
                <div>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[100px] placeholder:text-slate-600"
                    type="text"
                    name="postal_code"
                    id=""
                    placeholder="Postal code"
                  />
                </div>
              </div>
              <div className=" flex flex-row my-5 gap-[20px]">
                <div>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="gs_division"
                    id=""
                    placeholder="Gs division"
                  />
                </div>
                <div>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="gn_division"
                    id=""
                    placeholder="Gn division"
                  />
                </div>
                <div></div>
              </div>
            </div>

            <div className=" w-[100%] bg-[#262626] text-white pl-10 rounded-sm py-1 text-[14px]">
              Contact details
            </div>
            <div className=" flex flex-row m-5 gap-[20px]">
              <div>
                <input
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  type="text"
                  name="telephone"
                  id=""
                  placeholder="Telephone"
                />
              </div>

              <div>
                <input
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  type="text"
                  name="mobile"
                  id=""
                  placeholder="Mobile"
                />
              </div>
            </div>
            <div className=" mx-5">
              <input
                className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                type="text"
                name="email"
                id=""
                placeholder="Email"
              />
            </div>
          </div>
          <div>
            <div className=" w-[100%] bg-[#262626] text-white pl-10 rounded-sm py-1 text-[14px]">
              Other informations
            </div>
            <div className=" flex flex-row gap-[20px] m-5">
              <div className="">
                <input
                  type={isFocused || date ? "date" : "text"}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Select Dob"
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  name="dob"
                />
              </div>
              <div>
                <select
                  name="gender"
                  id=""
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className=" ml-5">
              <input
                className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                type="text"
                name="nic"
                id=""
                placeholder="NIC"
              />
            </div>
            <div className=" flex flex-row gap-[20px] m-5">
              <div>
                <select className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600">
                  <option value="">Select nationality</option>
                  <option value="sinhala">Sinhala</option>
                  <option value="tamil">Tamil</option>
                  <option value="muslim">Muslim</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <select
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  name="religion"
                  id=""
                >
                  <option value="">Select Religion</option>
                  <option value="buddhism">Buddhism</option>
                  <option value="hinduism">Hinduism</option>
                  <option value="islam">Islam</option>
                  <option value="christianity">Christianity</option>
                  <option value="other">Other</option>

                </select>
              </div>
            </div>
            <div className=" w-[100%] bg-[#262626] text-white pl-10 rounded-sm py-1 text-[14px]">
              Current assignment
            </div>
            <div className=" m-5">
              <div className=" flex flex-row gap-[20px]">
                <div>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="coporate_title"
                    id=""
                    placeholder="Cooperate title"
                  />
                </div>
                <div>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="location"
                    id=""
                    placeholder="Location"
                  />
                </div>
              </div>
              <div className=" flex flex-row gap-[20px] mt-5">
                <div>
                  <select
                    name="department"
                    id=""
                    className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  >
                    <option value="">Select department</option>
                    <option value="accounts">Accounts</option>
                    <option value="sales">Sales</option>
                    <option value="operation">Operation</option>
                  </select>
                </div>
                <div>
                  <select
                    className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    id="emType"
                    required
                  >
                    <option value="">Select employee type</option>
                    <option value="permenant">Permenant</option>
                    <option value="temporary">Temporary</option>
                    <option value="training">Training</option>
                    <option value="terminate">Terminate</option>
                    <option value="resign">Resign</option>
                  </select>
                </div>
              </div>
            </div>
            <div className=" w-[100%] bg-[#262626] text-white pl-10 rounded-sm py-1 text-[14px]">
              Attachments
            </div>
            <div className=" flex flex-row flex-wrap gap-[20px] mx-5 my-10">
              <div className="flex flex-col items-center">
                <label className="flex items-center justify-center w-[150px] px-1 py-2 bg-indigo-400 text-white text-[12px] rounded-lg cursor-pointer hover:bg-indigo-500 transition">
                  <span>Upload NIC image</span>
                  <input
                    type="file"
                    className="hidden"
                    name="nic"
                    onChange={NicHandleFileChange}
                  />
                </label>
                <p className="mt-2 text-gray-600 text-sm">
                  {nicFileName.substring(0, 16)}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <label className="flex items-center justify-center w-[150px] px-1 py-2 bg-indigo-400 text-white text-[12px] rounded-lg cursor-pointer hover:bg-indigo-500 transition">
                  <span>Upload Gn certificate</span>
                  <input
                    type="file"
                    className="hidden"
                    name="gn_certificate"
                    onChange={GnHandleFileChange}
                  />
                </label>
                <p className="mt-2 text-gray-600 text-sm">{GnFileName}</p>
              </div>
              <div className="flex flex-col items-center">
                <label className="flex items-center justify-center w-[150px] px-1 py-2 bg-indigo-400 text-white text-[12px] rounded-lg cursor-pointer hover:bg-indigo-500 transition">
                  <span>Upload Letter of appt.</span>
                  <input
                    type="file"
                    className="hidden"
                    name="letterAppt"
                    onChange={LAHandleFileChange}
                  />
                </label>
                <p className="mt-2 text-gray-600 text-sm">{LAFileName}</p>
              </div>
            </div>
            <div className=" float-end mt-10">
              <input
                type="submit"
                value="Complete"
                className=" bg-indigo-400 hover:bg-indigo-500 text-white text-[14px] px-5 py-1 rounded-sm cursor-pointer"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegStepOne;
