import { useContext } from "react";
import { UIContext } from "../contexts/UIContext";
import ProfitTable from "../components/profit/ProfitTable";

const Profit = () => {
  const { showNav, scrollOff } = useContext(UIContext);
  return (
    <div className=" flex flex-row gap-2 ">
      <div
        className={`duration-500 mt-[70px] w-[100%]  ${
          showNav ? "ml-[200px]" : "ml-[50px]"
        }`}
      >
        <ProfitTable />
      </div>
    </div>
  );
};

export default Profit;
