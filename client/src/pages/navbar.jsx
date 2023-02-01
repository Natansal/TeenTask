import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../App";

function Navbar() {
   const { logOut, userContext } = useContext(UserContext);
   return (
      <nav>
         <ul>
            <li>
               <NavLink to="/user/userInfo">User Info</NavLink>
            </li>
            <li>
               <NavLink to="/user/updatePage">Update Information Page</NavLink>
            </li>
            <li>
               <NavLink to="/user/updateBankInfo">Bank details update Page</NavLink>
            </li>
            {userContext.user_type != 0 && (
               <li>
                  <NavLink to="/user/createJobPage">Create a new Job</NavLink>
               </li>
            )}
            {userContext.user_type != 0 && (
               <li>
                  <NavLink to="/user/doneJobs">See all the jobs that have ended</NavLink>
               </li>
            )}
            {userContext.user_type != 0 && (
               <li>
                  <NavLink to="/user/pendingJobs">See all the jobs that are pending</NavLink>
               </li>
            )}
            {userContext.user_type != 1 && (
               <li>
                  <NavLink to="/user/jobs">See all available jobs</NavLink>
               </li>
            )}
            {userContext.user_type != 1 && (
               <li>
                  <NavLink to="/user/acceptedAppliments">See all accepted appliments</NavLink>
               </li>
            )}
            {userContext.user_type != 1 && (
               <li>
                  <NavLink to="/user/pendingAppliments">See Your pending appliments</NavLink>
               </li>
            )}
            <li>
               <a
                  href="#"
                  onClick={logOut}
               >
                  Logout
               </a>
            </li>
         </ul>
      </nav>
   );
}
export default Navbar;
