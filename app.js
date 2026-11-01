
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();

app.use(express.json());

// Database path
const dbPath = path.join(__dirname, "library.db");

let db = null;

// Start database and server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database Error:", error.message);
    process.exit(1);
  }
};

// Check required book details
const validateBook = (book) => {
  const { title, author, price, pages } = book || {};

  return (
    typeof title === "string" &&
    title.trim() !== "" &&
    typeof author === "string" &&
    author.trim() !== "" &&
    Number.isFinite(price) &&
    Number.isFinite(pages) &&
    price >= 0 &&
    pages > 0
  );
};

// API 1: Get all books
app.get("/books/", async (request, response) => {
  try {
    const books = await db.all("SELECT * FROM book");
    response.status(200).json(books);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Internal Server Error");
  }
});

// API 2: Get a book by ID
app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const book = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [bookId]
    );

    if (!book) {
      return response.status(404).send("Book not found");
    }

    response.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Internal Server Error");
  }
});

// API 3: Add a new book
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    if (!validateBook(request.body)) {
      return response.status(400).send("Invalid book details");
    }

    const query = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?)
    `;

    const result = await db.run(query, [
      title.trim(),
      author.trim(),
      price,
      pages,
    ]);

    response.status(201).json({
      message: "Book added successfully",
      bookId: result.lastID,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Internal Server Error");
  }
});

// API 4: Update a book by ID
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    if (!validateBook(request.body)) {
      return response.status(400).send("Invalid book details");
    }

    const query = `
      UPDATE book
      SET title = ?, author = ?, price = ?, pages = ?
      WHERE id = ?
    `;

    const result = await db.run(query, [
      title.trim(),
      author.trim(),
      price,
      pages,
      bookId,
    ]);

    if (result.changes === 0) {
      return response.status(404).send("Book not found");
    }

    response.status(200).send("Book updated successfully");
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Internal Server Error");
  }
});

// API 5: Delete a book by ID
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const result = await db.run(
      "DELETE FROM book WHERE id = ?",
      [bookId]
    );

    if (result.changes === 0) {
      return response.status(404).send("Book not found");
    }

    response.status(200).send("Book deleted successfully");
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Internal Server Error");
  }
});

// Handle unknown routes
app.use((request, response) => {
  response.status(404).send("Route not found");
});

// Start application
initializeDBAndServer();
