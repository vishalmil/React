// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to login
  };

  return (
    <header className="header">
      <h1>My App</h1>

      <nav>
        {isLoggedIn ? (
          <>
            {/* <Link to="/">Home</Link> */}
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/books">Books</Link>
            {user?.role.toLowerCase() == "admin" ?
            <Link to="/users">Users</Link>
            : null}
            <Link to="/investments">Investments</Link>


            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;