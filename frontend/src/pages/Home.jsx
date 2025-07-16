import UserRegistration from "./UserRegistration";
import { useContext, useState } from "react";
import PendingApproval from "./PendingApproval";
import SalesTeamForm from "../components/Home/SalesTeamForm";
import GroupTour from "../components/Home/GroupTour";
import UserDetails from "../components/Home/UserDetails";
import { UIContext } from "../contexts/UIContext";
import ProtectedComponents from "../routes/ProtectedComponents";
import AllSales from "../components/Home/AllSales";
import PendingSales from "../components/Home/PendingSales";
import SalesApproval from "../components/Home/SalesApproval";
import OperationnApproval from "../components/Home/OperationApproval";
const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const { showNav, scrollOff } = useContext(UIContext);

  return (
    <div className=" flex flex-row gap-2 mx-2">
      <div
        className={`duration-500 mt-[70px] w-[100%]  ${
          showNav ? "ml-[200px]" : "ml-[50px]"
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

        <ProtectedComponents allowedRoles={["sales", "admin"]}>
          <div>
            <UserDetails />
          </div>
          <div className=" flex flex-row justify-around  items-stretch m-auto">
            <SalesTeamForm setRefresh={setRefresh} />
            <GroupTour />
          </div>
          <div>
            <SalesApproval />
            <AllSales refresh={refresh} />
          </div>
        </ProtectedComponents>

        <ProtectedComponents allowedRoles={["accounts"]}>
          <div>
            <UserDetails />
          </div>
          <div className=" flex flex-row justify-around  items-stretch m-auto">
            <PendingSales />
            <GroupTour />
          </div>
          <OperationnApproval />
        </ProtectedComponents>
      </div>
    </div>
  );
};

export default Home;
