import React from "react";
import testImage from "../Images/images.png";
import BeatLoader from "react-spinners/BeatLoader";

const UserProfile = ({ user }) => {
  return (
    <div className="flex justify-center items-center h-screen">
        {fullName?<div className="flex h-screen font">
            <div className="flex flex-col items-center w-[25%] mr-0 m-6 p-6 text-black rounded-[10px] shadow-lg shadow-black/25">
                <div className="p-6 ">
                    <div className="w-48 h-48 overflow-hidden">
                        <img src={testImage} alt="testp" className="object-cover w-full h-full:" />
                    </div>
                    <div className=" flex justify-center items-center pt-6 text-2xl">UserId - Coperate Title</div>
                </div>
                <div className="w-full border-t-1 border-gray-400 my-4"></div>
                <div className="flex flex-col items-center w-full">
                    <table className="w-full my-4">
                        <tr className="bg-gray-100">
                            <td className="p-2">Department:</td>
                            <td  className="p-2">HR</td>
                        </tr>
                        <tr>
                            <td className="p-2">Location:</td>
                            <td className="p-2">N/A</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="p-2">Employee Type:</td>
                            <td className="p-2">N/A</td>
                        </tr>
                        <tr>
                            <td className="p-2">Date Joined:</td>
                            <td className="p-2">12/05/2024</td>
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
                            <td className="p-2">67347383 </td>
                        </tr> 
                        <tr>
                            <td className="p-2 w-[40%]">Gender:</td>
                            <td className="p-2">Male</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="p-2">Date of Birth:</td>
                            <td className="p-2">12/04/1990 </td>
                        </tr>
                        <tr>
                            <td className="p-2">Nationality:</td>
                            <td className="p-2">Sinhala</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="p-2">Religion</td>
                            <td className="p-2">Buddhism</td> 
                        </tr>
                    </table>
                </div>
                
                <div className="flex-1 flex-col m-6 p-6 h-[45%] justify-center items-center text-black rounded-[10px]  shadow-lg shadow-black/25">
                    <div className="text-2xl">General Data</div>    
                    <div className="w-full border-t-1 border-gray-400 my-4"></div>
                    <table className="w-full ">
                        <tr className="bg-gray-100">
                            <td className="p-2 w-[40%]">Full Name:</td>
                            <td className="p-2">test name</td>
                        </tr>
                        <tr>
                            <td className="p-2">Adress:</td>
                            <td className="p-2">Lane1, City1, Town1</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="p-2">Email:</td>
                            <td className="p-2">testuser01@gmail.com</td>
                        </tr>
                        <tr>
                            <td className="p-2">Telephone:</td>
                            <td className="p-2">0111234567</td>
                        </tr>
                        <tr  className="bg-gray-100">
                            <td className="p-2">Mobile:</td>
                            <td className="p-2">0771234567</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>:<BeatLoader color="#50c5ff" loading={true} size={20}/>}
    </div>
  );
};

export default UserProfile;
