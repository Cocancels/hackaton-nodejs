import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom"
import CreateUserForm from "./CreateUserForm";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>

            <Route path="/" element={<NavBar/>}>

            </Route>


            <Route path="/character" element={<CreateUserForm/>} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
