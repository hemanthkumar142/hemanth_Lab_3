
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "library.db");

let db;

// Allowed columns for sorting
const allowedColumns = ["id", "title", "author", "price", "pages"];

// Validate book details
function validateBook(body) {
    const { title, author, price, pages } = body;

    if (!title || !title.trim()) {
        return "Title is required";
    }

    if (!author || !author.trim()) {
        return "Author is required";
    }

    if (price === undefined || price === null || price === "" ||
        !Number.isFinite(Number(price)) || Number(price) < 0) {
        return "Price must be a valid non-negative number";
    }

    if (pages === undefined || pages === null || pages === "" ||
        !Number.isInteger(Number(pages)) || Number(pages) < 0) {
        return "Pages must be a valid non-negative integer";
    }

    return null;
}

// Validate book ID
function validateBookId(bookId) {
    return /^\d+$/.test(bookId) && Number(bookId) > 0;
}

// GET all books with search, sorting, pagination and price filter
app.get("/books", async (req, res) => {
    try {
        const {
            search_q = "",
            order_by = "id",
            order = "ASC",
            limit = "10",
            offset = "0",
            min_price,
            max_price
        } = req.query;

        // Validate sorting column
        if (!allowedColumns.includes(order_by)) {
            return res.status(400).json({
                message: "Invalid order_by column"
            });
        }

        // Validate sorting order
        const sortOrder = order.toUpperCase();

        if (!["ASC", "DESC"].includes(sortOrder)) {
            return res.status(400).json({
                message: "Order must be ASC or DESC"
            });
        }

        // Validate limit and offset
        if (!/^\d+$/.test(limit) || Number(limit) < 1) {
            return res.status(400).json({
                message: "Limit must be a positive integer"
            });
        }

        if (!/^\d+$/.test(offset)) {
            return res.status(400).json({
                message: "Offset must be a non-negative integer"
            });
        }

        // Build search and price conditions
        let conditions = [];
        let params = [];

        if (search_q.trim() !== "") {
            conditions.push("title LIKE ?");
            params.push(`%${search_q.trim()}%`);
        }

        if (min_price !== undefined) {
            if (min_price === "" || !Number.isFinite(Number(min_price)) ||
                Number(min_price) < 0) {
                return res.status(400).json({
                    message: "Invalid minimum price"
                });
            }

            conditions.push("price >= ?");
            params.push(Number(min_price));
        }

        if (max_price !== undefined) {
            if (max_price === "" || !Number.isFinite(Number(max_price)) ||
                Number(max_price) < 0) {
                return res.status(400).json({
                    message: "Invalid maximum price"
                });
            }

            conditions.push("price <= ?");
            params.push(Number(max_price));
        }

        if (min_price !== undefined && max_price !== undefined &&
            Number(min_price) > Number(max_price)) {
            return res.status(400).json({
                message: "Minimum price cannot be greater than maximum price"
            });
        }

        // Create SQL query
        let sql = "SELECT * FROM book";

        if (conditions.length > 0) {
            sql += " WHERE " + conditions.join(" AND ");
        }

        sql += ` ORDER BY ${order_by} ${sortOrder} LIMIT ? OFFSET ?`;

        params.push(Number(limit), Number(offset));

        const books = await db.all(sql, params);

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// GET book by ID
app.get("/books/:bookId", async (req, res) => {
    try {
        const { bookId } = req.params;

        if (!validateBookId(bookId)) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        const book = await db.get(
            "SELECT * FROM book WHERE id = ?",
            [bookId]
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// POST - Add a new book
app.post("/books", async (req, res) => {
    try {
        const error = validateBook(req.body);

        if (error) {
            return res.status(400).json({
                message: error
            });
        }

        const { title, author, price, pages } = req.body;

        const result = await db.run(
            `INSERT INTO book (title, author, price, pages)
             VALUES (?, ?, ?, ?)`,
            [title.trim(), author.trim(), Number(price), Number(pages)]
        );

        res.status(201).json({
            message: "Book added successfully",
            bookId: result.lastID
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// PUT - Update a book
app.put("/books/:bookId", async (req, res) => {
    try {
        const { bookId } = req.params;

        if (!validateBookId(bookId)) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        const error = validateBook(req.body);

        if (error) {
            return res.status(400).json({
                message: error
            });
        }

        const { title, author, price, pages } = req.body;

        const result = await db.run(
            `UPDATE book
             SET title = ?, author = ?, price = ?, pages = ?
             WHERE id = ?`,
            [title.trim(), author.trim(), Number(price), Number(pages), bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// DELETE - Delete a book
app.delete("/books/:bookId", async (req, res) => {
    try {
        const { bookId } = req.params;

        if (!validateBookId(bookId)) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        const result = await db.run(
            "DELETE FROM book WHERE id = ?",
            [bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Route not found
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Handle invalid JSON and other errors
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({
            message: "Invalid JSON format"
        });
    }

    res.status(500).json({
        message: "Internal server error"
    });
});

// Connect database and start server
async function startServer() {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        const table = await db.get(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'book'"
        );

        if (!table) {
            throw new Error("Book table does not exist in library.db");
        }

        console.log("Database connected successfully");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

startServer();
