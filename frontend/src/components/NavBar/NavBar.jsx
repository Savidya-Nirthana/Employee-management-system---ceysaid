import Horizontal from "./Horizontal";
import Vertical from "./Vertical";

const NavBar = () => {
  return (
    <div className=" fixed z-[1]">
      <Vertical/>
      <Horizontal/>
    </div>
  );
};

export default NavBar;
