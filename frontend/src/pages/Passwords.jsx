import { useContext, useState } from "react";
import PasswordReset from "../components/PasswordReset";
import { UIContext } from "../contexts/UIContext";

const Passwords = () => {
    const {showNav, setShowNav} = useContext(UIContext);
  return (
    <div className=" flex flex-row gap-2">
      <div className={` mt-[70px] flex flex-row w-[100%] justify-start items-start ${showNav ? 'ml-[250px]' : 'ml-[60px]'} duration-500`}>
        <div>
          <PasswordReset />
        </div>
      </div>
    </div>
  );
};

export default Passwords;
