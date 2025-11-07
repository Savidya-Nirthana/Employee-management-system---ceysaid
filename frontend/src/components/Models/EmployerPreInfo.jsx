import { faCircleInfo, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import EmployeeInfo from "./EmployeeInfo";
import { getPermRegUser } from "../../services/authservice";
import { motion, AnimatePresence } from "framer-motion";

const EmployerPreInfo = ({ setShowEmployeeInfo, showEmployeeInfo }) => {
  const [open, setOpen] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    const getData = async () => {
      const data = await getPermRegUser(open);
      setUser(data);
      {
        console.log("ssadw" + user);
      }
    };
    getData();
  }, []);
  return (
    <div className=" bg-white relative">
      <div className=" bg-black text-white w-[210px] h-[30px] ">
        <div className=" text-center">{showEmployeeInfo.employeeName}</div>
      </div>
      <div className="relative w-[210px] h-[210px] rounded-full overflow-hidden shadow-lg border-4 border-white bg-gradient-to-tr from-blue-400 to-purple-500 hover:scale-105 transition-transform duration-300">
        {showEmployeeInfo.img ? (
          <img
            src={showEmployeeInfo?.img}
            alt="Employee"
            className="w-full h-full object-cover"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className=" w-[full] h-[full] object-cover"
          />
        )}
      </div>
      <div className=" h-[30px] flex justify-center items-center">
        <div className=" w-[50%] flex justify-center h-[25px] items-center cursor-pointer">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className=""
            onClick={() => setOpen(showEmployeeInfo.employeeId)}
          />
        </div>
        <button
          onClick={() => setShowEmployeeInfo(null)}
          className="w-[50%] text-red-500 font-bold cursor-pointer"
        >
          Close
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0  flex justify-center bg-[#ffffffd2] py-20 overflow-y-scroll scroll-auto">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white p-5 rounded-lg shadow-lg  max-w-[1200px] min-h-[768px]"
            >
              <h2 className="text-md font-bold">{`${open}`} </h2>
              <EmployeeInfo
                userId={open}
                type="approval"
                user={user}
                setUser={setUser}
              />
              <div className=" flex justify-end gap-10">
                <button
                  className="bg-[#219ebc] text-white px-4 py-2 rounded cursor-pointer hover:bg-black hover:font-white"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployerPreInfo;
