import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";
import Login from "./pages/login";
import Registration from "./pages/registration";
import HomePage from "./pages/user";
import UserInfo from "./pages/userInfo";
import serverAdress from "./serverAdress";
import { useNavigate } from "react-router-dom";

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
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
   }
}

function UserContextProvider({ children }) {
   const [userContext, setUserContext] = useState({});

   const setNewUserContext = (user_id, displayType) => {
      return setUserContext((prev) => {
         console.log(userContext);
         return {
            ...prev,
            userId: user_id,
            display: displayType,
         };
      });
   };

   return <UserContext.Provider value={{ userContext, setNewUserContext }}>{children}</UserContext.Provider>;
}

function App() {
   const navigate = useNavigate();
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
            setNewUserContext(res.id, isMobilePhone());
            navigate("/user");
         });
   }, []);
   return (
      <UserContextProvider>
         <Routes>
            <Route
               index
               element={
                  <Navigate
                     replace
                     to="/login"
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
            </Route>
         </Routes>
      </UserContextProvider>
   );
}

export default App;
