import React from "react";

function Job(props) {
   const { username, category, description, payment, start_date, end_date, payment_type } = props;
   return (
      <div className="job">
         <h1>From: {username}</h1>
         <h2>Category: {category}</h2>
         <h2>Description: {description}</h2>
         <h2>Payment: {payment}</h2>
         <h2>Start date: {new Date(start_date).toLocaleTimeString()}</h2>
         <h2>End date: {new Date(end_date).toLocaleTimeString()}</h2>
         <h2>Payment type: {payment_type}</h2>
      </div>
   );
}

export default Job;
