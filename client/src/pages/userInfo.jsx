import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";
import Loading from "./Loader";

function UserInfo() {
    const navigate = useNavigate();
    const { userContext } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState();
    const getInfo = async () => {
        const res = await fetch(`${serverAdress}/users/${userContext.userId}/*`, {
            method: "GET",
            credentials: "include",
        });
        const info = await res.json();
        console.log("info",info);
        return info;
    };
    useEffect(() => {
        getInfo().then((info) => setUserInfo(info));
    }, [userContext.userId]);

    if (!userInfo) {
        return <Loading />;
    }

    return (
        <div>
            <h1>First name: {userInfo[0].first_name}</h1>
            <h1>Last name: {userInfo[0].last_name}</h1>
            <h1>Email: {userInfo[0].email}</h1>
            <h1>Phone number: {userInfo[0].phone_number}</h1>
            <h1>Birth date: {new Date(userInfo[0].birth_date).toLocaleDateString()}</h1>
            <h1>City: {userInfo[0].city}</h1>
            <h1>State: {userInfo[0].state}</h1>
            <h1>Creation of account date: {new Date(userInfo[0].creation_date).toLocaleDateString()}</h1>
            <h1>Bank account number: {userInfo[0].bank_account}</h1>
            {userContext.user_type != 0 && (
                <h1>Last 4 digits of credit card number: {"****" + userInfo[0].card_num.slice(-4)}</h1>
            )}
        </div>
    );
}

export default UserInfo;
