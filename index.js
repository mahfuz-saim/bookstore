const express = require("express");
const bookRoutes = require("./routes/books.routes");
const { loggerMiddleware } = require("./middlewares/logger");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/books", bookRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
