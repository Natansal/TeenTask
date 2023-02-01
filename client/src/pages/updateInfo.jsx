import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import serverAdress from "../serverAdress";
import { UserContext } from "../App";

function UpdatePage() {
   const navigate = useNavigate();
   const { userContext, setNewUserContext, myAlert } = useContext(UserContext);
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
         return setPassword((prev) => (prev = e.target.value));
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
      let obj = { ...user_info };
      for (let key in obj) {
         if (obj[key] === "") {
            delete obj[key];
         }
      }
      const regex = /^[0-9]{9}$/;
      const { phone_number, citizen_num } = user_info;
      console.log(regex.test(phone_number));
      if (phone_number.length > 0 || citizen_num.length > 0) {
         if (!regex.test(phone_number) || !regex.test(citizen_num)) {
            return myAlert("Your phone number or citizen number are invalid, please try again.");
         }
      }

      let res = await fetch(`${serverAdress}/users/${userContext.userId}`, {
         method: "PUT",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ password, user_info: obj }),
      });
      res = await res.json();
      if (res.updated) {
         myAlert(res.message);
         setNewUserContext(
            res.user_id,
            user_info.user_type,
            user_info.city !== "" ? user_info.city : undefined,
            user_info.state !== "" ? user_info.state : undefined,
         );
         navigate("/user/userInfo");
      } else {
         myAlert(res.message);
      }
   }

   return (
      <div className="updatePage">
         <form onSubmit={onSubmit}>
            <input
               type="password"
               placeholder="password"
               onChange={onChange}
               name="password"
               value={password}
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
               <option value={""}>Select this option if you don't want to change</option>
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
