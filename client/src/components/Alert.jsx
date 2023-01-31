import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../styles/alert.css";
function Alert({ message, handleClick }) {
   if (!message) {
      return;
   }
   return (
      <>
         <div className="alert">
            <h1>{message}</h1>
            <button onClick={handleClick}>OK</button>
         </div>
      </>
   );
}

export default Alert;
