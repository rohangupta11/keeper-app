import React from "react";
import NotesIcon from '@mui/icons-material/Notes';
import {Link} from "react-router-dom"

function Header({getNotes}) {
  return (
    <header>
    <div className="d-flex">
      <h1 className="me-auto p-2">
        <NotesIcon /> Keeper
      </h1>
      <Link to="/" className="mx-4 btn btn-outline-success"  role="button" >Home</Link>
      <Link to="/login" className="mx-2 btn btn-outline-success"  role="button" >Login</Link>
      <Link to="/signup" className="btn btn-outline-success"  role="button" >Sign Up</Link>
      {/* <button type="button" className="">Login</button>
      <button type="button" className="">Signup</button> */}
    </div>
    </header>
  );
}

export default Header;
