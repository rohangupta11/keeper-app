import React,{useState} from "react"; //this React has babel which is compiler to compile our html inside the js to just browser understandable js
import Header from "./Header";
import { HashRouter as Router, Routes as Switch,Route } from "react-router-dom";
import Login from "./Login"
import Signup from "./Signup"
import Alert from "./Alert"
import Home from "./Home"


function App() {
  const [alert,setAlert]=useState(null);
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
          <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
