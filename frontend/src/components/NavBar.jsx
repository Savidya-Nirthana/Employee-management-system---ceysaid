import { Link, useNavigate } from "react-router-dom";
import { getProfileImage, logOut } from "../services/authservice";
import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faPlane,
  faSignOut,
  faSortDesc,
  faUnlock,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ showNav, setShowNav }) => {
  const [, setIsLogin, user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [navDrop, setNavDrop] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);

    const getImage = async() => {
      const response = await getProfileImage();
      console.log(response);
      setImageUrl(response);
    }
    window.addEventListener("resize", handleResize);
    getImage();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logOutHandler = async () => {
    try {
      await logOut();
      setIsLogin(false);
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className=" ">
      {/* horizontal */}
      <div
        className={` absolute top-[10px] flex flex-row items-center justify-between bg-white ${
          showNav ? "left-[210px]" : "left-[60px] duration-500"
        }`}
        style={
          showNav
            ? { width: `${winWidth - 220}px` }
            : { width: `${winWidth - 70}px` }
        }
      >
        <div className=" flex flex-row items-center gap-2">
          <FontAwesomeIcon
            icon={faBars}
            size="1x"
            className=" text-slate-50  bg-[#262626] py-2 px-3 rounded-sm cursor-pointer"
            onClick={() => setShowNav(!showNav)}
          />
          <div className=" text-[13px]">HOME / EMPLOYERS</div>
        </div>
        <div>
          <div
            className=" flex flex-row items-center gap-2 mr-5 text-[14px] cursor-pointer hover: text-black"
            onClick={() => {
              setNavDrop(!navDrop);
            }}
          >
            
            {imageUrl ? <img src={imageUrl} alt="img" className="w-[35px] h-[35px] rounded-full"/>: <FontAwesomeIcon icon={faUser} />}
            <div>{user.userId}</div>
            <FontAwesomeIcon icon={faSortDesc} />
          </div>
          {navDrop && (
            <div className=" absolute right-0 bg-white rounded-sm w-[200px] flex flex-col items-center justify-center animate-fade-in z-1">
              <ul>
                <div className=" flex flex-row   mt-3 items-center gap-2 text-[14px] text-slate-600 hover:bg-slate-100 p-2 cursor-pointer">
                  <FontAwesomeIcon icon={faUser} />
                  <li className="">Your profile</li>
                </div>
                <div className=" flex flex-row   items-center gap-2 text-[14px] text-slate-600 hover:bg-slate-100 p-2 cursor-pointer">
                  <FontAwesomeIcon icon={faUnlock} />
                  <li className="">Change password</li>
                </div>
                <button
                  className=" cursor-pointer px-2 mb-3 w-[200px] bg-indigo-400 text-white py-2 rounded-b-md hover:bg-indigo-500"
                  onClick={() => logOutHandler()}
                >
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* vertical */}
      <div
        className={` h-[100vh] absolute ${
          showNav ? "w-[200px]" : "w-[50px]"
        } bg-[#262626] text-slate-50 duration-500`}
      >
        <ul className=" flex flex-col items-center gap-5 my-10">
          <Link to={"/dashboard"}>
            <div
              className={`flex flex-row ${
                showNav ? "w-[100px]" : "w-[20px]"
              } justify-start items-center gap-2 duration-500`}
            >
              <FontAwesomeIcon icon={faHouse} size="1x" className=" py-1" />
              {showNav && (
                <div className=" text-[14px] animate-fade-in">Home</div>
              )}
            </div>
          </Link>
          {user?.role === "admin" && (
            <Link to={"/dashboard/employers"}>
              <div
                className={` flex flex-row ${
                  showNav ? "w-[100px]" : "w-[20px]"
                } justify-start items-center gap-2 duration-500`}
              >
                <FontAwesomeIcon icon={faUsers} size="1x" className=" py-1" />
                {showNav && <div className=" animate-fade-in">Employers</div>}
              </div>
            </Link>
          )}

          <Link to={"/dashboard/leave"}>
            <div
              className={` flex flex-row ${
                showNav ? "w-[100px]" : "w-[20px]"
              } justify-start items-center gap-2 duration-500`}
            >
              <FontAwesomeIcon icon={faPlane} />
              {showNav && <div className=" animate-fade-in">Leave</div>}
            </div>
          </Link>

          <li
            className={` text-blue-500 cursor-pointer flex flex-row  justify-start items-center gap-2 duration-500 ${
              showNav ? "w-[100px]" : "w-[20px]"
            }`}
          >
            <FontAwesomeIcon
              icon={faSignOut}
              onClick={logOutHandler}
              className=" py-1"
            />
            {showNav && (
              <button onClick={logOutHandler} className=" animate-fade-in">
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
