import React,{useState} from 'react'
import NoteList from "./NoteList";
import CreateArea from "./CreateArea";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const Home = ({showAlert}) => {
    const host="http://localhost:5000";
    const [notes, setNotes] = useState([]); //our notes array
    const [searchText, setSearchText] = useState(""); //state of search text
    let navigate=useNavigate();
    
    React.useEffect(()=>{
    if(localStorage.getItem("token")){
      getNotes()
    }
    else{
      console.log("Yes")
      navigate("/login")
    }
  },[])
  
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
          "auth-token":localStorage.getItem("token")
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
            "auth-token":localStorage.getItem("token")
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
            "auth-token":localStorage.getItem("token")
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
    //       "auth-token":localStorage.getItem("token")
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
    
    
  return (
    <div>
        <Search handleSearch={handleSearch} />{/*this prop gets called when user types on searchbox*/}
        <CreateArea onAdd={addNote} showAlert={showAlert} /> {/*when + is clicked, addNote adds the new note to notes array*/}
        <NoteList
            // notes={notes}
            notes={notes.filter((noteItem) =>
            (noteItem.title.toLowerCase().includes(searchText) || noteItem.description.toLowerCase().includes(searchText))
            )} //filter from our notes to only show ones that have search text in them
            deleteNote={deleteNote} //passing to NoteList to Note component so that it can call it upon clicking of delete button, and we can modify notes array from here
        /> 
    </div>
  )
}

export default Home