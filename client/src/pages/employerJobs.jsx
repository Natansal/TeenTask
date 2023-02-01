import React, { useState, useEffect, useContext } from "react";
import Loading from "./Loader";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";
import Job from "../components/job";

function EmployerJobs({ done }) {
   const [jobs, setJobs] = useState();
   const { userContext, myAlert } = useContext(UserContext);
   const [num, setNum] = useState(0);
   useEffect(() => {
      fetch(`${serverAdress}/jobs?user_id=${userContext.userId}${done ? "&done=1" : "&done=0"}`, {
         method: "GET",
         credentials: "include",
      })
         .then((res) => res.json())
         .then((res) => {
            res = res.sort((a, b) => (a.city === userContext.city ? 1 : -1));
            setJobs(res);
         });
   }, [userContext, num, done]);

   if (!jobs) {
      return <Loading />;
   }

   function update() {
      setNum((prev) => prev + 1);
   }
   return (
      <div className="jobsPage">
         {jobs.map((job, index) => (
            <Job
               update={update}
               {...job}
               key={index}
            />
         ))}
      </div>
   );
}

export default EmployerJobs;
