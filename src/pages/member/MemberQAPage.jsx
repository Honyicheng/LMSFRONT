import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios";
import "../../app.css"; // Adjust the path as necessary

export default function MemberQAPage() {
  const [questions, setQuestions] = useState([]);
  const [content, setContent] = useState("");

  const fetchQuestions = () => {
    axiosInstance.get("/api/member/questions/my")
      .then(res => {
        setQuestions(res.data);
        console.log("my questions:", res.data);
      })
      .catch(err => {
        console.error("Failed to fetch questions:", err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting question:", content);
    if (!content.trim()) {
      alert("Question content cannot be empty.");
      return;
    }
    // 提交问题
    axiosInstance.post("/api/member/questions", { message: content })
      .then(() => {
        setContent("");
        fetchQuestions();
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Ask Admin a Question</h2>

      <form onSubmit={handleSubmit} className="glass-form space-y-3 mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input"
          placeholder="Write your question..."
          required
        />
        <button type="submit" className="btn-glass">Submit</button>
      </form>

      <div className="glass-form p-4 space-y-3">
        <h3 className="text-lg font-semibold text-white mb-2">Previous Questions</h3>
        {questions.length === 0 && (
          <p className="text-gray-300 italic">No questions submitted yet.</p>
        )}
        {questions.map((q, i) => (
          <div key={i} className="border-b border-gray-300 pb-3">
            <p className="text-white font-medium">Q: {q.message}</p>
            {q.reply ? (
              <p className="text-green-300">A: {q.reply}</p>
            ) : (
              <p className="text-gray-400 italic">Awaiting admin response...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
