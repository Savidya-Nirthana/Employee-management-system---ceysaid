import { useEffect, useState } from "react";
import { getPermRegUser } from "../../services/authservice";
import { Upload } from "lucide-react";
import PulseLoader from "react-spinners/PulseLoader";

import ImageZoomModel from "./ImageZoomModel";
const EmployeeInfo = (props) => {
  const { userId, type, user, setUser, setIsEdit } = props;
  const [imageUrl, setImageUrl] = useState(null);
  const [nicImageUrl, setNicImageUrl] = useState(null);
  const [gsImageUrl, setGsImageUrl] = useState(null);
  const [letterApptUrl, setLetterApptUrl] = useState(null);
  const [profileHover, setProfileHover] = useState(null);
  const [selectImageUrl, setSelectImageUrl] = useState(null);

  const baseUrl = `${import.meta.env.VITE_BASE_URL}`;
  useEffect(() => {
    const getUser = async () => {
      const data = await getPermRegUser(userId);
      setUser(data);
      let profile = data.attachments.employeeImage;
      let nic = data.attachments.nicImage;
      let gs = data.attachments.gramaNiladhariCertificate;
      let la = data.attachments.letterOfAppointment;
      profile = await profile.replace("uploads", "");
      nic = await nic.replace("uploads", "");
      gs = await gs.replace("uploads", "");
      la = await la.replace("uploads", "");

      setImageUrl(profile);
      setNicImageUrl(nic);
      setGsImageUrl(gs);
      setLetterApptUrl(la);
    };
    getUser();
  }, []);
  return type === "approval" ? (
    user ? (
      <>
        <form className=" flex flex-row gap-10 scroll-auto overflow-y-auto">
          <div>
            <div className=" flex flex-row gap-5 items-end mb-5">
              <div className="my-5 flex flex-col">
                <label
                  htmlFor="fullname"
                  className="text-[12px] text-slate-800"
                >
                  Full name:
                </label>
                <input
                  className="placeholder:text-slate-600 text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[400px] h-[30px]"
                  type="text"
                  name="fullname"
                  id=""
                  value={user.fullName ? user.fullName : ""}
                  disabled
                  required
                />
              </div>
              <label
                className="border-2 border-slate-300 w-30 h-30 flex flex-col items-center justify-center rounded-xl relative cursor-pointer hover:border-blue-500 transition"
                onClick={() => setSelectImageUrl(`${imageUrl}`)}
              >
                {imageUrl ? (
                  <img
                    src={`${imageUrl}`}
                    alt="img"
                    className={`${profileHover ? "opacity-45" : ""}`}
                    onMouseEnter={() => setProfileHover(true)}
                    onMouseOut={() => setProfileHover(false)}
                  />
                ) : (
                  <Upload className="w-10 h-10 text-gray-400" />
                )}
                {/* <FontAwesomeIcon
                  icon={faEye}
                  className={`text-green-500 duration-200 ${
                    profileHover ? "text-3xl" : "text-[0px]"
                  }`}
                /> */}
              </label>
            </div>
            <div className=" w-[100%] bg-[#023047] text-white pl-10 rounded-sm py-1 text-[14px]">
              Address
            </div>
            <div className=" my-5">
              <div className=" flex flex-col">
                <label
                  htmlFor="house_no"
                  className="text-[12px] text-slate-800"
                >
                  House no.:
                </label>
                <input
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  type="text"
                  name="house_no"
                  id=""
                  placeholder="House no"
                  value={user.address ? user.address.houseNo : ""}
                  disabled
                />
              </div>
              <div className=" flex flex-row gap-[20px] my-5">
                <div className=" flex flex-col">
                  <label
                    htmlFor="street1"
                    className="text-[12px] text-slate-800"
                  >
                    Street 1:
                  </label>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="street_1"
                    id=""
                    placeholder="Street 1"
                    value={user.address.street1 ? user.address.street1 : ""}
                    disabled
                  />
                </div>
                <div className=" flex flex-col">
                  <label
                    htmlFor="Street 2"
                    className="text-[12px] text-slate-800"
                  >
                    Street 2:
                  </label>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="street_2"
                    id=""
                    placeholder="Street 2"
                    value={user.address.street2 ? user.address.street2 : ""}
                    disabled
                  />
                </div>
              </div>
              <div className=" flex flex-row gap-[20px] my-5">
                <div>
                  <label
                    htmlFor="city-town"
                    className="text-[12px] text-slate-800"
                  >
                    City/Town:
                  </label>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="city"
                    id=""
                    placeholder="City/Town"
                    value={user.address.city ? user.address.city : ""}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="district"
                    className="text-[12px] text-slate-800"
                  >
                    District
                  </label>
                  <input
                    className="  text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600]"
                    id="district"
                    name="district"
                    value={user.address.district ? user.address.district : ""}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="postal-code"
                    className="text-[12px] text-slate-800"
                  >
                    Postal code:
                  </label>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[100px] placeholder:text-slate-600"
                    type="text"
                    name="postal_code"
                    id=""
                    placeholder="Postal code"
                    value={
                      user.address.postalCode ? user.address.postalCode : ""
                    }
                    disabled
                  />
                </div>
              </div>
              <div className=" flex flex-row my-5 gap-[20px]">
                <div className=" flex flex-col">
                  <label
                    htmlFor="gs_division"
                    className="text-[12px] text-slate-800"
                  >
                    Gs division:
                  </label>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="gs_division"
                    id=""
                    placeholder="Gs division"
                    value={
                      user.address.gsDivision ? user.address.gsDivision : ""
                    }
                    disabled
                  />
                </div>
                <div className=" flex flex-col">
                  <label
                    htmlFor="gn-division"
                    className="text-[12px] text-slate-800"
                  >
                    Gn division:
                  </label>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="gn_division"
                    id=""
                    placeholder="Gn division"
                    value={
                      user.address.gnDivision ? user.address.gnDivision : ""
                    }
                    disabled
                  />
                </div>
              </div>
              <div className=" w-[100%] bg-[#023047] text-white pl-10 rounded-sm py-1 text-[14px]">
                Contact details
              </div>

              <div className=" flex flex-row m-5 gap-[20px]">
                <div className=" flex flex-col">
                  <label className="text-[12px] text-slate-800">
                    Telephone
                  </label>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="telephone"
                    id=""
                    placeholder="Telephone"
                    value={user.telephone ? user.telephone : ""}
                    disabled
                  />
                </div>

                <div className=" flex flex-col">
                  <label htmlFor="" className="text-[12px] text-slate-800">
                    Mobile
                  </label>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="mobile"
                    id=""
                    placeholder="Mobile"
                    value={user.mobile ? user.mobile : ""}
                    disabled
                  />
                </div>
              </div>
              <div className=" mx-5">
                <div className=" flex flex-col">
                  <label htmlFor="" className="text-[12px] text-slate-800">
                    Email
                  </label>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="email"
                    id=""
                    placeholder="Email"
                    value={user.email ? user.email : ""}
                    onChange={(e) => {
                      setUser((prevUser) => ({
                        ...prevUser,
                        email: e.target.value,
                      }));
                      setIsEdit(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className=" w-[100%] bg-[#023047] text-white pl-10 rounded-sm py-1 text-[14px]">
              Other informations
            </div>
            <div className=" flex flex-row gap-[20px] m-5">
              <div className="flex flex-col">
                <label htmlFor="" className="text-[12px] text-slate-800">
                  Date of Birth
                </label>
                <input
                  placeholder="Select Dob"
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  name="dob"
                  value={user.dob ? user.dob.split("T")[0] : ""}
                  disabled
                />
              </div>
              <div className=" flex flex-col">
                <label htmlFor="gender" className="text-[12px] text-slate-800">
                  Gender:
                </label>
                <input
                  name="gender"
                  id=""
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  value={user.gender ? user.gender : ""}
                  disabled
                />
              </div>
            </div>
            <div className=" ml-5 flex flex-col">
              <label htmlFor="" className="text-[12px] text-slate-800">
                NIC:
              </label>
              <input
                className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                type="text"
                name="nic"
                id=""
                placeholder="NIC"
                value={user.nic ? user.nic : ""}
                disabled
              />
            </div>
            <div className=" flex flex-row gap-[20px] m-5">
              <div className="flex flex-col">
                <label htmlFor="" className="text-[12px] text-slate-800">
                  Nationality:
                </label>
                <input
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  placeholder="Nationality"
                  value={user.nationality ? user.nationality : ""}
                  disabled
                />
              </div>
              <div className=" flex flex-col">
                <label htmlFor="" className="text-[12px] text-slate-800">
                  Religion:
                </label>
                <input
                  className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                  name="religion"
                  id=""
                  placeholder="Religion"
                  value={user.religion ? user.religion : ""}
                  disabled
                />
              </div>
            </div>
            <div className=" w-[100%] bg-[#023047] text-white pl-10 rounded-sm py-1 text-[14px]">
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
                    placeholder="Coporate title"
                    value={
                      user.corporateDetails.corporateTitle
                        ? user.corporateDetails.corporateTitle
                        : ""
                    }
                    onChange={(e) => {
                      setUser((prevUser) => ({
                        ...prevUser,
                        corporateDetails: {
                          ...prevUser.corporateDetails,
                          corporateTitle: e.target.value,
                        },
                      }));
                      setIsEdit(true);
                    }}
                  />
                </div>
                <div>
                  <input
                    className=" text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    type="text"
                    name="role"
                    id=""
                    placeholder="Role"
                    value={user.role ? user.role : ""}
                    onChange={(e) => {
                      setUser((prevUser) => ({
                        ...prevUser,
                        role: e.target.value,
                      }));
                      setIsEdit(true);
                    }}
                  />
                </div>
              </div>
              <div className=" flex flex-row gap-[20px] mt-5">
                <div>
                  <select
                    name="department"
                    id=""
                    className="text-slate-600 border-[1px] border-slate-300 outline-slate-400 rounded-sm text-[12px] p-1 w-[200px] placeholder:text-slate-600"
                    value={
                      user.corporateDetails.department
                        ? user.corporateDetails.department
                        : ""
                    }
                    onChange={(e) => {
                      setUser((prevUser) => ({
                        ...prevUser,
                        corporateDetails: {
                          ...prevUser.corporateDetails,
                          department: e.target.value,
                        },
                      }));
                      setIsEdit(true);
                    }}
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
                    value={
                      user.corporateDetails.employeeType
                        ? user.corporateDetails.employeeType
                        : ""
                    }
                    onChange={(e) => {
                      setUser((prevUser) => ({
                        ...prevUser,
                        corporateDetails: {
                          ...prevUser.corporateDetails,
                          employeeType: e.target.value,
                        },
                      }));
                      setIsEdit(true);
                    }}
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
            <div className=" w-[100%] bg-[#023047] text-white pl-10 rounded-sm py-1 text-[14px]">
              Attachments
            </div>
            <div className=" flex flex-row flex-wrap gap-[20px] mx-5 my-10">
              <div className="flex flex-col items-center">
                <label
                  className="flex items-center justify-center w-[100px] h-[100px]  border-2  text-white text-[12px] rounded-lg cursor-pointer hover:border-blue-500 transition"
                  onClick={() => setSelectImageUrl(`${nicImageUrl}`)}
                >
                  {nicImageUrl ? (
                    <img
                      className=" rounded-md"
                      src={`${nicImageUrl}`}
                      alt="NIC image"
                    />
                  ) : (
                    <PulseLoader color="oklch(0.673 0.182 276.935)" size={12} />
                  )}
                </label>
                <p className="mt-2 text-gray-600 text-sm">NIC</p>
              </div>
              <div className="flex flex-col items-center">
                <label
                  className="flex items-center justify-center w-[100px] h-[100px] text-white text-[12px] rounded-lg cursor-pointer border-2 hover:border-blue-500 transition"
                  onClick={() => setSelectImageUrl(`${gsImageUrl}`)}
                >
                  {gsImageUrl ? (
                    <img
                      className=" rounded-md"
                      src={`${gsImageUrl}`}
                      alt="gs certificate"
                    />
                  ) : (
                    <PulseLoader color="oklch(0.673 0.182 276.935)" size={12} />
                  )}
                </label>
                <p className="mt-2 text-gray-600 text-sm">Gs certificate</p>
              </div>
              <div className="flex flex-col items-center">
                <label
                  className="flex items-center justify-center w-[100px] h-[100px]  text-white text-[12px] rounded-lg cursor-pointer border-2 hover:border-blue-500 transition"
                  onClick={() =>
                    setSelectImageUrl(`${letterApptUrl}`)
                  }
                >
                  {letterApptUrl ? (
                    <img
                      className=" rounded-md"
                      src={`${letterApptUrl}`}
                      alt="letter_of_appointment"
                    />
                  ) : (
                    <PulseLoader color="oklch(0.673 0.182 276.935)" size={12} />
                  )}
                </label>
                <p className="mt-2 text-gray-600 text-sm">
                  Letter of appointment
                </p>
              </div>
            </div>
          </div>
        </form>
        {selectImageUrl && (
          <ImageZoomModel
            imageUrl={selectImageUrl}
            isOpen={selectImageUrl}
            setIsOpen={setSelectImageUrl}
          />
        )}
      </>
    ) : (
      <div className=" flex items-center justify-center w-[500px] h-[500px]">
        <PulseLoader color="oklch(0.673 0.182 276.935)" size={12} />
      </div>
    )
  ) : (
    <></>
  );
};

export default EmployeeInfo;
