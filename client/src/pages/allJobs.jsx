import React, { useState, useEffect, useContext } from "react";
import Loading from "./Loader";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";

function Jobs() {
   const [jobs, setJobs] = useState();
   const { userContext } = useContext(UserContext);
   useEffect(() => {
      fetch(`${serverAdress}/jobs?available=1`)
         .then((res) => res.json())
         .then((res) => setJobs(res));
   }, [userContext]);

   if (!jobs) {
      return <Loading />;
   }

   return (
    <div>
        {jobs.map((job) => {
            
        })}
    </div>
   )
}

export default Jobs;
