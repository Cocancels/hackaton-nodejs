import React, { useEffect } from "react";
import { GamePage } from "./pages/Game";
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
  let character1 = new Character("John", "Doe", 100, 100, 10, [
    new Incendio(),
    new Reparo(),
  ]);

  let character2 = new Character("Jane", "Doe", 100, 100, 10, [
    new Incendio(),
    new Reparo(),
  ]);

  let game = new Game();

  game.addCharacter(character1);
  game.addCharacter(character2);

  function playGame() {
    game.play();
  }

  useEffect(() => {
    playGame();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
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
