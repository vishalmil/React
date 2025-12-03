import React, { useEffect, useState } from "react";
import { Investment } from "../type/investment";
import { getInvestments } from "../service/investmentService";
import EditInvestment from "./EditInvestment";

const InvestmentList: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  const loadInvestments = () => {
    getInvestments()
      .then((data) => {
        setInvestments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    loadInvestments();
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Investment Data</h2>

      {investments.map((inv) => (
        <div
          key={inv.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <h3>{inv.name}</h3>
          <p>Type: {inv.type}</p>
          <p>Amount: {inv.amount}</p>
          <p>PurchesDate: {inv.purchaseDate}</p>
          <p>CurrentValue: {inv.currentValue}</p>
          <button
            style={{ marginTop: 10 }}
            onClick={() => setSelectedInvestment(inv)}
          >
            Edit Investment
          </button>
        </div>
      ))}

      <EditInvestment selectedInvestment={selectedInvestment} onUpdateSuccess={loadInvestments} />
    </div>
  );
};

export default InvestmentList;
