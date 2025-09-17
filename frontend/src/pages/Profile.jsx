import { useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { AuthContext } from "../contexts/AuthContext";
import { UIContext } from "../contexts/UIContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { showNav } = useContext(UIContext);
  const { user } = useContext(AuthContext);

  return (
    <div className=" flex flex-row gap-2">
      {!user ? (
        <div
          className={`flex items-center min-h-[calc(100vh-70px)] justify-center font duration-500 mt-[70px] w-[100%] ${
            showNav ? "ml-[200px]" : "ml-[60px]"
          }`}
        >
          <BeatLoader color="#50c5ff" loading={true} size={20} />
        </div>
      ) : (
        <div
          className={`flex h-[100%] font duration-500 mt-[70px] w-[100%] ${
            showNav ? "ml-[200px]" : "ml-[60px]"
          }`}
        >
          <div className="flex flex-col  items-center w-[25%] mr-0 m-6 p-6 text-black rounded-[10px] shadow-lg shadow-black/25">
            <div className="p-6 ">
              <div className="w-48 h-48 overflow-hidden flex justify-center items-center">
                {user.attachments.employeeImage ? (
                  <img
                    src={user.attachments.employeeImage}
                    alt="testp"
                    className="object-cover w-full h-full:"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} className=" text-[#219ebc] mt-2 ml-2 text-[150px]" />
                )}
              </div>
              <div className=" flex justify-center items-center pt-6 text-2xl">
                {user.userId} - {user.corporateDetails.corporateTitle}
              </div>
            </div>
            <div className="w-full border-t-1 border-gray-400 my-4"></div>
            <div className="flex flex-col items-center w-full">
              <table className="w-full my-4">
                <tr className="bg-gray-100">
                  <td className="p-2">Department:</td>
                  <td className="p-2">
                    {user.corporateDetails.department[0].toUpperCase() +
                      user.corporateDetails.department.substring(1)}
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Location:</td>
                  <td className="p-2">
                    {user.corporateDetails.location[0]?.toUpperCase() +
                      user.corporateDetails.location.substring(1)}
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Employee Type:</td>
                  <td className="p-2">
                    {user.corporateDetails.employeeType[0].toUpperCase() +
                      user.corporateDetails.employeeType.substring(1)}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2">Date Joined:</td>
                  <td className="p-2">
                    {
                      new Date(user.corporateDetails.dateJoined)
                        .toISOString()
                        .split("T")[0]
                    }
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div className="flex-1 flex-row h-full justify-even item-center">
            <div className="flex-1 flex-col m-6 p-6 h-[45%] justify-center items-center text-black rounded-[10px]  shadow-lg shadow-black/25 ">
              <div className="text-2xl">Personal Details</div>
              <div className="w-full border-t-1 border-gray-400 my-4"></div>
              <table className="w-full">
                <tr className="bg-gray-100">
                  <td className="p-2">NIC:</td>
                  <td className="p-2">{user.nic}</td>
                </tr>
                <tr>
                  <td className="p-2 w-[40%]">Gender:</td>
                  <td className="p-2">
                    {user.gender[0].toUpperCase() + user.gender.substring(1)}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2">Date of Birth:</td>
                  <td className="p-2">{user.dob.split("T")[0]}</td>
                </tr>
                <tr>
                  <td className="p-2">Nationality:</td>
                  <td className="p-2">
                    {user.nationality[0].toUpperCase() +
                      user.nationality.substring(1)}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2">Religion</td>
                  <td className="p-2">
                    {user.religion[0].toUpperCase() +
                      user.religion.substring(1)}
                  </td>
                </tr>
              </table>
            </div>

            <div className="flex-1 flex-col m-6 p-6 h-[45%] justify-center items-center text-black rounded-[10px]  shadow-lg shadow-black/25">
              <div className="text-2xl">General data</div>
              <div className="w-full border-t-1 border-gray-400 my-4"></div>
              <table className="w-full ">
                <tr className="bg-gray-100">
                  <td className="p-2 w-[40%]">Full Name:</td>
                  <td className="p-2">{user.fullName}</td>
                </tr>
                <tr>
                  <td className="p-2">Adress:</td>
                  <td className="p-2">
                    {user.address.houseNo} {user.address.street1}{" "}
                    {user.address.street2} {user.address.city}{" "}
                    {user.address.postalCode}.
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2">Email:</td>
                  <td className="p-2">{user.email}</td>
                </tr>
                <tr>
                  <td className="p-2">Telephone:</td>
                  <td className="p-2">{user.telephone}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2">Mobile:</td>
                  <td className="p-2">{user.mobile}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
