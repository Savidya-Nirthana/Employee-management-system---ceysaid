import { useState } from "react";
import NavBar from "../components/NavBar";
import PasswordReset from "../components/PasswordReset";

const Passwords = () => {
    const [showNav, setShowNav] = useState(true);
  return (
    <div className=" flex flex-row gap-2">
      <NavBar showNav={showNav} setShowNav={setShowNav}/>
      <div className={` mt-[70px] flex flex-row w-[100%] justify-start items-start ${showNav ? 'ml-[250px]' : 'ml-[60px]'} duration-500`}>
        <div>
          <PasswordReset />
        </div>
      </div>
    </div>
  );
};

export default Passwords;
