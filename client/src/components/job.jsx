import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";

function Job(props) {
   const { userContext } = useContext(UserContext);
   const [applicants, setApplicants] = useState();

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
      appliedTo,
      eh_id,
      paid,
      done,
      accepted,
   } = props;

   const showApplicants = async (e) => {
      fetch(`${serverAdress}/jobs/${job_id}`, {
         method: "GET",
         credentials: "include",
      })
         .then((response) => response.json())
         .then((response) => console.log("res", response));
   };
   function markPaid() {
      fetch(`${serverAdress}/jobs/${job_id}/${eh_id}`, {
         method: "PUT",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ paid: 1 }),
      })
         .then((res) => res.json())
         .then((res) => {
            alert(res.message);
         });
   }
   return (
      <div className="job">
         {userContext.user_type != 1 && <h1>From: {first_name + " " + last_name}</h1>}
         <h2>Category: {category}</h2>
         <h2>Description: {description}</h2>
         <h2>Payment: {payment + "$"}</h2>
         <h2>Start date: {new Date(start_date).toLocaleString()}</h2>
         <h2>End date: {new Date(end_date).toLocaleString()}</h2>
         <h2>Payment type: {payment_type}</h2>
         <h2>Loaction: {`${city}, ${state}`}</h2>
         {appliedTo && <h2>Status: {accepted === 0 ? "Pending" : "Accepted"}</h2>}
         {appliedTo && accepted == 1 && <h2>Done: {done === 0 ? "Not yet" : "Yes"}</h2>}
         {appliedTo && accepted == 1 && done == 1 && <h2>Paid: {paid === 0 ? "Not yet" : "Yes"}</h2>}
         {userContext.user_type != 0 && <h2>Job proccess: Pending/Done </h2>}
         {userContext.user_type != 0 && <button onClick={showApplicants}>See all applicants </button>}
         {appliedTo && accepted == 1 && done == 1 && <button onClick={markPaid}>Mark as paid </button>}
         {userContext.user_type != 1 && (
            <button onClick={() => handleClick(job_id, eh_id)}>
               {appliedTo ? "Delete appliment to this job" : "Apply to this job"}
            </button>
         )}
      </div>
   );
}

export default Job;


// function markPaid() {
//    fetch(`${serverAdress}/jobs/${job_id}/${eh_id}`, {
//       method: "PUT",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({ paid: 1 }),
//    })
//       .then((res) => res.json())
//       .then((res) => {
//          alert(res.message);
//       });
// }