import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../services/authservice";
import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faPlane,
  faSignOut,
  faSortDesc,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ showNav, setShowNav }) => {
  const [, setIsLogin, user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [navDrop, setNavDrop] = useState(false);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
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
            <FontAwesomeIcon icon={faUser} />
            <div>Test {user.username}</div>
            <FontAwesomeIcon icon={faSortDesc} />
          </div>
          {navDrop && (
            <div className=" absolute bg-white rounded-sm w-[120px] flex flex-col items-center justify-center animate-fade-in">
              <ul>
                <div className=" flex flex-row  mt-3 items-center gap-2 text-[14px] text-slate-600">
                  <FontAwesomeIcon icon={faUser} />
                  <li className="">Your profile</li>
                </div>
                <button className=" text-blue-700 cursor-pointer px-2 my-3">
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
          {user?.role === "admin" && <Link to={"/dashboard/employers"}>
            <div
              className={` flex flex-row ${
                showNav ? "w-[100px]" : "w-[20px]"
              } justify-start items-center gap-2 duration-500`}
            >
              <FontAwesomeIcon icon={faUsers} size="1x" className=" py-1" />
              {showNav && <div className=" animate-fade-in">Employers</div>}
            </div>
          </Link>}

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
