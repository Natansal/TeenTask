import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./pages/login";

function App() {
   const navigate = useNavigate();
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
      </Routes>
   );
}

export default App;
