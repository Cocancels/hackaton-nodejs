import React, { useEffect, useState } from "react";
import { GamePage } from "./pages/Game";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUserForm from "./CreateUserForm";
import NavBar from "./components/NavBar/NavBar";
import Socket from "./Socket";
import LoginForm from "./components/User/LoginForm";

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
          <Route
            path="/"
            element={
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            }
          />
          <Route path="/rooms" element={<Socket />}></Route>

          <Route path="/character" element={<CreateUserForm />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/rooms" element={<Socket />} />
          <Route path="/register" element={<CreateUserForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
