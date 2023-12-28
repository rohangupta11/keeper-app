import React from "react";
import Note from "./Note";
function NoteList({ notes, deleteNote }) { //for rendering all notes components
  return (
    <div>
      {notes.map((noteItem, index) => { //noteItem has details of ith node. index has index of ith node
        return (
          <Note //rending ith note one by one through map fnc
            key={index} 
            id={index} // id/index of our note
            title={noteItem.title}
            content={noteItem.content}
            date={noteItem.date}
            onDelete={deleteNote} //passing our delete fnc prop which exists in app, to note component so it that can call it there upon clicking of remove note button. two way passing
          />
        );
      })}
    </div>
  );
}
export default NoteList;
