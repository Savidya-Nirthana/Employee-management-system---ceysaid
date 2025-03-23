import Horizontal from "./Horizontal";
import Vertical from "./Vertical";

const NavBar = () => {
  return (
    <div className=" fixed">
      <Vertical/>
      <Horizontal/>
    </div>
  );
};

export default NavBar;
