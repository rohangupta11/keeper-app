import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
function Note(props) { //props have the details of the current note like title description etc. passed by notelist component on creation of current note
  function handleDeleteClick() {
    props.onDelete(props.id);  {/*goes to home component and filter from notes array. We pass id of the current note here*/}
  }
  function handleEditClick() {
    props.setModal(props.id,props.title,props.description);
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <div className="d-flex flex-row-reverse">
        <button onClick={handleDeleteClick}>
          <DeleteIcon />
        </button>
        <button className="mx-1" data-bs-toggle="modal"
          data-bs-target="#exampleModal" onClick={handleEditClick}> 
          <EditIcon />
        </button>
        <p className="date me-auto">{props.date}</p>
      </div>
    </div>
  );
}

export default Note;
