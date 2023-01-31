import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";
import Applicants from "./applicants";

function Job(props) {
   const { userContext, myAlert } = useContext(UserContext);
   const [applicants, setApplicants] = useState([]);
   const [showApplicants, setShowApplicants] = useState(false);

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

   const showApplicantsBtn = (bool) => {
      fetch(`${serverAdress}/jobs/${job_id}`, {
         method: "GET",
         credentials: "include",
      })
         .then((response) => response.json())
         .then((response) => {
            setApplicants(response);
            if (bool !== true) {
               setShowApplicants((prev) => (prev ? false : true));
            }
         });
   };
   function markPaid() {
      fetch(`${serverAdress}/jobs/${job_id}/${eh_id}`, {
         method: "PUT",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ paid: 1 }),
      })
         .then((res) => res.json())
         .then((res) => {
            myAlert(res.message);
         });
   }

   function deleteJob() {
      fetch(`${serverAdress}/jobs/${job_id}`, {
         method: "DELETE",
      })
         .then((res) => res.json())
         .then((res) => myAlert(res.message));
   }
   return (
      <div className="job">
         {userContext.user_type != 1 && <h1>From: {first_name + " " + last_name}</h1>}
         <h2>Category: {category}</h2>
         <h2>Description: {description}</h2>
         <h2>Payment: {payment}$</h2>
         <h2>Start date: {new Date(start_date).toLocaleString()}</h2>
         <h2>End date: {new Date(end_date).toLocaleString()}</h2>
         <h2>Payment type: {payment_type}</h2>
         <h2>Loaction: {`${city}, ${state}`}</h2>
         {accepted !== undefined && <h2>Status: {accepted === 1 ? "Accepted" : "Pending"}</h2>}
         {appliedTo !== undefined && accepted == 1 && <h2>Done: {done === 0 ? "Not yet" : "Yes"}</h2>}
         {userContext.user_type != 0 && (
            <>
               <button onClick={showApplicantsBtn}>See all applicants </button>
               {accepted == 0 && <button onClick={deleteJob}>Delete job</button>}
            </>
         )}
         {appliedTo !== undefined && accepted == 1 && done == 1 && <h2>Paid: {paid === 0 ? "Not yet" : "Yes"}</h2>}
         {appliedTo !== undefined && accepted == 1 && done == 1 && <button onClick={markPaid}>Mark as paid </button>}
         {userContext.user_type != 1 && (
            <button onClick={() => handleClick(job_id, eh_id)}>
               {appliedTo ? "Delete appliment to this job" : "Apply to this job"}
            </button>
         )}
         {showApplicants &&
            applicants.map((applicant, index) => (
               <Applicants
                  key={index}
                  {...applicant}
                  handleReject={showApplicantsBtn}
               />
            ))}
      </div>
   );
}

export default Job;
