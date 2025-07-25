import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchBooks();
  }, [keyword, category]);

  const fetchBooks = async () => {
    try {
      let url = `${BASE_URL}/api/public/books`;
      if (keyword) url += `?keyword=${encodeURIComponent(keyword)}`;
      if (category)
        url += keyword
          ? `&category=${encodeURIComponent(category)}`
          : `?category=${encodeURIComponent(category)}`;

      const response = await axios.get(url);
      const isValidArray = Array.isArray(response.data)
        ? response.data
        : response.data?.books || [];

      setBooks(isValidArray);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching books:", err);
      setError("Failed to fetch booklist. Please ensure the backend is running.");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  if (loading) return <p className="text-white p-6">Loading books...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">📚Book List</h2>

      <form onSubmit={handleSearch} className="glass-form flex flex-wrap gap-3 p-4 mb-6">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="input flex-1 min-w-[200px]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input min-w-[180px]"
        >
          <option value="">All Categories</option>
          <option value="Literature">Literature</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
        </select>
        <button type="submit" className="btn-glass">Search</button>
      </form>

      {books.length === 0 ? (
        <p className="text-white">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="glass-form p-4">
              <h3 className="text-lg font-bold text-white">{book.title}</h3>
              <p className="text-sm text-blue-100">Author: {book.author}</p>
              <Link
                to={`/books/${book.id}`}
                className="mt-2 inline-block text-blue-300 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
