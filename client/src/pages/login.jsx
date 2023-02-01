import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import serverAdress from "../serverAdress";
import { UserContext } from "../App";

function setCookie(name, value, expirationDate) {
   document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/;`;
}

function Login() {
   const { userContext, setNewUserContext, logOut, myAlert } = useContext(UserContext);
   const navigate = useNavigate();
   const [values, setValues] = useState({
      username: "",
      password: "",
   });

   useEffect(() => {
      if (userContext.userId) {
         navigate("/user");
      }
   }, []);

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
         // myAlert(res.message);
         setNewUserContext(res.id, res.user_type, res.city, res.state);
         setCookie("mainCookie", res.cookie, new Date(res.expDate));
         navigate("/user");
      } else {
         myAlert(res.message);
      }
   }

   function toRegstration() {
      navigate("/registration");
   }

   return (
      <div className="loginPage">
         <form className="loginForm" onSubmit={onSubmit}>
            <input
               className="loginInput"
               type="text"
               placeholder="username"
               onChange={onChange}
               name="username"
               value={values.username}
            />
            <input
               className="loginInput"
               type="password"
               placeholder="password"
               onChange={onChange}
               name="password"
               value={values.password}
            />
            <input
               className="loginSubmit"
               type="submit"
               value="login"
            />
            <button className="registrationButton" onClick={toRegstration}>Registration</button>
         </form>
      </div>
   );
}

export default Login;



















// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import serverAdress from "../serverAdress";
// import { UserContext } from "../App";

// function setCookie(name, value, expirationDate) {
//    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/;`;
// }

// function Login() {
//    const { userContext, setNewUserContext, logOut, myAlert } = useContext(UserContext);
//    const navigate = useNavigate();
//    const [values, setValues] = useState({
//       username: "",
//       password: "",
//    });

//    useEffect(() => {
//       if (userContext.userId) {
//          navigate("/user");
//       }
//    }, []);

//    function onChange(e) {
//       setValues((prev) => {
//          return {
//             ...prev,
//             [e.target.name]: e.target.value,
//          };
//       });
//    }

//    async function onSubmit(e) {
//       e.preventDefault();
//       let res = await fetch(`${serverAdress}/user_access/login`, {
//          method: "POST",
//          headers: { "Content-type": "application/json" },
//          body: JSON.stringify(values),
//       });
//       res = await res.json();
//       if (res.logged) {
//          // myAlert(res.message);
//          setNewUserContext(res.id, res.user_type, res.city, res.state);
//          setCookie("mainCookie", res.cookie, new Date(res.expDate));
//          navigate("/user");
//       } else {
//          myAlert(res.message);
//       }
//    }

//    function toRegstration() {
//       navigate("/registration");
//    }

//    return (
//       <div className="loginPage">
//          <form onSubmit={onSubmit}>
//             <input
//                type="text"
//                placeholder="username"
//                onChange={onChange}
//                name="username"
//                value={values.username}
//             />
//             <input
//                type="password"
//                placeholder="password"
//                onChange={onChange}
//                name="password"
//                value={values.password}
//             />
//             <input
//                type="submit"
//                value="login"
//             />
//          </form>
//          <button onClick={toRegstration}>Registration</button>
//       </div>
//    );
// }

// export default Login;
