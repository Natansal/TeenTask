import React, { useState, useEffect, useContext } from "react";
import serverAdress from "../serverAdress";
import { UserContext } from "../App";
import Loading from "./Loader";
import Job from "../components/job";

function MyAppliments({ accepted }) {
   const { userContext, myAlert } = useContext(UserContext);
   const [appliments, setAppliments] = useState();
   const [num, setNum] = useState(0);
   useEffect(() => {
      fetch(`${serverAdress}/jobs/*?user_id=${userContext.userId}&accepted=${accepted ? 1 : 0}`, {
         method: "GET",
         credentials: "include",
      })
         .then((res) => res.json())
         .then((res) => setAppliments(res));
   }, [userContext, accepted, num]);

   if (!appliments) {
      return <Loading />;
   }
   function update() {
      setNum(prev => prev + 1);
   }
   function handleDelete(job_id, eh_id) {
      fetch(`${serverAdress}/jobs/${job_id}/${eh_id}`, {
         method: "DELETE",
      })
         .then((res) => res.json())
         .then((res) => {
            myAlert(res.message);
            setAppliments((prev) => {
               let arr = [...prev];
               let index = arr.findIndex((val) => val.eh_id == eh_id);
               arr.splice(index, 1);
               return arr;
            });
         });
   }
   return (
      <div className="jobsPage">
         {appliments.map((job) => (
            <Job
               {...job}
               update={update}
               appliedTo={true}
               handleClick={handleDelete}
            />
         ))}
      </div>
   );
}

export default MyAppliments;
