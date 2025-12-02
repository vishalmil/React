// src/pages/BooksPage.tsx
import React, { useState, useEffect } from "react";
import { fetchTrendingBooks, searchBooks, fetchBookDetails } from "../api/booksApi";
import "../styles/styles.css";

type Book = {
  key: string;
  title: string;
  authors?: { name: string }[];
  author_name?: string[];
  cover_id?: number;
};

const BooksPage: React.FC = () => {
  const [genre, setGenre] = useState("fiction");
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookDetails, setBookDetails] = useState<any>(null);

  // Fetch trending books when genre changes
  useEffect(() => {
    const loadTrending = async () => {
      const books = await fetchTrendingBooks(genre);
      setTrendingBooks(books);
    };
    loadTrending();
  }, [genre]);

  // Search books
  const handleSearch = async () => {
    if (!searchQuery) return;
    const results = await searchBooks(searchQuery);
    setSearchResults(results);
  };

  // Fetch book details
  const handleSelectBook = async (book: Book) => {
    setSelectedBook(book);
    const workId = book.key.split("/").pop();
    if (workId) {
      const details = await fetchBookDetails(workId);
      setBookDetails(details);
    }
  };

  return (
    <div className="books-container">
      <h2>Trending Books</h2>
      <div style={{ marginBottom: "15px" }}>
        <label>Select Genre: </label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="fiction">Fiction</option>
          <option value="science_fiction">Science Fiction</option>
          <option value="romance">Romance</option>
          <option value="mystery">Mystery</option>
          <option value="fantasy">Fantasy</option>
        </select>
      </div>

      <div className="books-list">
        {trendingBooks.map((book) => (
          <div key={book.key} className="book-item" onClick={() => handleSelectBook(book)}>
            <p><strong>{book.title}</strong></p>
            {book.authors && <p>By {book.authors.map((a) => a.name).join(", ")}</p>}
          </div>
        ))}
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2>Search Books</h2>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by title, author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "8px", width: "70%", marginRight: "10px" }}
        />
        <button onClick={handleSearch} className="button">Search</button>
      </div>

      <div className="books-list">
        {searchResults.map((book) => (
          <div key={book.key} className="book-item" onClick={() => handleSelectBook(book)}>
            <p><strong>{book.title}</strong></p>
            {book.author_name && <p>By {book.author_name.join(", ")}</p>}
          </div>
        ))}
      </div>

      {bookDetails && selectedBook && (
        <div className="book-details">
          <h3>{selectedBook.title}</h3>
          {bookDetails.description && (
            <p>{typeof bookDetails.description === "string" ? bookDetails.description : bookDetails.description.value}</p>
          )}
          {bookDetails.subjects && (
            <p><strong>Subjects:</strong> {bookDetails.subjects.slice(0, 5).join(", ")}</p>
          )}
          {bookDetails.first_publish_date && <p><strong>First Published:</strong> {bookDetails.first_publish_date}</p>}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
