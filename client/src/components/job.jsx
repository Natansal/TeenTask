import React, { useContext } from "react";
import { UserContext } from "../App";

function Job(props) {
   const { userContext } = useContext(UserContext);
   const {
      first_name,
      last_name,
      category,
      description,
      payment,
      start_date,
      end_date,
      payment_type,
      city,
      state,
      handleClick,
      job_id,
   } = props;

   return (
      <div className="job">
         {userContext.user_type != 1 && (
         <h1>From: {first_name + " " + last_name}</h1>
         )}
         <h2>Category: {category}</h2>
         <h2>Description: {description}</h2>
         <h2>Payment: {payment + "$"}</h2>
         <h2>Start date: {new Date(start_date).toLocaleString()}</h2>
         <h2>End date: {new Date(end_date).toLocaleString()}</h2>
         <h2>Payment type: {payment_type}</h2>
         <h2>Loaction: {`${city}, ${state}`}</h2>
         {userContext.user_type != 0 && (
         <h2>Job proccess: Pending/Done </h2>
         )}
         {userContext.user_type != 0 && (
         <h2>Employee Name: Daniel</h2>
         )}
         {userContext.user_type != 1 && (
            <button onClick={() => handleClick(job_id)}>Apply to this job</button>
         )}
      </div>
   );
}

export default Job;
