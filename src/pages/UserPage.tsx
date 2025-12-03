import React, { useEffect, useState } from "react";
import { User } from "../type/user";
import { getUsers } from "../service/userService";
import EditUser from "./EditUser";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Load users from DB
  const loadUsers = () => {
    setLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 20 }}> <h2>User List</h2>
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Phone: {user.phone}</p>
          <p>Role: {user.role}</p>

          <button
            style={{ marginTop: 10 }}
            onClick={() => setSelectedUser(user)}
          >
            Edit User
          </button>
        </div>
      ))}

      <EditUser selectedUser={selectedUser} onUpdateSuccess={loadUsers} />
    </div>

  );
};

export default UsersList;

