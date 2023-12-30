import React from "react";
import RemoveIcon from '@mui/icons-material/Remove';
function Note(props) { //props have the details of the current note like title description etc. passed by notelist component on creation of current note
  function handleClick() {
    props.onDelete(props.id);  {/*goes to app component and filter from notes array. We pass id of the current note here*/}
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <p className="date">{props.date}</p>
      <button onClick={handleClick}>
        <RemoveIcon />
      </button>
    </div>
  );
}

export default Note;
