import React from 'react';

function Applicants(props){

    function accept(e){
        return
    }
    function reject(e){
        return
    }
  return (
    <div>
      <p>First Name: {props.firstName}</p>
      <p>Last Name: {props.lastName}</p>
      <button onClick={accept}>Accept</button>
      <button onClick={reject}>Reject</button>
    </div>
  );
};

export default Applicants;