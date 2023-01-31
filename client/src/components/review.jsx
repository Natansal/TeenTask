import React from "react";

const Review = ({ body, first_name, last_name }) => {
   const fullName = `${first_name} ${last_name}`;
   return (
      <div className="review">
         <h3 className="review-author">{fullName}</h3>
         <p className="review-body">{body}</p>
      </div>
   );
};

export default Review;
