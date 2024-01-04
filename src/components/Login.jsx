import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [credentials, setCredentials] = useState({
    //state of our new credentials
    email: "",
    password: "",
  });
  let navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        //fetching from login endpoint api
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      setCredentials({ //createnote area becomes empty on submission of note
        email: "",
        password: ""
      });
      if(json.success)
      {
        //save the authtoken and redirect
        localStorage.setItem('token',json.authToken)
        props.showAlert("Successfully signed up!","success");
        navigate("/");
      }
      else{
        props.showAlert("Invalid credentials, Please try again!","danger");
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target; //name means event performed on title or description? value means text entered
    setCredentials((prev) => {
      return {
        ...prev, //we have previous title,description,date of our note. Suppose title is changed so we change title and keep the description,date same by this spread operator
        [name]: value, //[] is used to differentiate b/w name as a new key value pair's key or [name] means the variable declared above
      };
    });
  }
  return (
    <div className="container">
      <h1 className="mb-4">Login to your account</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={handleChange}
            className="form-control"
            value={credentials.email}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={handleChange}
            className="form-control"
            value={credentials.password}
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
