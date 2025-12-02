// src/api/booksApi.ts
import axios from "axios";

export const API_BASE = "https://openlibrary.org";

// Fetch trending books by genre
export const fetchTrendingBooks = async (genre: string) => {
  try {
    const res = await axios.get(`${API_BASE}/subjects/${genre}.json?limit=20`);
    return res.data.works; // works array
  } catch (error) {
    console.error("Error fetching trending books:", error);
    return [];
  }
};

// Search books
export const searchBooks = async (query: string) => {
  try {
    const res = await axios.get(`${API_BASE}/search.json?q=${encodeURIComponent(query)}&limit=20`);
    return res.data.docs; // docs array
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};

// Fetch book details
export const fetchBookDetails = async (workId: string) => {
  try {
    const res = await axios.get(`${API_BASE}/works/${workId}.json`);
    return res.data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
};
