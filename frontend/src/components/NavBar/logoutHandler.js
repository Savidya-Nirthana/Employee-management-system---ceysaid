import { logOut } from "../../services/authservice";

const logOutHandler = async (setIsLogin, setUser) => {
  try {
    await logOut();
    setIsLogin(false);
    setUser(null);
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

export default logOutHandler;
