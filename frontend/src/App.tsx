import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { GamePage } from "./pages/Game/Game";
import LoginForm from "./components/User/LoginForm";
import CreateUserForm from "./components/User/CreateUserForm";
import NavBar from "./components/NavBar/NavBar";
import { User } from "./interfaces/User";
import { useState, useEffect } from "react";

function App() {
  const [actualUser, setActualUser] = useState<User>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const actualUser = localStorage.getItem("actualUser");

    if (actualUser) {
      const newActualUser = JSON.parse(actualUser);

      console.log(newActualUser);

      setActualUser(newActualUser);

      fetch("http://localhost:3001/rooms").then((res) => res.json());
    }
  };

  return (
    <div
      className={` App container-color-${
        actualUser &&
        ((actualUser.house === "1" && "serp") ||
          (actualUser.house === "2" && "grif") ||
          (actualUser.house === "3" && "serd") ||
          (actualUser.house === "4" && "pouf"))
      } `}
    >
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/character" element={<CreateUserForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
