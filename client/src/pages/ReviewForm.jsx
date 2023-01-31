import React, { useContext, useState } from "react";
import serverAdress from "../serverAdress";
import { UserContext } from "../App";

function ReviewForm({ target_id }) {
   const { userContext, myAlert } = useContext(UserContext);
   const [review, setReview] = useState({
      body: "",
      stars: "",
   });

   function handleChange(event) {
      setReview((prev) => {
         return {
            ...prev,
            [event.target.name]: event.target.value,
         };
      });
   }

   async function handleSubmit(event) {
      let res = await fetch(`${serverAdress}/reviews`, {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ ...review, user_id: userContext.userId, target_id }),
      });
      res = await res.json();
      myAlert(res.message);
   }

   return (
      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor="user_id">User ID:</label>
            <input
               type="number"
               name="user_id"
               value={review.user_id}
               onChange={handleChange}
            />
         </div>
         <div>
            <label htmlFor="starts">Stars:</label>
            <input
               type="number"
               name="starts"
               value={review.stars}
               onChange={handleChange}
            />
         </div>
         <button type="submit">Submit</button>
      </form>
   );
}

export default ReviewForm;
