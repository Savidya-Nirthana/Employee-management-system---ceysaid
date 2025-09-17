import AddGroupTours from "../components/Group/AddGroupTours";
import { useContext, useState } from "react";
import { UIContext } from "../contexts/UIContext";
import GroupTable from "../components/Group/groupTable";

const GroupTours = () => {
  const [refresh, setRefresh] = useState(false);
  const { showNav } = useContext(UIContext);
  return (
    <div
      className={`${
        showNav ? "ml-[250px]" : "ml-[50px]"
      }  flex flex-row duration-500`}
    >
      <div className=" mt-[60px] flex justify-around w-[100%] ">
        <AddGroupTours setRefresh={setRefresh} />
        <GroupTable refresh={refresh} />
      </div>
    </div>
  );
};

export default GroupTours;
