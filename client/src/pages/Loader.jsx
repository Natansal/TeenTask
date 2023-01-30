import React, { useState, useEffect } from "react";
import "../styles/loader.css";

function Loading() {
   const []
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
         <h2>Page Loading...Please Wait</h2>
      </div>
   );
}

export default Loading;
