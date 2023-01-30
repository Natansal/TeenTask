import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App"
import serverAdress from "../serverAdress";



function UserInfo() {
    const navigate = useNavigate()
    const { userContext } = useContext(UserContext)
    const [userInfo, setUserInfo] = useState();
    const getInfo = async () => {
        const res = await fetch(`${serverAdress}/users/${userContext.userId}/*`)
        const info = await res.json()
        // console.log(info);
        return info;
    }
    useEffect(() => {
        getInfo().then(info => setUserInfo(info));
    }, [userContext.userId])

    if (!userInfo) {
        return <h1>Loading...</h1>
    }
    

    return (
        <div>
            <h1>First name: {userInfo[0].first_name}</h1>
            <h1>Last name: {userInfo[0].last_name}</h1>
            <h1>Email: {userInfo[0].email}</h1>
            <h1>Phone number: {userInfo[0].phone_number}</h1>
            <h1>Birth date: {userInfo[0].birth_date}</h1>
            <h1>City: {userInfo[0].city}</h1>
            <h1>State: {userInfo[0].state}</h1>
            <h1>Creation of account date: {userInfo[0].creation_date}</h1>
        </div>
    );
}

export default UserInfo;
