import React, { useState, useEffect, useContext } from "react";
import Loading from "./Loader";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";
import Job from "../components/job";

function Jobs() {
   const [jobs, setJobs] = useState();
   const { userContext, myAlert } = useContext(UserContext);

   useEffect(() => {
      fetch(`${serverAdress}/jobs?available=1&state=${userContext.state}`, {
         method: "GET",
         credentials: "include",
      })
         .then((res) => res.json())
         .then((res) => {
            res = res.sort((a, b) => (a.city === userContext.city ? 1 : -1));
            setJobs(res);
         });
   }, [userContext]);

   if (!jobs) {
      return <Loading />;
   }

   function handleClick(job_id) {
      if (!window.confirm("Do you want to aplly for this job?")) {
         return;
      }
      fetch(`${serverAdress}/jobs/${job_id}`, {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({
            user_id: userContext.userId,
         }),
      })
         .then((res) => res.json())
         .then((res) => myAlert(res.message));
   }
   return (
      <div>
         {jobs.map((job, index) => (
            <Job
               {...job}
               handleClick={handleClick}
               key={index}
            />
         ))}
      </div>
   );
}

export default Jobs;
