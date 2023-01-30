import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App"
import serverAdress from "../serverAdress";



function HomePage() {
    const navigate = useNavigate()
    const { userContext } = useContext(UserContext)
    const [firstName, setFirstName] = useState();
    const getName = async () => {
        const res = await fetch(`${serverAdress}/users/${userContext.userId}/first_name`)
        const name = await res.json()
        return name[0].first_name;
    }
    useEffect(() => {
        getName().then(name => setFirstName(name));
    }, [userContext.userId])

    if (!firstName) {
        return <h1>Loading...</h1>
    }

    return (
        <h1>Hello {firstName}</h1>
    );
}

export default HomePage;
