import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import StarDisplay from "./stars";
import serverAdress from "../serverAdress";
import Loading from "../pages/Loader";
import Review from "./review";

function Reviews({ user_id }) {
   const [reviews, setReviews] = useState();
   const { userContext } = useContext(UserContext);
   useEffect(() => {
      fetch(`${serverAdress}/reviews?target_id=${user_id}`, {
         method: "GET",
         credentials: "include",
      })
         .then((res) => res.json())
         .then((res) => {
            res = res.sort((b, a) => a.rev_id - b.rev_id);
            setReviews(res);
         });
   }, [userContext]);

   if (!reviews) {
      return <Loading />;
   }
   console.log(reviews);
   let avg = reviews.reduce((prev, cur) => prev + parseInt(cur.stars), 0) / reviews.length;
   return (
      <div className="reviews">
         <StarDisplay stars={avg} />
         {reviews.map((rev, index) => {
            if (index >= 5) {
               return;
            }
            return (
               <Review
                  {...rev}
                  key={index}
               />
            );
         })}
      </div>
   );
}

export default Reviews;
