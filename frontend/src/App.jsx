import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import React, { useEffect, useState } from "react";
import { getData } from "./services/authservice.js";
import Employers from "./pages/Employers.jsx";
import Home from "./pages/Home.jsx";
import Leave from "./pages/Leave.jsx";
import Passwords from "./pages/Passwords.jsx";
import Profile from "./pages/Profile.jsx";

export const Context = React.createContext();

function App() {
  const [isLogin, setIsLogin] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getData();
        const { userId, role } = response.data.message.user;
        if (response.status === 200) {
          setUser({ userId: userId, role: role });
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
    <Context.Provider value={[isLogin, setIsLogin, user, setUser]}>
      <Routes>
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route path="/dashboard">
          <Route
            index
            element={isLogin ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="employers"
            element={isLogin ? <Employers /> : <Navigate to="/login" />}
          />
          <Route
            path="leave"
            element={isLogin ? <Leave /> : <Navigate to="/login" />}
          />
          <Route
            path="password-reset"
            element={isLogin ? <Passwords /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={isLogin ? <Profile /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </Context.Provider>
  );
}

export default App;
