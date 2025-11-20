import {
  faChartSimple,
  faChevronRight,
  faClipboardCheck,
  faClock,
  faDiagramPredecessor,
  faRocket,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { userStat } from "../../services/salesservices.js";
import LoadingModal from "../Models/LoadingModel";
import { AnimatePresence, motion } from "framer-motion";
import ShowStat from "../Models/ShowStat.jsx";

const UserDetails = () => {
  const [stat, setStat] = useState({});
  const [showStat, setShowStat] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const response = await userStat();
      console.log(response);
      const grouped = response.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {});

      setStat(grouped);
    };
    getData();
  }, []);
  const { user } = useContext(AuthContext);
  return (
    <div className=" mx-10 flex flex-row justify-between items-center mb-10">
      {stat ? (
        <div>
          <div className=" flex  items-center  justify-between mr-5 ">
            <div className="text-2xl font-semibold">Home</div>
            <div
              onClick={() => setShowStat(true)}
              className=" border-1 border-slate-500 px-2 rounded-sm cursor-pointer hover:bg-slate-500 hover:text-slate-100"
            >
              <FontAwesomeIcon icon={faChartSimple} />
            </div>
          </div>
          <div className=" flex flex-row items-center gap-3 text-[14px] font-semibold">
            <div className=" flex flex-row items-center gap-3 mt-5 text-[14px] font-semibold border-[1px] border-slate-300 py-2 px-5  rounded-lg">
              <FontAwesomeIcon icon={faClock} className=" text-blue-500" />
              <div>Pending</div>
              <div>{stat.pending ? stat.pending : 0}</div>
            </div>
            <div className=" flex flex-row items-center gap-3 mt-5 text-[14px] font-semibold border-[1px] border-slate-300 py-2 px-5  rounded-lg">
              <FontAwesomeIcon icon={faThumbsUp} className=" text-yellow-500" />
              <div>Approved</div>
              <div>{stat.approved ? stat.approved : 0}</div>
            </div>

            <div className=" flex flex-row items-center gap-3 mt-5 text-[14px] font-semibold border-[1px] border-slate-300 py-2 px-5  rounded-lg">
              <FontAwesomeIcon icon={faThumbsUp} className=" text-orange-500" />
              <div>Confirm</div>
              <div>{stat.confirm ? stat.confirm : 0}</div>
            </div>

            <div className=" flex flex-row items-center gap-3 mt-5 text-[14px] font-semibold border-[1px] border-slate-300 py-2 px-5  rounded-lg">
              <FontAwesomeIcon
                icon={faDiagramPredecessor}
                className=" text-blue-500"
              />
              <div>Processing</div>
              <div>{stat.approved ? stat.approved : 0}</div>
            </div>

            <div className=" flex flex-row items-center gap-3 mt-5 text-[14px] font-semibold border-[1px] border-slate-300 py-2 px-5  rounded-lg">
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className=" text-green-500"
              />
              <div>Completed</div>
              <div>{stat.completed ? stat.completed : 0}</div>
            </div>
            <div className=" flex flex-row items-center gap-3 mt-5 text-[14px] font-semibold border-[1px] border-slate-300 py-2 px-5  rounded-lg">
              <FontAwesomeIcon icon={faRocket} className=" text-gray-500" />
              <div>Total</div>
              <div>
                {stat.pending +
                  stat.completed +
                  stat.approved +
                  stat.confirm +
                  stat.approved}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingModal />
      )}
      <div className=" flex flex-row items-center gap-3 bg-[#1AB394] text-white pr-10 rounded-sm">
        <div className=" w-[100px] h-[100px] rounded-full">
          {user.attachments.employeeImage ? (
            <div className="w-[100px] h-[100px] flex items-center justify-center ">
              <img
                src={user.attachments.employeeImage}
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-full"
              />
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

      <AnimatePresence>
        {showStat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[222] bg-[#00000065] overflow-y-auto flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
              className="w-full max-w-[900px] mx-auto my-0"
            >
              <ShowStat showStat={showStat} setShowStat={setShowStat} stat={stat}/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDetails;
