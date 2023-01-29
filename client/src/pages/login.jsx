import React, { useState, useEffect } from "react";
import serverAdress from "../serverAdress";

function Login() {
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
      alert(res.message);
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
      </div>
   );
}

export default Login;
