import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import EmployeeInfo from "./Models/EmployeeInfo";
import { applyChangesUser, getPermUsers } from "../services/authservice";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { AnimatePresence, motion } from "framer-motion";
import ImageZoomModel from "./Models/ImageZoomModel";
const items = Array.from({ length: 25 }, (_, i) => i);
const AllEmployers = ({ refresh, setRefresh, showNav, open, setOpen }) => {
  const [itemsPerPage, setItemsPerPage] = useState(11);
  const [startIndex, setStartIndex] = useState(0);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [filterUser, setFilterUser] = useState(null);
  const [imageShow, setImageShow] = useState(false);
  const applyChanges = async () => {
    const { message, error } = await applyChangesUser(user);
    if (!error) {
      toast.success(message);
      setRefresh((prev) => !prev);
    } else {
      toast.error("Update fail");
    }
    setOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getPermUsers();
      setUsers(data);
      setFilterUser(data);
    };

    getData();
  }, [refresh]);

  // useEffect(() => {
  //   const updateItemsPerPage = () => {
  //     const itemHeight = 85;
  //     const availableHeight = window.innerHeight;
  //     const newItemsPerPage = Math.floor(availableHeight / itemHeight);
  //     setItemsPerPage(newItemsPerPage);
  //   };

  //   updateItemsPerPage();
  //   window.addEventListener("resize", updateItemsPerPage);
  //   return () => window.removeEventListener("resize", updateItemsPerPage);
  // }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const value = e.target.value.trim();
    const result = await users.filter((u) => String(u.userId).includes(value));
    setFilterUser(result);
  };

  const nextPage = () => {
    if (startIndex + itemsPerPage < items.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const showHandle = (e) => {
    setOpen(e);
  };
  return (
    <>
      <ToastContainer />
      <div
        className={` flex-1 w-[100%] ${
          showNav ? "" : "xl:w-auto "
        } min-w-[700px] 
          ${open ? "h-[0px]" : "h-[800px]"}
         bg-slate-50  py-5  rounded-[10px]  border border-slate-300`}
      >
        <div className="flex flex-row items-center justify-between w-[90%]  m-auto my-2">
          <div className="text-[20px] text-[#023047] font-semibold">
            Employers
          </div>
          <div>
            <input
              placeholder="Search Id"
              type="text"
              name=""
              id=""
              className=" border-[#023047] border-[1.5px] outline-none px-2 py-1 rounded-md text-[13px]"
              onChange={handleSearch}
            />
          </div>
        </div>
        {!filterUser ? (
          <div className=" flex items-center justify-center h-[700px]">
            <BeatLoader
              color="#50c5ff"
              loading={true}
              size={20}
              className=" text-center"
            />
          </div>
        ) : (
          <div className={` flex flex-col justify-between h-[650px] mt-5`}>
            <div className=" flex-grow">
              <table className=" xl:mx-10 mx-5 w-[90%]">
                <thead className="  text-slate-700 text-[14px]">
                  <tr>
                    <th></th>
                    <th className=" py-2">User id</th>
                    <th className="w-[200px]">Name</th>
                    <th className="">Email</th>
                    <th className="">Department</th>
                  </tr>
                </thead>

                <tbody className=" text-[14px] text-slate-600">
                  {filterUser
                    .slice(startIndex, startIndex + itemsPerPage)
                    .map((item, i) => (
                      <>
                        <tr
                          className=" hover:bg-slate-100 cursor-pointer "
                          onClick={() => showHandle(item.userId)}
                          key={i}
                        >
                          <td className=" px-4 m-auto z-10">
                            <div className=" w-[45px] h-[45px]  m-auto rounded-full overflow-hidden">
                              {item.attachments.employeeImage ? (
                                <img
                                  className=" w-full h-full object-cover"
                                  src={item.attachments.employeeImage}
                                  alt=""
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImageShow(
                                      item.attachments.employeeImage
                                    );
                                  }}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className=" text-[30px] text-[#219ebc] mt-2 ml-2"
                                />
                              )}
                            </div>
                          </td>
                          <td className=" text-center">{item.userId}</td>
                          <td className=" text-center">{item.fullName}</td>
                          <td className=" text-center p-3">{item.email}</td>
                          <td className=" flex flex-col items-center  justify-center p-2">
                            <div
                              className={` ${
                                item.corporateDetails.department === "accounts"
                                  ? "bg-[#2e8b563c] text-[#2E8B57] font-semibold"
                                  : item.corporateDetails.department === "sales"
                                  ? "bg-[#e67d224c] text-[#E67E22] font-semibold"
                                  : "bg-[#3498db44] text-[#3498DB] font-semibold"
                              } rounded-2xl  w-[100px] text-center py-[8px]`}
                            >
                              {item.corporateDetails.department}
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
            <div className=" flex m-auto w-[70px] justify-around text-[#219ebc] z-[0]">
              <button
                disabled={startIndex === 0}
                className=" disabled:opacity-50"
              >
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  onClick={prevPage}
                  className="cursor-pointer text-2xl"
                />
              </button>
              <button
                className="disabled:opacity-50"
                disabled={startIndex + itemsPerPage >= filterUser.length}
              >
                <FontAwesomeIcon
                  icon={faChevronCircleRight}
                  className=" cursor-pointer text-2xl"
                  onClick={nextPage}
                />
              </button>
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {imageShow && (
          <div className="fixed inset-0  flex justify-center bg-[#000000d2] py-20 overflow-y-scroll scroll-auto">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ImageZoomModel setIsOpen={setImageShow} imageUrl={imageShow} />
            </motion.div>
          </div>
        )}
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
                setIsEdit={setIsEdit}
              />
              <div className=" flex justify-end gap-10">
                <button
                  className={` text-white px-4 py-2 rounded ${
                    isEdit ? "bg-green-500" : "bg-slate-500 hidden"
                  }`}
                  onClick={applyChanges}
                >
                  Edit
                </button>
                <button
                  className="bg-[#219ebc] text-white px-4 py-2 rounded cursor-pointer hover:bg-black hover:font-white"
                  onClick={() => {
                    setOpen(false);
                    setIsEdit(false);
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AllEmployers;
