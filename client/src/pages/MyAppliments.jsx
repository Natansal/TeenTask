import React, { useState, useEffect, useContext } from "react";
import serverAdress from "../serverAdress";
import { UserContext } from "../App";
import Loading from "./Loader";
import Job from "../components/job";

function MyAppliments() {
   const { userContext } = useContext(UserContext);
   const [appliments, setAppliments] = useState();
   useEffect(() => {
      fetch(`${serverAdress}/jobs/*?user_id=${userContext.userId}`, {
         method: "GET",
         credentials: "include",
      })
         .then((res) => res.json())
         .then((res) => setAppliments(res));
   }, [userContext]);

   if (!appliments) {
      return <Loading />;
   }
   function handleDelete(job_id, eh_id) {
      fetch(`${serverAdress}/jobs/${job_id}/${eh_id}`, {
         method: "DELETE",
      })
         .then((res) => res.json())
         .then((res) => {
            alert(res.message);
            setAppliments((prev) => {
               let arr = [...prev];
               let index = arr.findIndex((val) => val.eh_id == eh_id);
               arr.splice(index, 1);
               return arr;
            });
         });
   }
   return (
      <div className="applimentsPage">
         {appliments.map((job) => (
            <Job
               {...job}
               appliedTo={true}
               handleClick={handleDelete}
            />
         ))}
      </div>
   );
}

export default MyAppliments;
