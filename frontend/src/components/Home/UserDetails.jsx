import {
  faChevronRight,
  faClipboardCheck,
  faClock,
  faRocket,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const UserDetails = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className=" mx-10 flex flex-row justify-between items-center mb-10">
      <div>
        <div className="text-2xl font-semibold">Home</div>
        <div className=" flex flex-row items-center gap-3 text-[14px] font-semibold">
          <div className=" flex flex-row items-center gap-3 mt-5 text-[14px] font-semibold border-[1px] border-slate-300 py-2 px-5  rounded-lg">
            <FontAwesomeIcon icon={faClock} className=" text-blue-500" />
            <div>Pending</div>
            <div>11</div>
          </div>
          <div className=" flex flex-row items-center gap-3 mt-5 text-[14px] font-semibold border-[1px] border-slate-300 py-2 px-5  rounded-lg">
            <FontAwesomeIcon icon={faThumbsUp} className=" text-green-500" />
            <div>Approved</div>
            <div>5</div>
          </div>
          <div className=" flex flex-row items-center gap-3 mt-5 text-[14px] font-semibold border-[1px] border-slate-300 py-2 px-5  rounded-lg">
            <FontAwesomeIcon
              icon={faClipboardCheck}
              className=" text-gray-500"
            />
            <div>Completed</div>
            <div>8</div>
          </div>
          <div className=" flex flex-row items-center gap-3 mt-5 text-[14px] font-semibold border-[1px] border-slate-300 py-2 px-5  rounded-lg">
            <FontAwesomeIcon icon={faRocket} className=" text-red-500" />
            <div>Total</div>
            <div>27</div>
          </div>
        </div>
      </div>
      <div className=" flex flex-row items-center gap-3 bg-[#1AB394] text-white pr-10 rounded-sm">
        <div className=" w-[100px] h-[100px] rounded-full">
          {user.attachments.employeeImage ? (
            <div className="w-[100px] h-[100px] flex items-center justify-center ">
              <img src={user.attachments.employeeImage} alt="" className="w-[80px] h-[80px] object-cover rounded-full" />
            </div>
          ) : (
            <div className=" flex items-center justify-center w-full h-full">
              <FontAwesomeIcon icon={faUser} className=" text-[50px]" />
            </div>
          )}
        </div>
        <div>
          <div className="  text-xl font-semibold">{user && user.fullName}</div>
          <div className=" text-[14px]">{user && user.email}</div>
          <div className=" text-[14px]">{user && user.role}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
