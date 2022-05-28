import React from "react";
import Note from "./Note";
function NoteList({ notes, deleteNote }) {
  return (
    <div>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            date={noteItem.date}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}
export default NoteList;
