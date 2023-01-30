import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import serverAdress from "../serverAdress";
import { UserContext } from "../App";

function UpdatePage() {
    const navigate = useNavigate();
    const { userContext, setNewUserContext } = useContext(UserContext);
    const [user_info, setUserInfo] = useState({
        first_name: "",
        last_name: "",
        user_type: 0,
        email: "",
        phone_number: "",
        birth_date: "",
        city: "",
        state: "",
        citizen_num: "",
    });
    const [password, setPassword] = useState("");

    function onChange(e) {
        if (e.target.name === "password") {
            return setUserAccess((prev) => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value,
                };
            });
        }
        setUserInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        let res = await fetch(`${serverAdress}/users/${userContext.userId}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ password, user_info}),
        });
        res = await res.json();
        if (res.message) {
            navigate("/user/userInfo");
        }
        alert(res.message);
    }


    return (
        <div className="updatePage">
            <form onSubmit={onSubmit}>
                <input
                    type="password"
                    placeholder="password"
                    onChange={onChange}
                    name="password"
                    value={user_access.password}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={onChange}
                    name="first_name"
                    value={user_info.first_name}
                />
                <input
                    type="text"
                    placeholder="Lase Name"
                    onChange={onChange}
                    name="last_name"
                    value={user_info.last_name}
                />
                <select
                    value={user_info.user_type}
                    name="user_type"
                    onChange={onChange}
                >
                    <option value={0}>Employee</option>
                    <option value={1}>Employer</option>
                </select>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={onChange}
                    name="email"
                    value={user_info.email}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    onChange={onChange}
                    name="phone_number"
                    value={user_info.phone_number}
                />
                <input
                    type="date"
                    placeholder="Birth Date"
                    onChange={onChange}
                    name="birth_date"
                    value={user_info.birth_date}
                />
                <input
                    type="text"
                    placeholder="City"
                    onChange={onChange}
                    name="city"
                    value={user_info.city}
                />
                <input
                    type="text"
                    placeholder="State"
                    onChange={onChange}
                    name="state"
                    value={user_info.state}
                />
                <input
                    type="text"
                    placeholder="Citizen identification number"
                    onChange={onChange}
                    name="citizen_num"
                    value={user_info.citizen_num}
                />
                <input
                    type="submit"
                    value="update"
                />
            </form>
        </div>
    );
}

export default UpdatePage;
