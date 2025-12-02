import React, { useEffect, useState } from "react";
import { User } from "../type/user";
import { updateUser } from "../service/userService";

interface Props {
selectedUser: User | null;
onUpdateSuccess: () => void;
}

const EditUser: React.FC<Props> = ({ selectedUser, onUpdateSuccess }) => {
const [formData, setFormData] = useState<User>({
id: 0,
name: "",
email: "",
password: "",
dob: "",
gender: "",
phone: "",
role: "",
});

// Load selected user into form
useEffect(() => {
if (selectedUser) {
setFormData(selectedUser);
}
}, [selectedUser]);

// Handle input
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Update User
const handleUpdate = async () => {
try {
await updateUser(formData.id!, formData);
alert("User Updated Successfully ✔");
onUpdateSuccess();
} catch (error) {
console.error(error);
alert("Update failed ❌");
}
};

if (!selectedUser)
return <p style={{ marginTop: 20 }}>Select a user to edit...</p>;

return (
<div
style={{
marginTop: 20,
padding: 20,
border: "1px solid #aaa",
borderRadius: 8,
}}
> <h3>Edit User</h3>
  <input
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Name"
  /><br />

  <input
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Email"
  /><br />

  <input
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    placeholder="Phone"
  /><br />
  
  <select name="gender" value={formData.gender}
    onChange={handleChange}
    >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
  </select><br />

  <select name="role" value={formData.role}
    onChange={handleChange}
    >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="other">Other</option>
  </select><br />

  <button
    onClick={handleUpdate}
    style={{ marginTop: 10, padding: "6px 12px" }}
  >
    Save Changes
  </button>
</div>
);
};

export default EditUser;










// import React, { useState, useEffect } from "react";
// import { User } from "../type/user";
// import { updateUser } from "../service/userService";

// interface Props {
// selectedUser: User | null;
// onUpdateSuccess: () => void;
// }

// const EditUser: React.FC<Props> = ({ selectedUser, onUpdateSuccess }) => {
// const [formData, setFormData] = useState<User>({
// id: 0,
// name: "",
// email: "",
// password: "",
// dob: "",
// gender: "",
// phone: "",
// role: "",
// });

// useEffect(() => {
// if (selectedUser) {
// setFormData(selectedUser);
// }
// }, [selectedUser]);

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// setFormData({ ...formData, [e.target.name]: e.target.value });
// };

// const handleUpdate = async () => {
// await updateUser(formData.id!, formData);
// alert("User Updated Successfully ✔");
// onUpdateSuccess(); // refresh parent list
// };

// if (!selectedUser) return <p>Select a user to edit...</p>;

// return (
// <div style={{ marginTop: 20, padding: 20, border: "1px solid #ddd" }}> <h3>Edit User</h3>
//   <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" /><br />
//   <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" /><br />
//   <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" /><br />
//   <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" /><br />
//   <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" /><br />

//   <button onClick={handleUpdate}>Update</button>
// </div>

// );
// };

// export default EditUser;
