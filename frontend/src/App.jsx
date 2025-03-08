import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
// import UserRegistration from "./pages/userRegistration.jsx";
import React, { useEffect, useState } from "react";
import { getData } from "./services/authservice.js";
import Employers from "./pages/Employers.jsx";
import Home from "./pages/Home.jsx";
import Leave from "./pages/Leave.jsx";

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
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isLogin ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard/employers"
            element={isLogin ? <Employers /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isLogin ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard/leave"
            element={isLogin ? <Leave /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
