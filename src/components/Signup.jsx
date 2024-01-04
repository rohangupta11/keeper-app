import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup(props) {
  const [credentials, setCredentials] = useState({
    //state of our new credentials
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords don't match, Please try again!","danger");
    } 
    else {
      try {
        //fetching from login endpoint api
        const response = await fetch(
          `http://localhost:5000/api/auth/createuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
        const json = await response.json();
        console.log(json);
        setCredentials({
          //createnote area becomes empty on submission of note
          name: "",
          email: "",
          password: "",
          cpassword:""
        });
        if (json.success) {
          //save the authtoken and redirect
          localStorage.setItem("token", json.authtoken);
          props.showAlert("Successfully signed up!","success");
          navigate("/");
        } else {
          props.showAlert("Invalid credentials, Please try again!","danger");
        }
      } catch (err) {
        console.log(err);
      }
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
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Name
          </label>
          <input
            type="name"
            onChange={handleChange}
            className="form-control"
            value={credentials.name}
            id="name"
            name="name"
          />
        </div>
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="cpassword"
            onChange={handleChange}
            className="form-control"
            value={credentials.cpassword}
            id="cpassword"
            name="cpassword"
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;