import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/Axios";
import { useSelector } from "react-redux";
import "../../app.css";

const MemberReviewPage = ({ onReviewAdded }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const user = useSelector((state) => state.auth.user);

  const isMember = user?.roles?.includes("ROLE_MEMBER");

  // 📚 获取图书列表
  useEffect(() => {
    axiosInstance.get("/api/public/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error("Failed to fetch books", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
 await axiosInstance.post(`/api/member/reviews/${selectedBookId}`, {
  content,
  rating
});

      alert("Review submitted!");
      setContent("");
      setRating(5);
      setSelectedBookId("");
      onReviewAdded && onReviewAdded();
    } catch (err) {
      console.error("Failed to submit review:", err);
      const errorMessage =
        err.response?.data?.message || err.response?.data?.error || err.message;
      alert("Failed to submit review: " + errorMessage);
    }
  };
  // 🔍 获取图书评论
  const fetchReviews = () => {
  axiosInstance.get(`/api/public/reviews/${bookId}`)
    .then(res => setReviews(res.data))
    .catch(err => console.error("Failed to fetch reviews:", err));
  }

  if (!isMember) return null;

  return (
    <form onSubmit={handleSubmit} className="glass-form mt-4 space-y-3">
      <h3 className="text-lg font-bold text-white">Write a Review</h3>

      {/* 🔽 图书选择 */}
      <select
        value={selectedBookId}
        onChange={(e) => setSelectedBookId(e.target.value)}
        className="input dark-select"
        required
      >
        <option value="">-- Select a Book --</option>
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>

      {/* 📝 内容输入 */}
      <textarea
        className="input"
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your review..."
        required
      />

      {/* ⭐ 评分 */}
      <div className="flex items-center gap-2">
        <label className="text-white">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="input dark-select w-24"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-glass" disabled={!content.trim()}>
        Submit Review
      </button>
    </form>
  );
};

export default MemberReviewPage;
