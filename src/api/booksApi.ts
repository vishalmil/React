// src/api/booksApi.ts
import axios from "axios";
import { Book } from "../type/Book";

export const API_BASE = "https://openlibrary.org";

// Fetch trending books by genre
export const fetchTrendingBooks = async (genre: string) => {
  try {
    const res = await axios.get(`${API_BASE}/subjects/${genre}.json?limit=20`);
    const works = res.data.works;
    const mapped = works.map((book: Book) => {
      let image = null;
      if (book.cover_id) {
        image = book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : undefined;
      }
      else {
        image = `https://via.placholder.com/200*300?text=No+Image`;
      }
      return {
        ...book, // works array
        image,
      };
    })

    return mapped;
  } catch (error) {
    console.error("Error fetching trending books:", error);
    return [];
  }
};

export const searchBooks = async (query: string) => {
  try {
    const res = await axios.get(
      `${API_BASE}/search.json?q=${encodeURIComponent(query)}&limit=20`
    );

    const docs = res.data?.docs;

    if (!docs || !Array.isArray(docs)) {
      console.error("Search API did not return docs array");
      return [];
    }

    const mapped = docs.map((book: any) => {
      const coverId = book.cover_i;

      let image;
      if (coverId) {
        image = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
      } else {
        image = `https://via.placeholder.com/200x300?text=No+Image`;
      }

      return { ...book, image };
    });

    return mapped;
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
