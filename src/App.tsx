import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import BooksPage from "./pages/BooksPage";
import InvestmentList from "./pages/Investment";
import UsersList from "./pages/UserPage";
import AddInvestment from "./pages/AddInvestment";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/investments" element={<InvestmentList />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/addInvestment" element={<AddInvestment />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;