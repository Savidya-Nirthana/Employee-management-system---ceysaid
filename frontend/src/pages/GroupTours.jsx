import AddGroupTours from "../components/Group/AddGroupTours";
import { useContext } from "react";
import { UIContext } from "../contexts/UIContext";

const GroupTours = () => {
  const { showNav } = useContext(UIContext);
  return (
    <div
      className={`${showNav ? "ml-[250px]" : "ml-[100px]"}  flex flex-row duration-500`}
    >
      <div className=" mt-[60px]">
        <AddGroupTours/>
      </div>
    </div>
  );
};

export default GroupTours;
