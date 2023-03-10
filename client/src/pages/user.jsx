import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./navbar";
import serverAdress from "../serverAdress";
import Loading from "./Loader";

function HomePage() {
   const navigate = useNavigate();
   const { userContext, logOut, myAlert } = useContext(UserContext);
   const [firstName, setFirstName] = useState();
   const getName = async () => {
      if (!userContext.userId) {
         return navigate("/login");
      }
      const res = await fetch(`${serverAdress}/users/${userContext.userId}/first_name`, {
         method: "GET",
         credentials: "include",
      });
      const name = await res.json();
      console.log(name);
      return name[0].first_name;
   };
   useEffect(() => {
      getName().then((name) => setFirstName(name));
   }, [userContext.userId]);
   if (!firstName) {
      return <Loading />;
   }

   return (
      <div className="homePage">
         <header className="header">
            <div className="logo"></div>
            <h1 id="teenTask">TeenTask</h1>
            <h1>Hello {firstName}</h1>
         </header>
         <Navbar />
         <div className="pageContainer">
            <Outlet />
         </div>
      </div>
   );
}

export default HomePage;
