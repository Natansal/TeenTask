import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import serverAdress from "../serverAdress";
import { UserContext } from "../App";

function setCookie(name, value, expirationDate) {
   document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/;`;
}

function Registration() {
   const navigate = useNavigate();
   const { userContext, setNewUserContext } = useContext(UserContext);
   const [user_info, setUserInfo] = useState({
      first_name: "",
      last_name: "",
      user_type: 0,
      email: "",
      phone_number: "",
      birth_date: "",
      city: "",
      state: "",
      citizen_num: "",
   });
   const [user_access, setUserAccess] = useState({
      username: "",
      password: "",
   });

   function onChange(e) {
      if (e.target.name === "username" || e.target.name === "password") {
         return setUserAccess((prev) => {
            return {
               ...prev,
               [e.target.name]: e.target.value,
            };
         });
      }
      setUserInfo((prev) => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
   }

   async function onSubmit(e) {
      e.preventDefault();
      const regex = /^[0-9]{9}$/;
      const { phone_number, citizen_num } = user_info;
      console.log(regex.test(phone_number));
      if (!regex.test(phone_number) || !regex.test(citizen_num)) {
         return alert("Your phone number or citizen number are invalid, please try again.");
      }
      let res = await fetch(`${serverAdress}/user_access/register`, {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ user_access: user_access, user_info: user_info }),
      });
      res = await res.json();
      if (res.signed) {
         setCookie("mainCookie", res.cookie, new Date(res.expDate));
         setNewUserContext(res.userId, res.user_type, res.city, res.state);
         navigate("/user");
      }
      alert(res.message);
   }

   function tologIn() {
      navigate("/login");
   }

   return (
      <div className="registrationPage">
         <form onSubmit={onSubmit}>
            <input
               type="text"
               placeholder="username"
               onChange={onChange}
               name="username"
               value={user_access.username}
            />
            <input
               type="password"
               placeholder="password"
               onChange={onChange}
               name="password"
               value={user_access.password}
            />
            <input
               type="text"
               placeholder="First Name"
               onChange={onChange}
               name="first_name"
               value={user_info.first_name}
            />
            <input
               type="text"
               placeholder="Lase Name"
               onChange={onChange}
               name="last_name"
               value={user_info.last_name}
            />
            <select
               value={user_info.user_type}
               name="user_type"
               onChange={onChange}
            >
               <option value={0}>Employee</option>
               <option value={1}>Employer</option>
            </select>
            <input
               type="email"
               placeholder="Email"
               onChange={onChange}
               name="email"
               value={user_info.email}
            />
            <input
               type="text"
               placeholder="Phone Number"
               onChange={onChange}
               name="phone_number"
               value={user_info.phone_number}
            />
            <input
               type="date"
               placeholder="Birth Date"
               onChange={onChange}
               name="birth_date"
               value={user_info.birth_date}
            />
            <input
               type="text"
               placeholder="City"
               onChange={onChange}
               name="city"
               value={user_info.city}
            />
            <input
               type="text"
               placeholder="State"
               onChange={onChange}
               name="state"
               value={user_info.state}
            />
            <input
               type="text"
               placeholder="Citizen identification number"
               onChange={onChange}
               name="citizen_num"
               value={user_info.citizen_num}
            />
            <input
               type="submit"
               value="Register"
            />
         </form>
         <button onClick={tologIn}>Login</button>
      </div>
   );
}

export default Registration;
