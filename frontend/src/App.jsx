import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { useContext, useEffect } from "react";
import {
  getData,
  getPermRegUser,
  getTempUser,
} from "./services/authservice.js";
import Employers from "./pages/Employers.jsx";
import Home from "./pages/Home.jsx";
import Leave from "./pages/Leave.jsx";
import Passwords from "./pages/Passwords.jsx";
import Profile from "./pages/Profile.jsx";
import DashLayout from "./layouts/DashLayout.jsx";
import { AuthContext } from "./contexts/AuthContext.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";

function App() {
  const { user, setUser, isLogin, setIsLogin } = useContext(AuthContext);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getData();
        const { userId, role } = response.data.message.user;
        if (response.status === 200) {
          if (role !== "temperary") {
            const response2 = await getPermRegUser(userId);
            setUser(response2);
          } else {
            const response2 = await getTempUser(userId);
            setUser(response2.data.user);
          }
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (err) {
        console.error(err);
        setIsLogin(false);
      }
    };
    getUser();
  }, []);
  if (isLogin === null && user === null) return <>Loading ...</>;
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
      </Route>
      <Route
        path="/login"
        element={isLogin ? <Navigate to="/dashboard" /> : <Login />}
      />

      {isLogin ? (
        <Route path="/dashboard" element={<DashLayout />}>
          <Route index element={<Home />} />
          <Route
            path="employers"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <Employers />
              </ProtectedRoutes>
            }
          />
          <Route path="leave" element={<Leave />} />
          <Route path="password-reset" element={<Passwords />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
