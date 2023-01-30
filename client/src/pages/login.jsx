import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import serverAdress from "../serverAdress";
import { UserContext } from "../App";

function setCookie(name, value, expirationDate) {
   document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/;`;
}

function Login() {
   const { userContext, setNewUserContext } = useContext(UserContext);
   const navigate = useNavigate();
   const [values, setValues] = useState({
      username: "",
      password: "",
   });

   function onChange(e) {
      setValues((prev) => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
   }

   async function onSubmit(e) {
      e.preventDefault();
      let res = await fetch(`${serverAdress}/user_access/login`, {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify(values),
      });
      res = await res.json();
      if (res.logged) {
         alert(res.message);
         setNewUserContext(res.id, res.logged);
         setCookie("mainCookie", res.cookie, new Date(res.expDate));
         navigate("/user");
      }
   }

   function toRegstration() {
      navigate("/registration");
   }

   return (
      <div className="loginPage">
         <form onSubmit={onSubmit}>
            <input
               type="text"
               placeholder="username"
               onChange={onChange}
               name="username"
               value={values.username}
            />
            <input
               type="password"
               placeholder="password"
               onChange={onChange}
               name="password"
               value={values.password}
            />
            <input
               type="submit"
               value="login"
            />
         </form>
         <button onClick={toRegstration}>Registration</button>
      </div>
   );
}

export default Login;
