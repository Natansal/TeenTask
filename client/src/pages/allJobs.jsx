import React, { useState, useEffect, useContext } from "react";
import Loading from "./Loader";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";
import Job from "../components/job";

function Jobs() {
   const [jobs, setJobs] = useState();
   const { userContext } = useContext(UserContext);
   useEffect(() => {
      fetch(`${serverAdress}/jobs?available=1`, {
         method: "GET",
         credentials: "include",
      })
         .then((res) => res.json())
         .then((res) => setJobs(res));
   }, [userContext]);

   if (!jobs) {
      return <Loading />;
   }
   console.log(jobs);
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

export default Jobs;
