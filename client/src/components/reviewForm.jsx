import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import serverAdress from "../serverAdress";

function ReviewForm({ target_id }) {
   const { userContext, myAlert } = useContext(UserContext);
   const [formData, setFormData] = useState({
      body: "",
      stars: "",
   });

   const handleChange = (event) => {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      fetch(`${serverAdress}/reviews`, {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({
            user_id: userContext.userId,
            target_id,
            ...formData,
         }),
      })
         .then((res) => res.json())
         .then((res) => myAlert(res.message));
   };

   return (
      <div className="updatePage reviewForm">
         <form
            className="reviewForm"
            onSubmit={handleSubmit}
         >
            <textarea
               name="body"
               value={formData.body}
               onChange={handleChange}
               maxLength={255}
               cols={40}
               rows={6}
            />
            <span>{255 - formData.body.length} characters remaining</span>
            <select
               name="stars"
               value={formData.stars}
               onChange={handleChange}
            >
               <option value="">Select a rating</option>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
            </select>
            <button type="submit">Submit</button>
         </form>
      </div>
   );
}

export default ReviewForm;
