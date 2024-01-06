import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if(word==="danger"){
      word="error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  // showing the alert if alert state is not null. 
  return (
    <div style={{ height: "50px" }}>
      {props.alert &&
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
      </div>}
    </div>
//   <div class="alert alert-dark" role="alert">
  //   A simple dark alert—check it out!
  // </div>
  );
}

export default Alert;
