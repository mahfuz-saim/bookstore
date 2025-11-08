const booksTable = require("../models/book.model");
const db = require("../db");

exports.getAllBooks = (req, res) => {
  res.json(BOOKS);
};

exports.getBookById = (req, res) => {
  const bookId = parseInt(req.params.id);

  if (isNaN(bookId)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  const book = BOOKS.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
};

exports.createBook = (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newBook = {
    id: BOOKS.length + 1,
    title,
    author,
  };
  BOOKS.push(newBook);
  return res.status(201).json({ message: "Book created", book: newBook });
};

exports.deleteBookById = (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }
  const bookIndex = BOOKS.findIndex((b) => b.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  BOOKS.splice(bookIndex, 1);
  return res.status(204).json({ message: "Book deleted" });
};
