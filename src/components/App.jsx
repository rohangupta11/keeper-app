import React, { useState } from "react"; //this React has babel which is compiler to compile our html inside the js to just browser understandable js
import Header from "./Header";
import NoteList from "./NoteList";
import CreateArea from "./CreateArea";
import Search from "./Search";
import { HashRouter as Router, Routes as Switch,Route } from "react-router-dom";
import Login from "./Login"
import Signup from "./Signup"
import Alert from "./Alert"

const host="http://localhost:5000";
function App() {
  const [alert,setAlert]=useState(null);
  const [notes, setNotes] = useState([]); //our notes array

 React.useEffect(()=>{
  getNotes()
 },[]);
// React.useEffect(()=>{
//   if(localStorage.getItem("token")){
//     getNotes();
//   }
//   else{
//     navigate("/login")
//   }
// })

  const [searchText, setSearchText] = useState(""); //state of search text
  function handleSearch(event) { //when we type something on search box,this fnc gets called
    setSearchText(event.target.value.toLowerCase()); //sets search text state to lower case so that we can filter from tht text
  }

//get all notes
const getNotes=async()=>{
  try{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5MDA2NzE5ODJiMWZmZDI2ZGZmNzVkIn0sImlhdCI6MTcwMzkzNzcxNn0.ISMTXzvfKYayIi8ZZ5Kle7D2_JcubnoIsN2tsE7LJ8A"
      }
    });
    const json=await response.json();
    setNotes(json)
  }
  catch(err){console.log(err)};
}

 //adding our newly created note to our notes list. gets called on click of add button
  async function addNote(title, description) { //we passed the new notes Description, title from createNote component to our app
    try{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5MDA2NzE5ODJiMWZmZDI2ZGZmNzVkIn0sImlhdCI6MTcwMzkzNzcxNn0.ISMTXzvfKYayIi8ZZ5Kle7D2_JcubnoIsN2tsE7LJ8A"
        },
        body: JSON.stringify({title,description}),
      });
      const note=await response.json();
      // console.log(note);
      setNotes(notes.concat(note));
      showAlert("Note added successfully!","success");
    }
    catch(error)
    {
      console.log(error);
    }
  }

  async function deleteNote(id) {//this id is passed from the note component after click of delete button(the id of note to be deleted)
    try{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5MDA2NzE5ODJiMWZmZDI2ZGZmNzVkIn0sImlhdCI6MTcwMzkzNzcxNn0.ISMTXzvfKYayIi8ZZ5Kle7D2_JcubnoIsN2tsE7LJ8A"
        }
      });
      setNotes((prevNotes) => {
        return prevNotes.filter((noteItem) => { //filtering from old notes array and removing the note who id matches with the id we want to delete.
          return noteItem._id !== id; //index mean ith node in array. if !=id then keep the note
        });
      });
      showAlert("Note deleted successfully!","success");
    }
    catch(err){
      console.log(err)
    }
  }

  //EDIT NOTE
  // async function editNote(id,noteTitle,noteDescription){
  //   //API CALL
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //     method: "POST", 
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5MDA2NzE5ODJiMWZmZDI2ZGZmNzVkIn0sImlhdCI6MTcwMzkzNzcxNn0.ISMTXzvfKYayIi8ZZ5Kle7D2_JcubnoIsN2tsE7LJ8A"
  //     },
  //     body: JSON.stringify(noteTitle,noteDescription), 
  //   });
  //   const json=response.json();
  //   for(let index=0;index<notes.length;index++)
  //   {
  //     const idx=notes.findIndex((note)=>note._id===id);
  //     if(idx>-1)
  //     {
  //       notes[idx].title=noteTitle,
  //       notes[idx].description=noteDescription
  //     }
  //   }
  // }
  
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }

  return (
    <div>
      <Router>
        <Header />
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/" element={<>
            <Search handleSearch={handleSearch} />{/*this prop gets called when user types on searchbox*/}
            <CreateArea onAdd={addNote} showAlert={showAlert} /> {/*when + is clicked, addNote adds the new note to notes array*/}
            <NoteList
                // notes={notes}
              notes={notes.filter((noteItem) =>
                (noteItem.title.toLowerCase().includes(searchText) || noteItem.description.toLowerCase().includes(searchText))
              )} //filter from our notes to only show ones that have search text in them
              deleteNote={deleteNote} //passing to NoteList to Note component so that it can call it upon clicking of delete button, and we can modify notes array from here
            /> 
          </>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
