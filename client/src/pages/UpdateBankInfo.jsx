import React, { useContext, useState } from "react";
import serverAdress from "../serverAdress";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function UpdateBankInfo() {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      bank_account: "",
      card_type: "",
      card_num: "",
      exp_date: "",
      cvv: "",
   });
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState({});
   const { userContext, myAlert } = useContext(UserContext);

   const validate = () => {
      let newErrors = {};
      // Bank Account Number validation
      const bank_accountRegex = /^[0-9]+$/;
      if (!bank_accountRegex.test(values.bank_account)) {
         newErrors.bank_account = "Invalid Bank Account Number";
      }
      // Credit Card Type validation
      if (!values.card_type) {
         newErrors.card_type = "Credit Card Type is required";
      }

      // Card Number validation
      const card_numRegex = /^[0-9]{12,16}$/;
      if (!card_numRegex.test(values.card_num)) {
         newErrors.card_num = "Invalid Card Number";
      }

      // Expiration Date validation
      const exp_dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!exp_dateRegex.test(values.exp_date)) {
         newErrors.exp_date = "Invalid Expiration Date (MM/YY)";
      }

      // CVV validation
      const cvvRegex = /^[0-9]{3,4}$/;
      if (!cvvRegex.test(values.cvv)) {
         newErrors.cvv = "Invalid CVV";
      }

      // password validation
      if (!password || password === "") {
         newErrors.password = "Password is required";
      }

      return newErrors;
   };

   function handleSubmit(e) {
      e.preventDefault();
      const errors = validate();
      if (Object.keys(errors).length === 0) {
         let obj = { ...values };
         for (let key in obj) {
            if (obj[key] === "") {
               delete obj[key];
            }
         }
         fetch(`${serverAdress}/users/${userContext.userId}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ user_info: obj, password }),
         })
            .then((res) => res.json())
            .then((res) => myAlert(res.message))
            .then((res) => navigate("/user/updateBankInfo"));
      }
      setErrors(errors);
   }

   function handleChange(e) {
      const { name, value } = e.target;
      if (name === "password") {
         return setPassword(value);
      }
      setValues((prev) => {
         return {
            ...prev,
            [name]: value,
         };
      });
   }

   return (
      <div className="updatePage">
         <h1>Update your bank information</h1>
         <form onSubmit={handleSubmit}>
            <h4>
               *We will never send this data any where!<br />
               note that this is optional
            </h4>
            <label htmlFor="bank_account">Bank Account Number:</label>
            <input
               id="bank_account"
               name="bank_account"
               placeholder="123456789"
               type="text"
               value={values.bank_account}
               onChange={handleChange}
            />
            {errors.bank_account && <p style={{ color: "red" }}>{errors.bank_account}</p>}

            <label htmlFor="card_type">Credit Card Type:</label>
            <select
               name="card_type"
               id="card_type"
               value={values.card_type}
               onChange={handleChange}
            >
               <option value="">Select a Type</option>
               <option value="visa">Visa</option>
               <option value="mastercard">Mastercard</option>
               <option value="amex">American Express</option>
            </select>
            {errors.card_type && <p style={{ color: "red" }}>{errors.card_type}</p>}
            <label htmlFor="card_num">Card Number:</label>
            <input
               id="card_num"
               name="card_num"
               placeholder="12/16 digits"
               type="text"
               value={values.card_num}
               onChange={handleChange}
            />
            {errors.card_num && <p style={{ color: "red" }}>{errors.card_num}</p>}

            <label htmlFor="exp_date">Expiration Date:</label>
            <input
               id="exp_date"
               name="exp_date"
               placeholder="MM/YY"
               type="text"
               value={values.exp_date}
               onChange={handleChange}
            />
            {errors.exp_date && <p style={{ color: "red" }}>{errors.exp_date}</p>}

            <label htmlFor="cvv">CVV:</label>
            <input
               id="cvv"
               name="cvv"
               type="text"
               value={values.cvv}
               onChange={handleChange}
            />
            {errors.cvv && <p style={{ color: "red" }}>{errors.cvv}</p>}
            <label htmlFor="password">Password:</label>
            <input
               type="password"
               name="password"
               value={password}
               onChange={handleChange}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            <button type="submit">Submit</button>
         </form>
      </div>
   );
}

export default UpdateBankInfo;
