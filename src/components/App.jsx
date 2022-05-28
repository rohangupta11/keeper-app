import React, { useState } from "react";
import Header from "./Header";
import NoteList from "./NoteList";
import CreateArea from "./CreateArea";
import Search from "./Search";

function App() {
  const [notes, setNotes] = useState([]);

  //to render previously saved data
  React.useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("keeper-app-data"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  //to save and store changes
  React.useEffect(() => {
    localStorage.setItem("keeper-app-data", JSON.stringify(notes));
  }, [notes]);

  const [searchText, setSearchText] = useState("");
  function handleSearch(event) {
    setSearchText(event.target.value.toLowerCase());
  }

  function addNote(noteTitle, noteContent) {
    const currentDate = new Date();
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          title: noteTitle,
          content: noteContent,
          date:
            currentDate.toLocaleDateString() +
            " , " +
            currentDate.toLocaleTimeString(),
        },
      ];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div>
      <Header />
      <Search handleSearch={handleSearch} />
      <CreateArea onAdd={addNote} />
      <NoteList
        notes={notes.filter((noteItem) =>
          (noteItem.title.toLowerCase().includes(searchText) || noteItem.content.toLowerCase().includes(searchText))
        )}
        deleteNote={deleteNote}
      />
    </div>
  );
}

export default App;
