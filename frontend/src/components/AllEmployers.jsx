import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import EmployeeInfo from "./Models/EmployeeInfo";
import { applyChangesUser, getPermUsers } from "../services/authservice";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
const items = Array.from({ length: 25 }, (_, i) => i);
const AllEmployers = ({ refresh, setRefresh, showNav }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [filterUser, setFilterUser] = useState(null);

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

  useEffect(() => {
    const updateItemsPerPage = () => {
      const itemHeight = 85;
      const availableHeight = window.innerHeight;
      const newItemsPerPage = Math.floor(availableHeight / itemHeight);
      setItemsPerPage(newItemsPerPage);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const value = e.target.value.trim();
    const result = await users.filter((u) => String(u.userId).includes(value));
    setFilterUser(result);
    console.log(result);
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
        className={` ${
          showNav ? "xl:w-[95%] w-[100%]" : "xl:w-auto w-[90%]"
        } h-[760px] bg-slate-50  py-5  rounded-[10px] my-2  shadow-lg shadow-black/25`}
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
        <div className=" h-[630px]">
          <table className=" xl:mx-10 mx-5 w-[90%]">
            <thead className="  text-slate-700 text-[14px]">
              <tr>
                <th className=" py-2">User id</th>
                <th className="w-[200px]">Name</th>
                <th className="">Email</th>
                <th className="">Department</th>
              </tr>
            </thead>
            {!filterUser ? (
              <div className="">
                <BeatLoader color="#50c5ff" loading={true} size={20} className=" text-center"/>
              </div>
            ) : (
              <tbody className=" text-[14px] text-slate-600">
                {filterUser
                  .slice(startIndex, startIndex + itemsPerPage)
                  .map((item, i) => (
                    <>
                      <tr
                        className=" hover:bg-[#ffb80338] cursor-pointer "
                        onClick={() => showHandle(item.userId)}
                        key={item.userId}
                      >
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
            )}
          </table>
        </div>
        <div className=" flex m-auto w-[70px] justify-around text-[#219ebc]">
          <div>
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              onClick={prevPage}
              className="cursor-pointer text-2xl"
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className=" cursor-pointer text-2xl"
              onClick={nextPage}
            />
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0  flex justify-center bg-[#ffffffd2] items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg  max-w-[1200px]">
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
          </div>
        </div>
      )}
    </>
  );
};

export default AllEmployers;
