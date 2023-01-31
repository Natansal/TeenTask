import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";
import Applicants from "./applicants";

function Job(props) {
   const { userContext } = useContext(UserContext);
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
   } = props;

   const showApplicantsBtn = (e) => {
      let applicantsMap = [];
      // if (applicants.length === 0) {
      fetch(`${serverAdress}/jobs/${job_id}`, {
         method: 'GET',
         credentials: "include"
      })
         .then(response => response.json())
         .then(response => {
            for (let i = 0; i < response.length; i++) {
               applicantsMap.push({ firstName: response[i].first_name, lastName: response[i].last_name })
            }
            setApplicants(applicantsMap);
            setShowApplicants(prev => prev ? false : true);
         });
      // } else {
      // setShowApplicants(prev => prev ? false : true)
      // }

   }
   // useEffect({

   // }, [])
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
            <button onClick={showApplicantsBtn}>See all applicants </button>
         )}
         {showApplicants ? applicants.map((applicant) => <Applicants key={Math.random() * 1000} firstName={applicant.firstName} lastName={applicant.lastName} />) : null}
         {userContext.user_type != 1 && (
            <button onClick={() => handleClick(job_id)}>Apply to this job</button>
         )}
      </div>
   );
}

export default Job;
