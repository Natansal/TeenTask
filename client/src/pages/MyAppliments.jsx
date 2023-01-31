import React, { useState, useEffect, useContext } from "react";
import serverAdress from "../serverAdress";
import { UserContext } from "../App";
import Loading from "./Loader";
import Job from "../components/job";

function MyAppliments() {
   const { userContext } = useContext(UserContext);
   const [appliments, setAppliments] = useState();
   useEffect(() => {
      fetch(`${serverAdress}/jobs/*?user_id=${userContext.user_id}`, {
         method: "GET",
         credentials: "include",
      })
         .then((res) => res.json())
         .then((res) => setAppliments(res));
   }, [userContext]);

   if (!appliments) {
      return <Loading />;
   }

   return <div className="applimentsPage">
    {/* {appliments.map((job => ))} */}
   </div>;
}

export default MyAppliments;
