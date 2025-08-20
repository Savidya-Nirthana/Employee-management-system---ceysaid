import {
  faChevronRight,
  faClipboardCheck,
  faClock,
  faRocket,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserDetails = () => {
  return (
    <div className=" w-[100%] border-b-[1px] border-slate-200 p-5 relative top-[-20px] bg-[#023047] shadow-md shadow-black/25">
      <div className=" flex flex-row justify-center gap-20">
        <div className=" w-[200px] h-[100px] bg-slate-0 border-white border-2 bg-slate-300 p-5 rounded-[10px]">
          <div className=" text-center text-[30px] font-semibold">11</div>
          <div className="">
            <div className=" flex flex-row items-center gap-2 justify-center    ">
              <FontAwesomeIcon icon={faClock} className=" text-slate-800" />
              <div className=" text-slate-800 font-bold">Pending</div>
            </div>
            {/* <FontAwesomeIcon
              icon={faChevronRight}
              className=" text-slate-800 font-bold"
            /> */}
          </div>
        </div>
        <div className=" w-[200px] h-[100px] bg-slate-300 border-white border-2 p-5 rounded-[10px]">
          <div className=" text-center text-[30px] font-semibold">11</div>
          <div>
            <div className=" flex flex-row items-center gap-2 justify-center">
              <FontAwesomeIcon icon={faThumbsUp} className=" text-slate-800" />
              <div className="text-slate-800 font-bold">Approved</div>
            </div>
            {/* <FontAwesomeIcon
              icon={faChevronRight}
              className=" text-slate-800"
            /> */}
          </div>
        </div>
        <div className="w-[200px] h-[100px] bg-slate-300 border-white border-2 p-5 rounded-[10px]">
          <div className=" text-[30px] text-center text-slate-800 font-semibold">
            11
          </div>

          <div className="">
            <div className=" flex flex-row items-center gap-2 justify-center">
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className=" text-slate-800"
              />
              <div className=" text-slate-800 font-bold">Completed</div>
            </div>
            {/* <FontAwesomeIcon
              icon={faChevronRight}
              className=" text-green-600"
            /> */}
          </div>
        </div>
        <div className=" w-[200px] h-[100px] bg-slate-300 border-white border-2 p-5 rounded-[10px]">
          <div className=" text-[30px] text-center text-slate-800 font-semibold">
            535,000
          </div>
          <div className=" ">
            <div className=" flex flex-row items-center gap-2 justify-center">
              <FontAwesomeIcon
                icon={faRocket}
                className="text-slate-800 font-bold"
              />
              <div className=" text-slate-800 font-bold">Target</div>
            </div>
            {/* <FontAwesomeIcon icon={faChevronRight} className=" text-red-600" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
