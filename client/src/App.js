import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, createContext } from "react";
import Login from "./pages/login";
import Registration from "./pages/registration";
import HomePage from "./pages/home";

export const UserContext = createContext();

function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) {
      let cookie = parts.pop().split(";").shift();
      return AES.decrypt(cookie, serverKey).toString(enc.Utf8);
   }
}

function UserContextProvider({ children }) {
   const [userContext, setUserContext] = useState({});

   const setNewUserContext = (user_id, displayType) => {
      return setUserContext((prev) => {
         console.log(userContext);
         return {
            ...prev,
            userId: user_id, display: displayType
         }
      })
   }

   return (
      <UserContext.Provider value={{ userContext, setNewUserContext }}>
         {children}
      </UserContext.Provider>
   )
}

function App() {
   const navigate = useNavigate();
   useEffect(() => {
      let cookie = getCookie("mainCookie");
      console.log(cookie);
      if (document.cookie === "" || !cookie) {
         navigate("/login");
      }
      fetch(`${serverAdress}/user_access/login`, {
         method: "GET",
         headers: {
            Cookie: "mainCookie=" + cookie,
         },
      })
         .then((res) => res.json())
         .then((res) => {
            if (!res.logged) {
               alert(res.message);
               return navigate("/login");
            }
            navigate("/home");
         });
   }, []);
   return (
      <UserContextProvider>
         <Routes>
            <Route
               index
               element={
                  <Navigate
                     replace
                     to="/login"
                  />
               }
            />
            <Route
               path="/login"
               element={<Login />}
            />
            <Route
               path="/registration"
               element={<Registration />}
            />
            <Route
               path="/home"
               element={<HomePage />}
            />
         </Routes>
      </UserContextProvider>
   );
}

export default App;
