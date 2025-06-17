import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserDetails = () => {
  return (
    <div className=" w-[100%] border-b-[1px] border-slate-200 pb-5">
      <div className=" flex flex-row justify-evenly">
        <div className=" w-[200px] h-[100px] bg-[#FAF8FC] p-5 rounded-[10px]">
          <div className=" flex items-center justify-between">
            <div className=" text-blue-600">Pending</div>
            <FontAwesomeIcon icon={faChevronRight} className=" text-blue-600" />
          </div>
          <div className=" text-center text-[30px]">11</div>
        </div>
        <div className=" w-[200px] h-[100px] bg-[#FAF8FC] p-5 rounded-[10px]">
          <div className="flex items-center justify-between">
            <div className="text-yellow-500">Approved</div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className=" text-yellow-600"
            />
          </div>
          <div className=" text-center text-[30px]">11</div>
        </div>
        <div className="w-[200px] h-[100px] bg-[#FAF8FC] p-5 rounded-[10px]">
          <div className=" flex items-center justify-between">
            <div className=" text-green-600">Completed</div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className=" text-green-600"
            />
          </div>
          <div className=" text-[30px] text-center">11</div>
        </div>
        <div className=" w-[200px] h-[100px] bg-[#FAF8FC] p-5 rounded-[10px]">
            <div className="  flex items-center justify-between">
          <div className=" text-red-600">Target</div>
          <FontAwesomeIcon
              icon={faChevronRight}
              className=" text-red-600"
            />
            </div>
          <div className=" text-[30px] text-center">535,000</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
