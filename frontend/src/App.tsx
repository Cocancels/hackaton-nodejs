import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CreateUserForm from "./CreateUserForm";
import NavBar from "./components/NavBar";
import { GamePage } from "./pages/Game";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="/character" element={<CreateUserForm />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
