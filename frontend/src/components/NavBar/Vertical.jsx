import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faHouse,
  faPeopleGroup,
  faPlane,
  faSignOut,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import logOutHandler from "./logoutHandler";
import { UIContext } from "../../contexts/UIContext";
import { AuthContext } from "../../contexts/AuthContext";
const Vertical = () => {
  const { showNav } = useContext(UIContext);
  const { setIsLogin, user, setUser } = useContext(AuthContext);

  return (
    <>
      <div
        className={` h-[100vh] fixed ${
          showNav ? "w-[200px]" : "w-[50px]"
        } bg-[#023047] text-slate-50 duration-500`}
      >
        <ul className=" flex flex-col items-center gap-5 my-10 ">
          <Link to={"/dashboard"} className="">
            <div
              className={`flex flex-row ${
                showNav ? "w-[150px]" : "w-[20px]"
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
                  showNav ? "w-[150px]" : "w-[20px]"
                } justify-start items-center gap-2 duration-500`}
              >
                <FontAwesomeIcon icon={faUsers} size="1x" className=" py-1" />
                {showNav && <div className=" animate-fade-in">Employers</div>}
              </div>
            </Link>
          )}

          {user?.role !== "sales" && (
            <Link to={"/dashboard/group"}>
              <div
                className={` flex flex-row ${
                  showNav ? "w-[150px]" : "w-[20px]"
                } justify-start items-center gap-2 duration-500`}
              >
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  size="1x"
                  className=" py-1"
                />
                {showNav && <div className=" animate-fade-in">Group tours</div>}
              </div>
            </Link>
          )}

          {user?.role === "temperary" ? null : (
            <Link to={"/dashboard/leave"}>
              <div
                className={` flex flex-row ${
                  showNav ? "w-[150px]" : "w-[20px]"
                } justify-start items-center gap-2 duration-500`}
              >
                <FontAwesomeIcon icon={faPlane} />
                {showNav && <div className=" animate-fade-in">Leave</div>}
              </div>
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to={"/dashboard/profit"}>
              <div
                className={` flex flex-row ${
                  showNav ? "w-[150px]" : "w-[20px]"
                } justify-start items-center gap-2 duration-500`}
              >
                <FontAwesomeIcon
                  icon={faDollarSign}
                  size="1x"
                  className=" py-1"
                />
                {showNav && <div className=" animate-fade-in">Group tours</div>}
              </div>
            </Link>
          )}

          <li
            className={` text-white  py-2  bg-[#023047] cursor-pointer flex flex-row   items-center gap-2 duration-500 absolute bottom-10 ${
              showNav
                ? "xl:w-[200px] w-[150px] px-2 justify-center "
                : "w-[50px] justify-center"
            }`}
            onClick={() => logOutHandler(setIsLogin, setUser)}
          >
            <FontAwesomeIcon
              icon={faSignOut}
              onClick={() => logOutHandler(setIsLogin, setUser)}
              className=" py-1"
            />
            {showNav && <button className=" animate-fade-in">Logout</button>}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Vertical;
