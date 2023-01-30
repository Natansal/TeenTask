import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./pages/login";
import Registration from "./pages/registration";
import serverAdress, { serverKey } from "./serverAdress";
import { AES, enc } from "crypto-js";

function App() {
   const navigate = useNavigate();

   useEffect(() => {
      if (!document.cookie || document.cookie === "") {
         return navigate("/login");
      }
      const decrypted = AES.decrypt(document.cookie, serverKey).toString(enc.Utf8);
      fetch(`${serverAdress}/user_access/login`, {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ cookie: decrypted }),
      })
         .then((res) => res.json())
         .then((res) => {
            if (!res.logged) {
               return navigate("/login");
            }
         });
   }, []);

   return (
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
      </Routes>
   );
}

export default App;
