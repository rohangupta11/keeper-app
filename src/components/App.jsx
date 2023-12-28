import React, { useState } from "react"; //this React has babel which is compiler to compile our html inside the js to just browser understandable js
import Header from "./Header";
import NoteList from "./NoteList";
import CreateArea from "./CreateArea";
import Search from "./Search";

function App() {
  const [notes, setNotes] = useState([{title:"abc",content:"abcd"}]); //our notes array

  //to render previously saved data
  //use effect hook is that we are telling our app something to do after render. in our app, kisi bhi useState wali state me chng ata h to render fnc is called again and again(from index.js). 
  React.useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("keeper-app-data"));
  //When receiving data from a web server, the data is always a string.Parse the data with JSON.parse(), and the data becomes a JavaScript object.
  //localstorage allows you to access a Storage object which can be used to access the current origin's(origin=scheme(https) + domainName) local storage; the stored data is saved in key value pair across browser sessions.

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []); // [] means useeffect only gets called on first refresh of page

  //to save and store changes
  React.useEffect(() => {
    localStorage.setItem("keeper-app-data", JSON.stringify(notes));//data saved as a string
  }, [notes]); //[notes] means do action only when render fnc is called due to change in notes state

  const [searchText, setSearchText] = useState(""); //state of search text
  function handleSearch(event) { //when we type something on search box,this fnc gets called
    setSearchText(event.target.value.toLowerCase()); //sets search text state to lower case so that we can filter from tht text
  }
 //adding our newly created note to our notes list. gets called on click of add button
  function addNote(noteTitle, noteContent) { //we passed the new notes content, title from createNote component to our app
    const currentDate = new Date();
    setNotes((prevNotes) => { 
      return [
        ...prevNotes, //appending to prev notes. []=prevarray+new note object
        { //new notes details
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

  function deleteNote(id) {//this id is passed from the note component after click of delete button(the id of note to be deleted)
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => { //filtering from old notes array and removing the note who id matches with the id we want to delete.
        return index !== id; //index mean ith node in array. if !=id then keep the note
      });
    });
  }
  return (
    <div>
      <Header />
      <Search handleSearch={handleSearch} />{/*this prop gets called when user types on searchbox*/}
      <CreateArea onAdd={addNote} /> {/*when + is clicked, addNote adds the new note to notes array*/}
       <NoteList
        notes={notes.filter((noteItem) =>
          (noteItem.title.toLowerCase().includes(searchText) || noteItem.content.toLowerCase().includes(searchText))
        )} //filter from our notes to only show ones that have search text in them
        deleteNote={deleteNote} //passing to NoteList to Note component so that it can call it upon clicking of delete button, and we can modify notes array from here
      /> 
    </div>
  );
}

export default App;
