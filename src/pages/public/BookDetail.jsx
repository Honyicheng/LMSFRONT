import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    try {
      const bookRes = await axios.get(`${BASE_URL}/api/public/books/${id}`);
      setBook(bookRes.data);
      const revRes = await axios.get(`${BASE_URL}/api/public/books+${id}/reviews`);
      setReviews(Array.isArray(revRes.data) ? revRes.data : []);
    } catch (err) {
      console.error("Error loading book or reviews:", err);
      setError("Failed to load book details or reviews.");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/api/member/reviews/${id}`,
        { content, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent("");
      setRating(5);
      fetchDetails();
      // 成功后跳转至 member dashboard
      if (user?.roles?.includes("ROLE_MEMBER")) {
        navigate("/member");
      }
    } catch (err) {
      console.error("Failed to submit review:", err);
      const errorMessage =
        err.response?.data?.message || err.response?.data?.error || err.message;
      alert("Failed to submit review: " + errorMessage);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-white p-6">Loading book...</p>;
  if (error) return <p className="text-red-600 p-6">{error}</p>;
  if (!book) return <p className="text-white p-6">Book not found.</p>;

  return (
    <div className="p-6">
      <div className="glass-form p-4 mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">{book.title}</h2>
        <p className="text-sm text-blue-100">Author: {book.author}</p>
        <p className="text-sm text-blue-100 mb-2">Category: {book.category}</p>
        <p className="text-white">{book.description || "No description available."}</p>
      </div>

      <div className="glass-form p-4">
        <h3 className="text-xl font-semibold text-white mb-3">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-blue-100">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="border-b border-gray-500 py-2 text-white">
              <p className="text-sm">{r.content}</p>
              <p className="text-xs text-blue-100">Rating: {r.rating} ★</p>
              <p className="text-xs text-blue-200">Reviewer: {r.username}</p>
            </div>
          ))
        )}

        {token && user?.roles?.includes("ROLE_MEMBER") ? (
          <form onSubmit={handleReviewSubmit} className="mt-4 space-y-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your review..."
              className="input"
              rows="3"
              required
            />
            <div className="flex items-center gap-2">
              <label className="text-white">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="dark-select input w-24"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn-glass"
              disabled={!content.trim()}
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="mt-4 text-blue-200">Please login as a member to write a review.</p>
        )}
      </div>
    </div>
  );
}
