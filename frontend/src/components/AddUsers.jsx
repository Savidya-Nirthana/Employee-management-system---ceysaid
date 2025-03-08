import { useState, useEffect, useRef } from "react";
import { register } from "../services/authservice";
import { ToastContainer, toast } from "react-toastify";

const AddUsers = () => {
  useEffect(() => {
    const handleClickOutside = () => {
      setErr(null), setErrorShow(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  const [id, setId] = useState(null);
  const [corporateTitle, setCorporateTitle] = useState(null);
  const [dateJoined, setDateJoined] = useState(Date.now());
  const [department, setDepartment] = useState(null);
  const [employeeType, setEmployeeType] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [errorShow, setErrorShow] = useState(false);
  const [err, setErr] = useState(null);

  const formRef = useRef(null);

  const registerHandling = async (e) => {
    e.preventDefault();

    if (rePassword !== password) {
      setErr("Password not matched");
      setErrorShow(true);
      return;
    }

    const response = await register({
      userId: id,
      corporateTitle: corporateTitle,
      dateJoined: dateJoined,
      department: department,
      employeeType: employeeType,
      password: password,
    });

    if (response.status === 200) {
      toast.success(response.data.message);
      formRef.current.reset();
    } else {
      toast.error(response.response.data.message);
    }
  };
  return (
    <>
      <div className=" bg-slate-50 w-[600px] p-5">
        <ToastContainer />
        <div className=" w-[100%] my-1 text-[20px] text-slate-600">
          Add Employee
        </div>
        <form
          ref={formRef}
          className=" m-auto block w-[500px]"
          onSubmit={registerHandling}
        >
          <table>
            <tr>
              <td className=" w-[200px]">
                <label htmlFor="" className=" text-slate-600 text-[14px]">
                  ID:<span className=" text-red-500">*</span>
                </label>
              </td>
              <td className=" py-1">
                <input
                  className=" border-[1px] border-slate-300 outline-pink-400   p-[5px] text-slate-600  text-[13px] w-[250px]"
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  required
                />
              </td>
            </tr>

            <tr className="">
              <td>
                <label htmlFor="" className=" text-slate-600 text-[14px]">
                  Corporate title:{" "}
                </label>
              </td>
              <td className=" py-1">
                <input
                  type="text"
                  className=" border-[1px] border-slate-300 outline-pink-400 p-[5px] text-slate-600  text-[13px] w-[250px]"
                  name=""
                  id=""
                  onChange={(e) => setCorporateTitle(e.target.value)}
                />
              </td>
            </tr>

            <tr className="">
              <td>
                <label htmlFor="" className=" text-slate-600 text-[14px]">
                  Join date:<span className=" text-red-500">*</span>
                </label>
              </td>
              <td className=" py-1">
                <input
                  className=" w-[250px] text-slate-600 text-[14px] p-[5px] outline-pink-400 border-slate-300 border-[1px]"
                  type="date"
                  required
                  onChange={(e) => {
                    setDateJoined(e.target.value);
                  }}
                />
              </td>
            </tr>

            <tr className="">
              <td>
                <label htmlFor="" className=" text-slate-600 text-[14px]">
                  Department:{" "}
                </label>
              </td>
              <td className=" py-1">
                <select
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  name=""
                  id=""
                  className="text-slate-600 text-[14px] outline-pink-400 w-[250px] border-[1px] border-slate-300 p-[5px]"
                >
                  <option value="">Select department</option>
                  <option value="accounts">Accounts</option>
                  <option value="sales">Sales</option>
                  <option value="operation">Operation</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="emType" className=" text-slate-600 text-[14px]">
                  Employee type:<span className=" text-red-500">*</span>
                </label>
              </td>
              <td className=" py-1">
                <select
                  className=" w-[250px] text-slate-600 text-[14px] outline-pink-400 border-[1px] border-slate-300 p-[5px]"
                  id="emType"
                  required
                  onChange={(e) => {
                    setEmployeeType(e.target.value);
                  }}
                >
                  <option value="">Select employee type</option>
                  <option value="permenant">Permenant</option>
                  <option value="temporary">Temporary</option>
                  <option value="training">Training</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="" className=" text-slate-600 text-[14px]">
                  Password <span className=" text-red-500">*</span>
                </label>
              </td>
              <td className=" py-1">
                <input
                  className=" border-[1px] border-slate-300 outline-pink-400 p-[5px] text-slate-600  text-[13px] w-[250px] "
                  type="password"
                  name=""
                  id=""
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
                <label htmlFor="" className=" text-slate-600 text-[14px]">
                  Retype password <span className=" text-red-500">*</span>
                </label>
              </td>
              <td className=" py-1">
                <input
                  className=" border-[1px] border-slate-300 outline-pink-400 text-slate-600 p-[5px] w-[250px] text-[13px]"
                  type="password"
                  name=""
                  id=""
                  onChange={(e) => {
                    setRePassword(e.target.value);
                  }}
                  required
                />
              </td>
            </tr>
          </table>

          <div>
            <input
              className={` bg-indigo-400 rounded-sm text-white px-2 py-1 text-[14px] ml-[400px] mt-5 ${
                !id || !employeeType || !department || !password || !rePassword
                  ? " cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              type="submit"
              value="Create new user"
              disabled={
                !id || !department || !employeeType || !password || !rePassword
              }
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUsers;
