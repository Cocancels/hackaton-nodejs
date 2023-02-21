import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUserForm from "./CreateUserForm";
import NavBar from "./components/NavBar";
import { GamePage } from "./pages/Game";
import Socket from "./Socket";
import LoginForm from "./components/User/LoginForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<NavBar />} />
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
