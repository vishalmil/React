import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { getInvestments } from "../service/investmentService";
import { Investment } from "../type/investment";

const Dashboard: React.FC = () => {
  const userDetails = localStorage.getItem("user");
  const parsedUser = userDetails ? JSON.parse(userDetails) : null;

  const [investments, setInvestments] = useState<Investment[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    const data = await getInvestments();
    // sort by amount (largest first)
    const sorted = data.sort((a, b) => b.amount - a.amount);
    setInvestments(sorted.slice(0, 5)); // only top 5
  };

  if (!investments.length) return <p>Loading...</p>;

  const topInvestment = investments[0]; // BEST investment
  const otherInvestments = investments.slice(1); // remaining 4


  return (
    <div className="dashboard">
      <h2>Welcome to Dashboard</h2>
      {parsedUser && (
        <p>
          Hello <strong>{parsedUser.name}</strong> ({parsedUser.email})
        </p>
      )}

      <div className="top-investment-card">
        <h2>Top Investment</h2>
        <h3>{topInvestment.name}</h3>
        <p><b>Amount:</b> ₹{topInvestment.amount}</p>
        <p><b>Purchase Date:</b> {topInvestment.purchaseDate}</p>
      </div>

      <h3>Top 5 Investments</h3>


      <ul className="investment-list">
        {investments.map((inv, index) => (
          <li key={inv.id} className="investment-item">
            <span className="rank">#{index + 1}</span>
            <span>{inv.name}</span>
            <span>₹{inv.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
