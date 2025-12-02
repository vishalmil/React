import axios from "axios";
import { User } from "../type/user";

const API_URL = "http://localhost:3000/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID: ${id}`, error);
    throw error;
  }
};

// GET user by email and password (login)
export const loginUser = async (email: string, password: string): Promise<User | null> => {
  const response = await axios.get<User[]>(API_URL, {
    params: { email, password }
  });
  console.log(response);

  return response.data.length > 0 ? response.data[0] : null;
};

export const addUser = async (user: User): Promise<User> => {
  const users = await getUsers();
  const maxId = users.length > 0 ? users.length + 1 : 0;
  const newUser = { ...user, id: maxId };
  const response = await axios.post<User>(API_URL, newUser);
  return response.data;
};

// UPDATE USER (PUT)
export const updateUser = async (id: number, updatedUser: User): Promise<User> => {
const response = await axios.put(`${API_URL}/${id}`, updatedUser);
return response.data;
};
