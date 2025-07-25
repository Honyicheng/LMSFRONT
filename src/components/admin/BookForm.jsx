import { useState, useEffect } from "react";
import "../../App.css";

export default function BookForm({ onSave, book }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    totalCopies: "",
  });

  useEffect(() => {
    if (book) {
      setForm(book);
    } else {
      setForm({
        title: "",
        author: "",
        isbn: "",
        category: "",
        totalCopies: "",
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "totalCopies" ? parseInt(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm(emptyForm); // ✅ 清空表单项
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-form p-4 mb-6 rounded-xl space-y-3"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Book Title"
        className="input w-full"
        required
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
        className="input w-full"
        required
      />
      <input
        name="isbn"
        value={form.isbn}
        onChange={handleChange}
        placeholder="ISBN"
        className="input w-full"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="input w-full"
        required
      />
      <input
        type="number"
        name="totalCopies"
        value={form.totalCopies}
        onChange={handleChange}
        placeholder="Total Copies"
        className="input w-full"
        min="1"
        required
      />
      <button type="submit" className="btn-glass">
        {form.id ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}

