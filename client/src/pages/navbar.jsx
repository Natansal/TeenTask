import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../App";

function Navbar() {
<<<<<<< HEAD
   const { logOut } = useContext(UserContext);
   return (
      <nav>
         <ul>
            <li>
               <NavLink to="/user/userInfo">User Info</NavLink>
            </li>
            <li>
               <NavLink to="/user/updatePage">Update Page</NavLink>
            </li>
            <li>
               <NavLink to="/user/updateBankInfo">Bank details update Page</NavLink>
            </li>
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
=======
    const {logOut} = useContext(UserContext);
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/user/userInfo">User Info</NavLink>
                </li>
                <li>
                    <NavLink to="/user/updatePage">Update Page</NavLink>
                </li>
                <li>
                    <NavLink to="/user/createJobPage">Create a new Job</NavLink>
                </li>
                <li>
                    <a href="#" onClick={logOut}>
                        Logout
                    </a>
                </li>
            </ul>
        </nav>
    );
>>>>>>> bb6629071e60719884cfcc830674dbf049112a9f
}
export default Navbar;
