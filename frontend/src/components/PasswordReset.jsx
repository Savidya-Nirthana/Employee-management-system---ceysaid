import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { changePassword } from "../services/authservice";
const PasswordReset = () => {
  const [currentPassword, setcurrent] = useState("");
  const [newPassword, setnew] = useState("");
  const [confirmPassword, setconfirm] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [err, setError] = useState(null);

  const Handle_Submit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Password not match");
      setErrorShow(true);
      return;
    }
    const response = await changePassword(currentPassword, newPassword);
    if(!response.error) {
      toast.success(response.message);
    }
    else{
      toast.error(response.message);
    }
  };
  return (
    <div className=" bg-slate-50 shadow-lg shadow-black/25 rounded-lg py-4 px-5">
      <div>
        <ToastContainer />
      </div>
      <h2 className=" w-[100%] text-[20px] text-[#023047] font-semibold mb-5 pl-5">
        Change Password
      </h2>
      <form onSubmit={Handle_Submit} onMouseMove={() => setErrorShow(false)}>
        <table className="">
          <tr className=" ">
            <td className=" py-1">
              <label className=" text-slate-600 text-[14px]">
                Current Password{" "}
              </label>
              :
            </td>
            <td className=" py-2 pl-5">
              <input
                type="password"
                className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[250px]"
                onChange={(e) => {
                  setcurrent(e.target.value);
                }}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label className=" text-slate-600 text-[14px]">
                New Password{" "}
              </label>
              :
            </td>
            <td className=" py-2 pl-5">
              <input
                type="password"
                className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[250px]"
                onChange={(e) => {
                  setnew(e.target.value);
                }}
                required
              />
              {errorShow && (
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded-md shadow-md flex items-center space-x-2 animate-fade-in">
                    <span>{err}</span>
                  </div>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label className=" text-slate-600 text-[14px]">
                Confirm Password{" "}
              </label>
              :
            </td>
            <td className=" py-2 pl-5">
              <input
                type="password"
                className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[250px]"
                onChange={(e) => {
                  setconfirm(e.target.value);
                }}
                required
              />
            </td>
          </tr>
        </table>
        <div className="flex justify-end">
          <button
            type="submit"
            className=" bg-[#219ebc] text-white px-2 py-2 rounded-sm cursor-pointer text-[13px] mt-3"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
