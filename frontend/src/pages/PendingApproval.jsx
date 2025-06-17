import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PendingApproval = () => {
  const { user, setIsLogin } = useContext(AuthContext);
  return (
    <div className=" w-[600px] flex-col justify-center items-center m-auto bg-slate-50 p-5 rounded-[10px] shadow-lg shadow-black/25 mt-20">
      <div className=" font-semibold border-b-[1px] border-slate-300 py-5">{user.userId}</div>
      <div className=" py-5">
        Your registration has been received! Your account is currently under
        review. You will receive a notification once an administrator approves
        your access. Thank you for your patience!
      </div>
      <div className=" w-[100%] flex items-end justify-end">
        <button className=" bg-[#219ebc] rounded-sm text-white px-2 py-2 text-[14px] mt-5 hover:bg-black cursor-pointer" onClick={() => setIsLogin(false)}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default PendingApproval;
