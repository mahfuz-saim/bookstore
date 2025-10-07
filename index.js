const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8000;

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
];

app.use(express.json());

app.use(function (req, res, next) {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  fs.appendFile("server.log", log + "\n", (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
  next();
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);

  if (isNaN(bookId)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(newBook);
  return res.status(201).json({ message: "Book created", book: newBook });
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }
  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(bookIndex, 1);
  return res.status(204).json({ message: "Book deleted" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
