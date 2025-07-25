import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios";

import BookForm from "@/components/admin/BookForm";
import BookTable from "@/components/admin/BookTable";
import "../../App.css";

export default function AdminBookPage() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = () => {
    axiosInstance
      .get("/api/admin/books")
      .then((res) => setBooks(res.data))
      .catch(() => alert("Failed to fetch books"));
  };

  const handleSave = (book) => {
    const request = book.id
      ? axiosInstance.put(`/api/admin/books/${book.id}`, book)
      : axiosInstance.post("/api/admin/books", book);

    request
      .then(() => {
        fetchBooks();
        setEditingBook(null);
      })
      .catch(() => alert("Save failed"));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axiosInstance
        .delete(`/api/admin/books/${id}`)
        .then(() => fetchBooks());
    }
  };

  useEffect(fetchBooks, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Book Management</h1>
      <BookForm onSave={handleSave} book={editingBook} />
      <BookTable books={books} onEdit={setEditingBook} onDelete={handleDelete} />
    </div>
  );
}
