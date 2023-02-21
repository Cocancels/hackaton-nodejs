import React, { useState } from "react";
import { GamePage } from "./pages/Game";
// import Socket from "./Socket";
import LoginForm from "./components/User/LoginForm";
import Game from "./classes/game.js";
import Character from "./classes/character.js";
import Incendio from "./classes/Spells/Incendio";
import Reparo from "./classes/Spells/Reparo";
// import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CreateUserForm from "./CreateUserForm";
import NavBar from "./components/NavBar";
import Rooms from "./Rooms";
import Room from "./Room";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // fonction pour gérer la connexion de l'utilisateur
  function handleLogin() {
    setIsLoggedIn(true);
  }

  // fonction pour gérer la déconnexion de l'utilisateur
  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route
            path="/"
            element={
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            }
          /> */}
          <Route path="/character" element={<CreateUserForm />} />
          <Route path="/game" element={<GamePage />} />
          {/* <Route path="/rooms" element={<Socket />} /> */}
          {/* <Route path="/register" element={<CreateUserForm />} /> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<NavBar />} />

          <Route path="/character" element={<CreateUserForm />} />

          <Route path="/rooms" element={<Rooms />} />

          <Route path="/rooms/:id" element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
