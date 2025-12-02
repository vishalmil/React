import React from "react";

const Dashboard: React.FC = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  return (
    <div className="dashboard">
      <h2>Welcome to Dashboard 🎉</h2>
      {parsedUser && (
        <p>
          Hello <strong>{parsedUser.name}</strong> ({parsedUser.email})
        </p>
      )}
    </div>
  );
};

export default Dashboard;
