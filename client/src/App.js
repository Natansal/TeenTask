import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, createContext } from "react";
import Login from "./pages/login";
import Registration from "./pages/registration";
import HomePage from "./pages/home";


export const UserContext = createContext()

function UserContextProvider({ children }) {
   const [userContext, setUserContext] = useState({})

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
