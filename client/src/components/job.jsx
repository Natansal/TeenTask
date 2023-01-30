import React from "react";

function Job(...props) {
   return (
      <div className="job">
         <h1>From: {username}</h1>
         <h2>Category: {category}</h2>
         <h2>Description: {description}</h2>
         <h2></h2>
      </div>
   );
}

export default Job;
