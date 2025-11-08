import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSortDesc,
  faUnlock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logOutHandler from "./logoutHandler";
import { UIContext } from "../../contexts/UIContext";
import { AuthContext } from "../../contexts/AuthContext";
const Horizontal = () => {
  const { setIsLogin, user, setUser } = useContext(AuthContext);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [navDrop, setNavDrop] = useState(false);
  const { showNav, setShowNav } = useContext(UIContext);
  const navRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPageName = () => {
    const path = location.pathname.toLowerCase();
    if (path === "/dashboard" || path === "/dashboard/") return "HOME";
    if (path.includes("employers")) return "EMPLOYERS";
    if (path.includes("group")) return "GROUP TOURS";
    if (path.includes("leave")) return "LEAVE";
    if (path.includes("password-reset")) return "PASSWORD RESET";
    if (path.includes("profile")) return "PROFILE";
    return "DASHBOARD";
  };

  return (
    <div className="">
      <div
        className={` fixed top-[0px] flex flex-row items-center justify-between  bg-white border-[1px] border-slate-300 p-2 ${
          showNav ? "left-[200px]" : "left-[50px] duration-500"
        }`}
        style={
          showNav
            ? { width: `${winWidth - 220}px` }
            : { width: `${winWidth - 65}px` }
        }
      >
        <div className=" flex flex-row items-center gap-2">
          <FontAwesomeIcon
            icon={faBars}
            size="1x"
            className=" text-slate-50  bg-[#023047] py-2 px-3 rounded-sm cursor-pointer"
            onClick={() => setShowNav(!showNav)}
          />
          <div className=" text-[13px]">{getPageName()}</div>
        </div>
        <div>
          <div
            className=" flex flex-row items-center gap-2 mr-5 text-[14px] cursor-pointer hover: text-black"
            onClick={() => {
              setNavDrop(!navDrop);
            }}
          >
            {user.attachments?.employeeImage ? (
              <img
                src={user.attachments.employeeImage}
                alt="img"
                className="w-[35px] h-[35px] rounded-full"
              />
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
            <div>{user.userId}</div>
            <FontAwesomeIcon icon={faSortDesc} />
          </div>
          {navDrop && (
            <div
              ref={navRef}
              className=" absolute right-0 bg-white rounded-sm w-[200px] flex flex-col items-center justify-center animate-fade-in z-1"
            >
              <ul>
                {user?.role !== "temperary" && (
                  <>
                    <div className=" flex flex-row   mt-3 items-center gap-2 text-[14px] text-slate-600 hover:bg-slate-100 p-2 cursor-pointer">
                      <FontAwesomeIcon icon={faUser} />
                      <Link to={"/dashboard/profile"}>Your profile</Link>
                    </div>
                    <div className=" flex flex-row   items-center gap-2 text-[14px] text-slate-600 hover:bg-slate-100 p-2 cursor-pointer">
                      <FontAwesomeIcon icon={faUnlock} />
                      <Link to={"/dashboard/password-reset"}>
                        Change password
                      </Link>
                    </div>
                  </>
                )}
                <button
                  className={` ${
                    navDrop ? "mt-5" : ""
                  } cursor-pointer px-2  w-[200px] bg-[#219ebc] hover:bg-black text-white py-2 rounded-b-md `}
                  onClick={() => logOutHandler(setIsLogin, setUser)}
                >
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Horizontal;
