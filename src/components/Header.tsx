// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <h1>My App</h1>

      <nav style={{ display: "flex", gap: "20px" }}>

        {/* Not Logged In */}
        {!isLoggedIn && (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}

        {/* Logged In */}
        {isLoggedIn && user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/investments">Investments</Link>
            <Link to="/books">Books</Link>

            {/* Admin Only */}
            {user.role?.toLowerCase() === "admin" && (
              <Link to="/users">Users</Link>
            )}

            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}

      </nav>
    </header>
  );
};

export default Header