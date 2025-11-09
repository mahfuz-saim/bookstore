const authorsTable = require("../models/author.model");
const booksTable = require("../models/book.model");
const db = require("../db");
const { eq, sql } = require("drizzle-orm");

exports.getAllAuthors = async function (req, res) {
  const authors = await db.select().from(authorsTable);
  return res.json(authors);
};

exports.getAuthorById = async function (req, res) {
  const id = req.params.id;

  const [author] = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, id))
    .limit(1);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  res.json(author);
};

exports.createAuthor = async function (req, res) {
  const { firstName, lastName, email } = req.body;

  const [result] = await db
    .insert(authorsTable)
    .values({ firstName, lastName, email })
    .returning({
      id: authorsTable.id,
    });

  return res
    .status(201)
    .json({ message: "Author created successfully", id: result.id });
};

exports.getBooksByAuthor = async function (req, res) {
  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, req.params.id));
  return res.json(books);
};
