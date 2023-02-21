import { GamePage } from "./pages/Game/Game";
import LoginForm from "./components/User/LoginForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUserForm from "./components/User/CreateUserForm";
import NavBar from "./components/NavBar/NavBar";
import { Home } from "./pages/Home/Home";
import { Rooms } from "./pages/Rooms/Rooms";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character" element={<CreateUserForm />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/character" element={<CreateUserForm />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
