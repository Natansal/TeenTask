import React, { useState } from "react";

const Form = () => {
   const [bankAccountNumber, setBankAccountNumber] = useState("");
   const [creditCardType, setCreditCardType] = useState("");
   const [cardNumber, setCardNumber] = useState("");
   const [expirationDate, setExpirationDate] = useState("");
   const [cvv, setCvv] = useState("");
   const [errors, setErrors] = useState({});

   const validate = () => {
      let newErrors = {};

      // Bank Account Number validation
      const bankAccountNumberRegex = /^[0-9]+$/;
      if (!bankAccountNumberRegex.test(bankAccountNumber)) {
         newErrors.bankAccountNumber = "Invalid Bank Account Number";
      }

      // Credit Card Type validation
      if (!creditCardType) {
         newErrors.creditCardType = "Credit Card Type is required";
      }

      // Card Number validation
      const cardNumberRegex = /^[0-9]+$/;
      if (!cardNumberRegex.test(cardNumber)) {
         newErrors.cardNumber = "Invalid Card Number";
      }

      // Expiration Date validation
      const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expirationDateRegex.test(expirationDate)) {
         newErrors.expirationDate = "Invalid Expiration Date (MM/YY)";
      }

      // CVV validation
      const cvvRegex = /^[0-9]{3,4}$/;
      if (!cvvRegex.test(cvv)) {
         newErrors.cvv = "Invalid CVV";
      }

      return newErrors;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const errors = validate();
      if (Object.keys(errors).length === 0) {
         // submit form
      } else {
         setErrors(errors);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <label htmlFor="bankAccountNumber">Bank Account Number:</label>
         <input
            id="bankAccountNumber"
            type="text"
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
         />
         {errors.bankAccountNumber && <p style={{ color: "red" }}>{errors.bankAccountNumber}</p>}

         <label htmlFor="creditCardType">Credit Card Type:</label>
         <select
            id="creditCardType"
            value={creditCardType}
            onChange={(e) => setCreditCardType(e.target.value)}
         >
            <option value="">Select a Type</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
         </select>
         {errors.creditCardType && <p style={{ color: "red" }}>{errors.creditCardType}</p>}
         <label htmlFor="cardNumber">Card Number:</label>
         <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
         />
         {errors.cardNumber && <p style={{ color: "red" }}>{errors.cardNumber}</p>}

         <label htmlFor="expirationDate">Expiration Date:</label>
         <input
            id="expirationDate"
            type="text"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
         />
         {errors.expirationDate && <p style={{ color: "red" }}>{errors.expirationDate}</p>}

         <label htmlFor="cvv">CVV:</label>
         <input
            id="cvv"
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
         />
         {errors.cvv && <p style={{ color: "red" }}>{errors.cvv}</p>}

         <button type="submit">Submit</button>
      </form>
   );
};

export default Form;
