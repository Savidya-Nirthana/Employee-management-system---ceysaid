import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { UIProvider } from "../contexts/UIContext";
const DashLayout = () => {
  return (
    <UIProvider>
      <NavBar />
      <Outlet />
    </UIProvider>
  );
};

export default DashLayout;
