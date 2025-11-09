require("dotenv/config");
const express = require("express");
const bookRoutes = require("./routes/books.routes");
const authorRoutes = require("./routes/author.routes");
const { loggerMiddleware } = require("./middlewares/logger");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
