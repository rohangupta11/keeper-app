import React from "react";
import NotesIcon from '@mui/icons-material/Notes';
import {Link,useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";

function Header() {
  const location=useLocation();
  const navigate=useNavigate();
  function handleLogout(){
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <header>
    <div className="d-flex">
      <h1 className="me-auto p-2">
        <NotesIcon /> Keeper
      </h1>
      {!(location.pathname==="/")?<div className="mt-3"><Link to="/" className="mx-4 btn btn-outline-success"  role="button" >Home</Link></div>:<></>}
      {(!localStorage.getItem("token"))?<div className="mt-3">
        <Link to="/login" className="mx-2 btn btn-outline-success"  role="button" >Login</Link>
        <Link to="/signup" className="btn btn-outline-success"  role="button" >Sign Up</Link>
      </div>:<div className="mt-3"><button onClick={handleLogout} className="btn btn-outline-success">Logout</button></div>}
    </div>
    </header>
  );
}

export default Header;
