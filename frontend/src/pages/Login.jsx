import logo from "../assets/images/logo/company_logo.png";
import travel_img from "../assets/images/login/travel_girl.jpg";
import { useContext, useState } from "react";
import {
  getData,
  getPermRegUser,
  getTempUser,
  login,
} from "../services/authservice.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState(null);

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userId, password);
      if (response.status === 200) {
        let response2 = await getData();
        response2 = response2.data.message.user;
        if (response2.role !== "temperary") {
          const response3 = await getPermRegUser(response2.userId);
          setUser(response3);
        } else {
          const response3 = await getTempUser(response2.userId);
          setUser(response3.data.user);
        }
        setIsLogin(true);
        navigate("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className=" flex flex-col w-[100%] lg:h-[100vh] h-auto lg:flex-row overflow-hidden">
        <div className="  relative overflow-hidden bg-black lg:w-[50%] w-[100%] h-[100vh] lg:h-auto">
          <div className=" absolute z-10 text-white left-[10%] right-[10%] sm:text-5xl text-3xl text-center lg:top-[50%] top-[20%] translate-y-[-50%] costom-font">
            WELCOME TO CEYSAID HOLIDAYS PVT LTD
          </div>
          <img
            src={travel_img}
            alt="travel girl"
            className="absolute m-auto  duration-3200 ease-out opacity-60 scale-[150%] xl:scale-[100%] sm:h-auto h-[100vh]"
            id="imageLogin"
          />
        </div>
        <div className=" flex flex-col absolute top-[30%] lg:relative lg:top-0 items-center justify-center bg-slate-100 lg:w-[50%] w-[100%] lg:h-auto h-[400px] z-10 ">
          <div className="">
            <div className="mb-[10px]">
              <img src={logo} alt="ceysaid image" className="h-[50px]" />
            </div>
            <div className=" text-slate-600">
              Please sign with your credentials
            </div>
            <form onSubmit={loginHandle}>
              <div>
                <input
                  type="text"
                  placeholder="User ID"
                  className=" bg-white sm:w-[400px] w-[350px] py-[3px] px-[10px] my-[5px] h-[40px] border-slate-200 border-[1px] outline-pink-600 rounded-sm"
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className=" bg-white  sm:w-[400px] w-[350px] py-[3px] px-[10px] my-[5px] h-[40px] border-[1px] border-slate-200 outline-pink-600 rounded-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className=" text-white bg-pink-600 sm:w-[400px] w-[350px] my-[5px] h-[40px] text-[19px] font-bold hover:text-pink-600 hover:bg-white border-[1.5px] hover:border-pink-500 duration-200 cursor-pointer rounded-sm"
              />
            </form>
            <div>
              Lost password?{" "}
              <span className=" text-blue-700 underline">Click here!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
