import UserRegistration from "./UserRegistration";
import { useContext } from "react";
import PendingApproval from "./PendingApproval";
import SalesTeamForm from "../components/SalesTeamForm";
import GroupTour from "../components/Home/GroupTour";
import UserDetails from "../components/Home/UserDetails";
import { UIContext } from "../contexts/UIContext";
import ProtectedComponents from "../routes/ProtectedComponents";
import AllSales from "../components/Home/AllSales";
const Home = () => {
  const { showNav } = useContext(UIContext);

  return (
    <div className=" flex flex-row gap-2  ">
      <div
        className={`duration-500 mt-[70px] w-[100%] ${
          showNav ? "ml-[230px]" : "ml-[60px]"
        }`} 
      >
        <ProtectedComponents
          allowedRoles={["temperary"]}
          profileStatus={["init"]}
        >
          <UserRegistration />
        </ProtectedComponents>

        <ProtectedComponents
          allowedRoles={["temperary"]}
          profileStatus={["waiting"]}
        >
          <PendingApproval />
        </ProtectedComponents>

        <ProtectedComponents allowedRoles={["admin", "sales"]}>
          <div>
            <UserDetails />
          </div>
          <div className=" flex flex-row justify-between w-[90%] items-center m-auto">
            <SalesTeamForm />
            <GroupTour />
          </div>
          <div>
            <AllSales />
          </div>
        </ProtectedComponents>
      </div>
    </div>
  );
};

export default Home;
