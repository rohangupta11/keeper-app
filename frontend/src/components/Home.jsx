import React,{useState} from 'react'
import NoteList from "./NoteList";
import CreateArea from "./CreateArea";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const Home = ({showAlert}) => {
    const host=process.env.REACT_APP_API_URL;
    const [notes, setNotes] = useState([]); //our notes array
    const [searchText, setSearchText] = useState(""); //state of search text
    let navigate=useNavigate();
    
    React.useEffect(()=>{
    if(localStorage.getItem("token")){
      getNotes()
    }
    else{
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
      if (response.ok) {   
        setNotes(json)
      }
      else {
        // console.log(json.error)
        showAlert("Please login again","danger")
        localStorage.removeItem("token")
        navigate("/login")
      }
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
    async function editNote(id,noteTitle,noteDescription){
      //API CALL
      try{
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT", 
                headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("token")
                },
                body: JSON.stringify({title:noteTitle,description:noteDescription}), 
            });
            getNotes();
            showAlert("Note updated successfully!","success");
        }
        catch(error){
            console.log(error)
        }
    }
    
    
  return (
    <div>
        <Search handleSearch={handleSearch} />{/*this prop gets called when user types on searchbox*/}
        <CreateArea onAdd={addNote} showAlert={showAlert} /> {/*when + is clicked, addNote adds the new note to notes array*/}
        <NoteList
            notes={notes.filter((noteItem) =>
            (noteItem.title.toLowerCase().includes(searchText) || noteItem.description.toLowerCase().includes(searchText))
            )} //filter from our notes to only show ones that have search text in them
            deleteNote={deleteNote} //passing to NoteList to Note component so that it can call it upon clicking of delete button, and we can modify notes array from here
            editNote={editNote}
        /> 
    </div>
  )
}

export default Home