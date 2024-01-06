import React, { useState } from "react";
import Note from "./Note";
function NoteList({ notes, deleteNote, editNote }) {
  //for rendering all notes components
  const [enote, seteNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
  });

  function handleModalChange(event) {
    const { name, value } = event.target; //name means event performed on title or description? value means text entered
    seteNote((prevNote) => {
      return {
        ...prevNote, //we have previous title,description,date of our note. Suppose title is changed so we change title and keep the description,date same by this spread operator
        [name]: value, //[] is used to differentiate b/w name as a new key value pair's key or [name] means the variable declared above
      };
    });
  }
  function setModalText(id, tit, desc) {
    seteNote({ id: id, etitle: tit, edescription: desc });
  }
  function handleUpdateNoteClick(e) { //update note is clicked
    editNote(enote.id, enote.etitle, enote.edescription);
    e.preventDefault();
  }
  return (
    <div>
       {/* modal for editing note */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
            </div>
            <div className="modal-body">
              <p>Title should be more than 3 characters.<br></br> Description should be more than 5 characters</p>
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={enote.etitle}
                    onChange={handleModalChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={enote.edescription}
                    onChange={handleModalChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success close"
                data-bs-dismiss="modal"
                onClick={handleUpdateNoteClick}
                disabled={enote.etitle.length<3 || enote.edescription.length<5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Your Notes</h3>
        {notes.length===0 &&
        <h6 className="text-center mt-5">
          No notes to display
        </h6>}
        {notes.map((noteItem, index) => {
          //noteItem has details of ith node. index has index of ith node
          return (
            <Note //rending ith note one by one through map fnc
              key={index}
              id={noteItem._id} // id of our note
              title={noteItem.title}
              description={noteItem.description}
              date={noteItem.date}
              setModal={setModalText}
              onDelete={deleteNote} //passing our delete fnc prop which exists in app, to note component so it that can call it there upon clicking of remove note button. two way passing
            />
          );
        })}
      </div>
    </div>
  );
}
export default NoteList;
