import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom"
import CreateUserForm from "./CreateUserForm";
import NavBar from "./components/NavBar";
import Socket from "./Socket";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>

            <Route path="/" element={<NavBar/>}/>

            <Route path="/rooms" element={<Socket/>}/>

            <Route path="/character" element={<CreateUserForm/>} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
