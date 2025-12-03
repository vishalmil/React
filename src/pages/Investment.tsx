import React, { useContext, useEffect, useState } from "react";
import { Investment } from "../type/investment";
import { deleteInvestment, getInvestments } from "../service/investmentService";
import EditInvestment from "./EditInvestment";
import { AuthContext } from "../authContext/AuthContext";
import { useNavigate } from "react-router-dom";

const InvestmentList: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


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

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you want to delete this investment?"))
      return;
    await deleteInvestment(id);
    loadInvestments();
  }

  const handlePurchase = async (id: string) => {
    alert("purchased");
  }

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Investment Data</h2>
      <div style={{ textAlign: "right", marginRight: "20px" }}>
        {user?.role?.toLowerCase() === "admin" && (
          <button style={{ marginBottom: 10 }} onClick={() => navigate("/addInvestment")} >
            Add New Investment
          </button>
        )}
      </div>

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
          {user?.role?.toLowerCase() === "admin" && (
            <>
              <button style={{ marginTop: 10 }} onClick={() => setSelectedInvestment(inv)} >
                Edit Investment
              </button>

              <br />
              <button style={{ marginTop: 10 }} onClick={() => handleDelete(inv.id)} >
                Delete Investment
              </button>
            </>
          )}
          {user?.role.toLocaleLowerCase() !== "admin" && (
            <button style={{ marginTop: 10 }} onClick={() => handlePurchase(inv.id)}>
              Purchase
            </button>
          )}
        </div>
      ))}

      <EditInvestment selectedInvestment={selectedInvestment} onUpdateSuccess={loadInvestments} />
    </div>
  );
};

export default InvestmentList;
