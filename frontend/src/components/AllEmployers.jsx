import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import EmployeeInfo from "./Models/EmployeeInfo";
import { applyChangesUser, getPermUsers, registerPermenently } from "../services/authservice";
import { ToastContainer, toast } from "react-toastify";
const items = Array.from({ length: 25 }, (_, i) => i);
const AllEmployers = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(null);

  const applyChanges = async () => {
    const { message, error } = await applyChangesUser(user);
    if (!error) {
      toast.success(message);
    } else {
      toast.error("Update fail");
    }
    setOpen(false);
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      const itemHeight = 85;
      const availableHeight = window.innerHeight;
      const newItemsPerPage = Math.floor(availableHeight / itemHeight);
      setItemsPerPage(newItemsPerPage);
    };

    const getData = async () => {
      const data = await getPermUsers();
      console.log(data);
      setUsers(data);
    };

    getData();
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [applyChanges, registerPermenently]);

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
      <div className=" h-[760px] bg-slate-50 w-auto py-5 ">
        <div className="w-[100%] my-1 text-[20px] text-slate-600 mb-5 pl-5">
          Employers
        </div>
        <div className=" h-[630px]">
          <table className=" mx-10">
            <thead className="  text-slate-700 text-[14px]">
              <tr>
                <th className=" w-[120px] py-2">User id</th>
                <th className=" w-[120px]">Name</th>
                <th className=" w-[120px]">Email</th>
                <th className=" w-[120px]">Department</th>
              </tr>
            </thead>
            {!users ? (
              <>loading</>
            ) : (
              <tbody className=" text-[14px] text-slate-600">
                {users
                  .slice(startIndex, startIndex + itemsPerPage)
                  .map((item, i) => (
                    <>
                      <tr
                        className=" hover:bg-amber-500 cursor-pointer"
                        onClick={() => showHandle(item.userId)}
                        key={item.userId}
                      >
                        <td className=" text-center py-5">{item.userId}</td>
                        <td className=" text-center">{item.fullName}</td>
                        <td className=" text-center">{item.email}</td>
                        <td className=" text-center">
                          {item.corporateDetails.department}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            )}
          </table>
        </div>
        <div className=" flex m-auto w-[70px] justify-around">
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
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[80%]">
            <h2 className="text-xl font-bold">{`test user ${open}`} </h2>
            <EmployeeInfo
              userId={open}
              type="approval"
              user={user}
              setUser={setUser}
              setIsEdit={setIsEdit}
            />
            <div className="mt-4 flex justify-end gap-10">
              <button
                className={` text-white px-4 py-2 rounded ${
                  isEdit ? "bg-green-500" : "bg-slate-500 hidden"
                }`}
                onClick={applyChanges}
              >
                Edit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-black hover:font-white"
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
