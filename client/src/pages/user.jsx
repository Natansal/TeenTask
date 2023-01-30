import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../App"
import serverAdress from "../serverAdress";



function HomePage() {
    const navigate = useNavigate()
    const { userContext } = useContext(UserContext)
    const [firstName, setFirstName] = useState();
    const getName = async () => {
        const res = await fetch(`${serverAdress}/users/${userContext.userId}/first_name`, {
            method: "GET",
            credentials: "include"
        })
        const name = await res.json()
        console.log(name);
        return name[0].first_name;
    }
    useEffect(() => {
        getName().then(name => setFirstName(name));
    }, [userContext.userId])

    const toTarget = (e) => {
        navigate(e.target.name)
    }
    if (!firstName) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>Hello {firstName}</h1>
            <button onClick={toTarget} name="/user/userInfo">User Information</button>
            {/* <button onClick={toTarget} name="/user/paymentInfo">User Payment Information</button> */}
            <Outlet />
        </div>
    );
}

export default HomePage;
