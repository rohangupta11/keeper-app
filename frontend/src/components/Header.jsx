import React from "react";
import NotesIcon from '@mui/icons-material/Notes';
import {NavLink,useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";

function Header({showAlert}) {
  const location=useLocation();
  const navigate=useNavigate();
  function handleLogout(){
    localStorage.removeItem("token");
    showAlert("Successfully logged out!","success");
    navigate("/login")
  }
  return (
    <header>
    <div className="d-flex">
      <h1 className="me-auto p-2">
        <NotesIcon /> Keeper
      </h1>
      {(!localStorage.getItem("token"))?<div className="mt-3">
        <NavLink to="/login" className="mx-2 btn btn-outline-success"  role="button" >Login</NavLink>
        <NavLink to="/signup" className="btn btn-outline-success"  role="button" >Sign Up</NavLink>
      </div>:<div className="mt-3"><button onClick={handleLogout} className="btn btn-outline-success">Logout</button></div>}
    </div>
    </header>
  );
}

export default Header;
