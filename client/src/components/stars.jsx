import React from "react";

const StarDisplay = ({ stars }) => {
   const starArray = [];
   for (let i = 0; i < Math.floor(stars); i++) {
      starArray.push(<h3 key={i}>⭐</h3>);
   }
   starArray.push(<h3>{Math.floor(stars * 10) / 10}/5</h3>);
   console.log(starArray);
   return <div className="star-display">{starArray}</div>;
};

export default StarDisplay;
