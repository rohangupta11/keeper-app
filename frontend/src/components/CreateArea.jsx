import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
function CreateArea(props) { 
  const [note, setNote] = useState({ //state of our new note
    title: "",
    description: "",
    date:""
  });

  function handleChange(event) {
    const { name, value } = event.target; //name means event performed on title or description? value means text entered
    setNote((prevNote) => {
      return {
        ...prevNote, //we have previous title,description,date of our note. Suppose title is changed so we change title and keep the description,date same by this spread operator
        [name]: value //[] is used to differentiate b/w name as a new key value pair's key or [name] means the variable declared above
      };
    });
  }

  function submitNote(event) {
    if(note.title==="" && note.description==="" )props.showAlert("Cant add an empty note! Please add some description","danger");
    else if(note.title.length<3)props.showAlert("Title should be atleast 3 characters","danger");
    else if(note.description.length<5)props.showAlert("Description should be atleast 5 characters","danger");
    else{
      props.onAdd(note.title,note.description); //call goes to app component to add the new note in notes array. We pass our new note's title and description/
      setNote({ //createnote area becomes empty on submission of note
        title: "",
        description: "",
        date:""
      });
      event.preventDefault(); //default behaviour was to refresh the page on clicking +
    }
  }
  const [isExpanded, setExpand] = useState(false); //for animation effect. area is expanded on click of new notes area
  function expandArea() {
    setExpand(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? (
          <input //only dispayed if user clicked on createNote area
            name="title"
            onChange={handleChange} //when changing title of new note, handleChange updates note's state
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          name="description"
          onClick={expandArea} //for animation
          onChange={handleChange}
          value={note.description}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1} 
        />
        <Fab onClick={submitNote}> {/*hover effect of our plus button*/}
            <AddIcon />
        </Fab> {/*floating action button */}
      </form>
    </div>
  );
}

export default CreateArea; //default means when imported from this component to any other by the name xyz it wil still mean this createArea() function is called. eg import xyz from CreateArea
