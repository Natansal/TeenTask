import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serverAdress from "../serverAdress";




function HomePage() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
       username: "",
       password: "",
    });
 
 
    return (
        <h1>hello</h1>
    );
 }
 
 export default HomePage;
 