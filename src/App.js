import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:8080/books");
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:8080/books", {
      title: title,
    });

    const updatedBooks = [...books, response.data];

    setBooks(updatedBooks);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put("http://localhost:8080/books/" + id, {
      title: newTitle,
    });

    console.log(response);

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...books, ...response.data };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    axios.delete("http://localhost:8080/books/" + id);

    const updatedBooks = books.filter((book) => {
      return book.id != id;
    });

    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
