import React from 'react';

function Applicants(props){

    function accept(e){
        return
    }
    function reject(e){
        return
    }
    function showReview(e){
        return
    }
  return (
    <div>
      <p>Full Applicent Name: {props.firstName}{" "}{props.lastName}</p>
      <button onClick={showReview}>See {props.firstName} review</button>
      <button onClick={accept}>Accept</button>
      <button onClick={reject}>Reject</button>
    </div>
  );
};

export default Applicants;