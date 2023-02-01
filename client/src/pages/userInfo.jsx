import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";
import Loading from "./Loader";

function UserInfo() {
   const navigate = useNavigate();
   const { userContext, myAlert } = useContext(UserContext);
   const [userInfo, setUserInfo] = useState();
   const getInfo = async () => {
      const res = await fetch(`${serverAdress}/users/${userContext.userId}/*`, {
         method: "GET",
         credentials: "include",
      });
      const info = await res.json();
      console.log("info", info);
      return info;
   };
   useEffect(() => {
      getInfo().then((info) => setUserInfo(info));
   }, [userContext.userId]);

   if (!userInfo) {
      return <Loading />;
   }

   return (
      <div className="infoPage">
         <h1>Your Personal info</h1>
         <h2>First name: {userInfo[0].first_name}</h2>
         <h2>Last name: {userInfo[0].last_name}</h2>
         <h2>Email: {userInfo[0].email}</h2>
         <h2>Phone number: {userInfo[0].phone_number}</h2>
         <h2>Birth date: {new Date(userInfo[0].birth_date).toLocaleDateString()}</h2>
         <h2>City: {userInfo[0].city}</h2>
         <h2>State: {userInfo[0].state}</h2>
         <h2>Bank account number: {userInfo[0].bank_account}</h2>
         {userContext.user_type != 0 && (
            <h2>Credit card number: {"****" + userInfo[0].card_num.slice(-4)}</h2>
         )}
         <h2>Account created on: {new Date(userInfo[0].creation_date).toLocaleDateString()}</h2>
      </div>
   );
}

export default UserInfo;
