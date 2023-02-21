import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  const [actualUser, setActualUser] = useState<any>(null);

  useEffect(() => {
    const actualUser = localStorage.getItem("actualUser");

    if (actualUser) {
      setActualUser(JSON.parse(actualUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("actualUser");
    setActualUser(null);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rooms">Rooms</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
        {actualUser ? (
          <>
            <li>
              <Link to="/account">{actualUser.nickname}</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Déconnexion
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/character">Create account</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
