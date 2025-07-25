import "../../App.css";

export default function BookTable({ books, onEdit, onDelete }) {
  return (
    <table className="table-glass">
      <thead>
        <tr className="bg-gray-100" align="left">
          <th className="p-2">NAME</th>
          <th className="p-2">AUTHOR</th>
          <th className="p-2">ISBN</th>
          <th className="p-2">CATEGORY</th>
          <th className="p-2">TOTAL COPY</th>
          <th className="p-2">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} className="border-t">
            <td className="p-2">{book.title}</td>
            <td className="p-2">{book.author}</td>
            <td className="p-2">{book.isbn}</td>
            <td className="p-2">{book.category}</td>
            <td className="p-2">{book.totalCopies}</td>
            <td className="p-2 space-x-2">
              <button onClick={() => onEdit(book)} className="btn-glass btn-small">EDIT</button>
              <button onClick={() => onDelete(book.id)} className="btn-glass btn-small danger">DEL</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
