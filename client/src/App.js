import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./pages/login";
import Registration from "./pages/registration";

function App() {
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
