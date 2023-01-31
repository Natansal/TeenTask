import React, { useContext, useState, useEffect } from "react";
import serverAdress from "../serverAdress";
import Reviews from "./reviews";
import { UserContext } from "../App";
import ReviewForm from "./reviewForm";

function Applicants(props) {
   const [reviewsVis, setReviewsVis] = useState(false);
   const { myAlert } = useContext(UserContext);
   const [revFormVis, setRevFormVis] = useState(false);
   function openReviewForm(e) {
      setRevFormVis((prev) => !prev);
   }
   function accept(e) {
      fetch(`${serverAdress}/jobs/${props.job_id}/${props.eh_id}`, {
         method: "PUT",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ accepted: 1 }),
      })
         .then((res) => res.json())
         .then((res) => {
            fetch(`${serverAdress}/jobs/${props.job_id}/*?accepted=0`, {
               method: "DELETE",
               headers: { "Content-type": "application/json" },
               body: JSON.stringify({ available: 0 }),
            }).then((res) => props.handleReject(true));
            myAlert(res.message);
         });
      fetch(`${serverAdress}/jobs/${props.job_id}`, {
         method: "PUT",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ available: 0 }),
      });
   }
   function reject(e) {
      fetch(`${serverAdress}/jobs/${props.job_id}/${props.eh_id}`, {
         method: "DELETE",
      })
         .then((res) => res.json())
         .then((res) => {
            myAlert(res.message);
            props.handleReject(true);
         });
   }
   function showReview(e) {
      setReviewsVis((prev) => !prev);
   }
   return (
      <div>
         <h4>
            Full Applicent Name: {props.first_name} {props.last_name}
         </h4>
         <h4>
            {props.first_name}'s birth date: {new Date(props.birth_date).toDateString()}
         </h4>
         {props.accepted == 1 && (
            <>
               <h1>
                  You have accept {props.first_name} to be your employee!
                  <br />
                  Here is contact information
               </h1>
               <h4>
                  {props.first_name}'s email: {props.email}
               </h4>
               <h4>
                  {props.first_name}'s phone number: 0{props.phone_number}
               </h4>
            </>
         )}
         {props.accepted == 0 && (
            <>
               <button onClick={showReview}>See {props.first_name}'s review</button>
               <button onClick={accept}>Accept</button>
               <button onClick={reject}>Reject</button>
            </>
         )}
         {props.accepted == 1 && props.done == 1 && <button onClick={openReviewForm}>Write feedback</button>}
         {reviewsVis && <Reviews user_id={props.user_id} />}
         {revFormVis && <ReviewForm target_id={props.user_id} />}
      </div>
   );
}

export default Applicants;
