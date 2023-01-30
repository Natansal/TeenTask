import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect, createContext, Children } from "react";
import Login from "./pages/login";
import Registration from "./pages/registration";
import serverAdress, { serverKey } from "./serverAdress";
import { AES, enc } from "crypto-js";
import HomePage from "./pages/home";

export const UserContext = createContext();

function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) {
      return parts.pop().split(";").shift();
   } else {
      return "";
   }
}

function UserContextProvider({ children }) {
   const [userContext, setUserContext] = useState({});

   const setNewUserContext = (user_id, displayType) => {
      return setUserContext((prev) => {
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
      if (document.cookie === "") {
         navigate("/login");
      }
      let cookie = getCookie("mainCookie");
      fetch(`${serverAdress}/user_access/login`, {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ cookie: AES.decrypt(cookie, serverKey).toString(enc.Utf8) }),
      })
         .then((res) => res.json())
         .then((res) => {
            if (!res.logged) {
               return navigate("/login");
            }
            navigate("home");
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
               path="/home"
               element={<HomePage />}
            />
         </Routes>
      </UserContextProvider>
   );
}

export default App;
