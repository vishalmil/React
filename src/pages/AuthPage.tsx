import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/styles.css";
import { AuthContext } from "../authContext/AuthContext";
import { User } from "../type/user";
import { addUser, getUsers, loginUser } from "../service/userService";
import { validateLogin, validateSignup } from "../utils/Validations";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/";
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phone: "",
    role: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// -----------------------------
// SIGN UP
// -----------------------------
const handleSignup = async () => {
const error = validateSignup(formData);
if (error) {
alert(error);
return;
}

try {
const users = await getUsers();
const existingUser = users.find((u: User) => u.email === formData.email);

if (existingUser) {
  alert("Email already registered. Please login 🔒");
  return;
}

await addUser({ ...formData, role: "user" });
alert("Sign Up successful! Please login 🎉");
navigate("/");

} catch (error) {
console.error(error);
alert("Signup failed. Try again ❌");
}
};

// -----------------------------
// LOGIN
// -----------------------------
const handleLogin = async () => {
const error = validateLogin(formData.email, formData.password);
if (error) {
alert(error);
return;
}

try {
const user = await loginUser(formData.email, formData.password);

if (!user) {
  alert("Invalid credentials ❌");
  return;
}

login(user);
alert("Login Successful 🎉");
navigate("/dashboard");

} catch (error) {
console.error(error);
alert("Login failed. Try again ❌");
}
};

 
  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      {!isLogin && (
        <>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            className="input"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <select
            className="input"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            className="input"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </>
      )}

      <input
        className="input"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        className="input"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button
        className="button"
        onClick={isLogin ? handleLogin : handleSignup}
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
    </div>
  );
};

export default AuthPage;