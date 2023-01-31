import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Datetime from "react-datetime";
import serverAdress from "../serverAdress";

function CreateJob() {
   const navigate = useNavigate();
   const { userContext } = useContext(UserContext);
   const [errors, setErrors] = useState({});
   const start_date = useRef();
   const end_date = useRef();
   const [formData, setFormData] = useState({
      description: "",
      category: "",
      payment: "",
      start_date: "",
      end_date: "",
      payment_type: "",
   });
   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((formData) => {
         return {
            ...formData,
            [name]: value,
         };
      });
   };
   const startDateTimeHandleChange = (date) => {
      setFormData((formData) => {
         return {
            ...formData,
            start_date: date,
         };
      });
   };
   const endDateTimeHandleChange = (date) => {
      setFormData((formData) => {
         return {
            ...formData,
            end_date: date,
         };
      });
   };
   const handleSubmit = (event) => {
      event.preventDefault();
      setErrors({});
      let newErrors = {};

      if (!formData.description) {
         newErrors.description = "Description is required";
      }

      if (!formData.category) {
         newErrors.category = "Category is required";
      }

      if (!formData.payment) {
         newErrors.payment = "Payment is required";
      } else if (isNaN(formData.payment)) {
         newErrors.payment = "Payment must be a number";
      }

      if (!formData.start_date) {
         newErrors.start_date = "Start date is required";
      }

      if (!formData.end_date) {
         newErrors.end_date = "End date is required";
      }

      if (!formData.payment_type) {
         newErrors.payment_type = "Payment type is required";
      }
      if (formData.start_date && new Date(formData.start_date).getTime() < new Date().getTime()) {
         newErrors.start_date = "Start date has already accured";
      }
      if (
         formData.end_date &&
         formData.start_date &&
         new Date(formData.start_date).getTime() > new Date(formData.end_date).getTime()
      ) {
         newErrors.end_date = "End date cannot be before the start date";
      }

      setErrors(newErrors);
      console.log(formData.start_date, formData.end_date);
      if (!Object.keys(newErrors).length) {
         fetch(`${serverAdress}/jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userContext.userId, ...formData }),
         })
            .then((res) => res.json())
            .then((answer) => alert(answer.message));
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor="description">Description:</label>
            <input
               type="text"
               id="description"
               name="description"
               value={formData.description}
               onChange={handleChange}
            />
            {errors.description && <p>{errors.description}</p>}
         </div>

         <div>
            <label htmlFor="category">Category:</label>
            <select
               id="category"
               name="category"
               value={formData.category}
               onChange={handleChange}
            >
               <option value="">-- Select --</option>
               <option value="Babysitting">Babysitting</option>
               <option value="Pet Care">Pet Care</option>
               <option value="Yard Work">Yard Work</option>
               <option value="House Cleaning">House Cleaning</option>
               <option value="Other">Other</option>
            </select>
            {errors.category && <p>{errors.category}</p>}
         </div>

         <div>
            <label htmlFor="payment">Payment:</label>
            <input
               type="text"
               id="payment"
               name="payment"
               value={formData.payment}
               onChange={handleChange}
            />
            {errors.payment && <p>{errors.payment}</p>}
         </div>
         <div>
            <label htmlFor="payment_type">Payment Type:</label>
            <select
               id="payment_type"
               name="payment_type"
               value={formData.payment_type}
               onChange={handleChange}
            >
               <option value="">-- Select --</option>
               <option value="Cash">Cash</option>
               <option value="Credit">Credit</option>
            </select>
            {errors.payment_type && <p>{errors.payment_type}</p>}
         </div>

         <div>
            <label htmlFor="start_date">Start Date:</label>
            <Datetime
               type="date"
               id="start_date"
               name="start_date"
               value={formData.start_date}
               onChange={startDateTimeHandleChange}
               ref={start_date}
            />
            {errors.start_date && <p>{errors.start_date}</p>}
         </div>

         <div>
            <label htmlFor="end_date">End Date:</label>
            <Datetime
               type="date"
               id="end_date"
               name="end_date"
               value={formData.end_date}
               onChange={endDateTimeHandleChange}
               ref={end_date}
            />
            {errors.end_date && <p>{errors.end_date}</p>}
         </div>

         <button type="submit">Submit</button>
      </form>
   );
}

export default CreateJob;
