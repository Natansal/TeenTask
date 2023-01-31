import React, { useState, useEffect, useContext } from "react";
import Loading from "./Loader";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";
import Job from "../components/job";

function EmployerJobs() {
   const [jobs, setJobs] = useState();
   const { userContext } = useContext(UserContext);
   useEffect(() => {
      fetch(`${serverAdress}/jobs/*?user_id=${userContext.userId}`, {
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
   return (
      <div>
         {jobs.map((job, index) => (
            <Job
               {...job}
               key={index}
            />
         ))}
      </div>
   );
}

export default EmployerJobs;
