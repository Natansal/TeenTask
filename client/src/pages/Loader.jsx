import React, { useState, useEffect } from "react";
import "../styles/loader.css";

function Loading() {
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      setTimeout(() => {
         setLoading((prev) => false);
      }, 5000);
      let timeout = setTimeout(() => {
         window.location.reload();
      }, 10000);
      return () => {
         clearTimeout(timeout);
      };
   }, []);
   return (
      <div id="loaderPage">
         <div className="pencil">
            <div className="pencil__ball-point"></div>
            <div className="pencil__cap"></div>
            <div className="pencil__cap-base"></div>
            <div className="pencil__middle"></div>
            <div className="pencil__eraser"></div>
         </div>
         <div className="line"></div>
         <h2> {loading ? "Page Loading...Please Wait" : "Connection error...."}</h2>
      </div>
   );
}

export default Loading;
