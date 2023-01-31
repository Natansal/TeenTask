import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";
import Login from "./pages/login";
import Registration from "./pages/registration";
import HomePage from "./pages/user";
import UserInfo from "./pages/userInfo";
import UpdatePage from "./pages/updateInfo";
import CreateJob from "./pages/createJob";
import EmployerJobs from "./pages/employerJobs";
import serverAdress from "./serverAdress";
import { useNavigate } from "react-router-dom";
import UpdateBankInfo from "./pages/UpdateBankInfo";
import Jobs from "./pages/allJobs";
import MyAppliments from "./pages/MyAppliments";

export const UserContext = createContext();

function isMobilePhone() {
   return window.innerWidth <= 720;
}

function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) {
      let cookie = parts.pop().split(";").shift();
      return cookie;
   }
}

function clearAllCookies() {
   const cookies = document.cookie.split(";");

   for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
   }
}

function App() {
   const [userContext, setUserContext] = useState({});
   const navigate = useNavigate();

   const setNewUserContext = (
      user_id = userContext.userId,
      userType = userContext.user_type,
      city = userContext.city,
      state = userContext.state,
   ) => {
      return setUserContext((prev) => {
         return {
            ...prev,
            userId: user_id,
            user_type: userType,
            city,
            state,
         };
      });
   };

   useEffect(() => {
      let cookie = getCookie("mainCookie");
      if (document.cookie === "" || !cookie) {
         return navigate("/login");
      }
      fetch(`${serverAdress}/user_access/login`, {
         credentials: "include",
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            if (!res.logged) {
               alert(res.message);
               return navigate("/login");
            }
            setNewUserContext(res.id, res.user_type, res.city, res.state);
            navigate("/user");
         });
   }, []);

   function logOut() {
      if (!window.confirm("Are you sure you want to log out?")) {
         return;
      }
      clearAllCookies();
      setUserContext({});
      navigate("/login");
   }

   return (
      <UserContext.Provider value={{ userContext, setNewUserContext, logOut }}>
         <Routes>
            <Route
               index
               element={
                  <Navigate
                     replace
                     to={userContext.userId ? "/login" : "/user"}
                  />
               }
            />
            <Route
               path="/login"
               element={<Login />}
            />
            <Route
               path="/registration"
               element={<Registration />}
            />
            <Route
               path="/user"
               element={<HomePage />}
            >
               <Route
                  path="userInfo"
                  element={<UserInfo />}
               />
               <Route
                  path="updatePage"
                  element={<UpdatePage />}
               />
               <Route
                  path="createJobPage"
                  element={<CreateJob />}
               />
               <Route
                  path="updateBankInfo"
                  element={<UpdateBankInfo />}
               />
               <Route
                  path="jobs"
                  element={<Jobs />}
               />
               <Route
                  path="employerJobs"
                  element={<EmployerJobs />}
               />
               <Route
                  path="myAppliments"
                  element={<MyAppliments />}
               />
            </Route>
         </Routes>
      </UserContext.Provider>
   );
}

export default App;
