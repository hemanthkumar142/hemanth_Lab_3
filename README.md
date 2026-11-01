# Backend Development Lab 2 – SQLite Database and CRUD Operations

**Live Deployment:** https://vijayganesh-lab-2.onrender.com/

## Student Details

- **Name:** Vijay Ganesh Bonthala
- **Course:** B.Tech – Computer Science and Engineering-AIDE-2A
- **Section:**106-2A
- **Year:** II Year
- **Subject:** Backend Development Fundamentals
- **Lab Number:** 02
- **Project Name:** Library Management API

## 1. Objective

The objective of this lab is to connect an Express.js server with an SQLite database and implement CRUD (Create, Read, Update, Delete) operations using REST API endpoints.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
- Postman
- Visual Studio Code
- Git and GitHub
- Render

## 3. Project Structure

```text
lab_2/
│
├── app.js
├── library.db
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
│
├── postman/
│   └── collections/
│
└── screenshots/
    ├── database.png
    ├── get-all.png
    ├── get-by-id.png
    ├── post.png
    ├── put.png
    ├── delete.png
    └── render-live.png
```

## 4. Database Details

**Database Name:** `library.db`

**Table Name:** `book`

| Column | Data Type |
|---|---|
| id | INTEGER PRIMARY KEY |
| title | TEXT |
| author | TEXT |
| price | INTEGER |
| pages | INTEGER |

The database stores information about books, including their ID, title, author, price and number of pages.

### Current Database Records

The following records were verified in the local SQLite database after performing CRUD operations.

| ID | Book Title | Author | Price | Pages |
|---:|---|---|---:|---:|
| 1 | The Alchemist | Paulo Coelho | 250 | 208 |
| 2 | Atomic Habits | James Clear | 450 | 320 |
| 3 | Rich Dad Poor Dad | Robert Kiyosaki | 350 | 336 |
| 4 | Wings of Fire | A.P.J. Abdul Kalam | 300 | 180 |
| 5 | Harry Potter | J.K. Rowling | 500 | 400 |
| 6 | The Power of Habit | Charles Duhigg | 400 | 371 |
| 7 | Think and Grow Rich | Napoleon Hill | 280 | 250 |
| 8 | Ikigai | Hector Garcia | 320 | 194 |
| 9 | Deep Work | Cal Newport | 420 | 296 |
| 10 | The Psychology of Money | Morgan Housel | 380 | 256 |
| 11 | Clean Code | Robert C. Martin | 550 | 350 |

## 5. CRUD Operations Performed

During testing, I performed the following operations:

1. **DELETE:** Deleted the book record with ID 1.
2. **POST:** Added a new book named Clean Code with ID 11.
3. **PUT:** Updated the details of an existing book.
4. **INSERT:** Added The Alchemist again with ID 1 directly into the local SQLite database.

These operations helped me understand how records are created, retrieved, updated and deleted.

## 6. Installation and Setup

### Install Dependencies

```bash
npm install
```

### Install Nodemon

```bash
npm install --save-dev nodemon
```

### Run the Application

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The local server runs on port 3000.

## 7. API Endpoints

**Local Base URL:**

```text
http://localhost:3000
```

**Live Base URL:**

```text
https://vijayganesh-lab-2.onrender.com
```

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Retrieve all books |
| GET | `/books/:bookId/` | Retrieve a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update an existing book |
| DELETE | `/books/:bookId/` | Delete a book |

## 8. API Request Examples

### 8.1 GET – Retrieve All Books

```http
GET /books/
```

Retrieves all book records from the database.

### 8.2 GET – Retrieve a Book by ID

```http
GET /books/1/
```

Retrieves a specific book using its ID.

### 8.3 POST – Add a New Book

```http
POST /books/
```

Request Body:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 550,
  "pages": 350
}
```

Adds a new book to the database.

### 8.4 PUT – Update a Book

```http
PUT /books/11/
```

Request Body:

```json
{
  "title": "Updated Clean Code",
  "author": "Robert C. Martin",
  "price": 600,
  "pages": 400
}
```

Updates the details of an existing book.

### 8.5 DELETE – Delete a Book

```http
DELETE /books/11/
```

Deletes a book using its ID.

## 9. SQL Queries Used

**SELECT:**

```sql
SELECT * FROM book;
```

**INSERT:**

```sql
INSERT INTO book (title, author, price, pages)
VALUES (?, ?, ?, ?);
```

**UPDATE:**

```sql
UPDATE book
SET title = ?, author = ?, price = ?, pages = ?
WHERE id = ?;
```

**DELETE:**

```sql
DELETE FROM book WHERE id = ?;
```

Parameterized queries are used to safely pass values into SQL statements.

## 10. Testing

The API endpoints were tested using Postman.

- GET – Retrieved all book records.
- GET by ID – Retrieved individual book details.
- POST – Added a new book successfully.
- PUT – Updated existing book details.
- DELETE – Deleted a book successfully.

The database records were also verified using SQLite CLI.

## 11. Deployment

The Express.js application was deployed using Render.

**Live API:**

[https://vijayganesh-lab-2.onrender.com/books/](https://vijayganesh-lab-2.onrender.com/books/)

## 12. Problems Faced and Solutions

1. **SQLite installation:** Installed SQLite tools and configured the environment.
2. **Database connection:** Connected SQLite with Express using the `sqlite` and `sqlite3` packages.
3. **GitHub push rejection:** Resolved unrelated Git histories and successfully pushed the project.
4. **Render compatibility:** Addressed Node.js and SQLite package compatibility issues.
5. **API testing:** Tested CRUD operations locally before deploying the updated application.

## 13. Screenshots

### 13.1 SQLite Database Records

<img width="1918" height="1006" alt="image" src="https://github.com/user-attachments/assets/79123898-602b-420c-ad4b-2fd65eb8779d" />

### 13.2 GET – All Books

<img width="1918" height="1272" alt="image" src="https://github.com/user-attachments/assets/33badf28-f3cb-42c6-9905-fd939e21bd1a" />


### 13.3 GET – Book by ID

<img width="959" height="492" alt="image" src="https://github.com/user-attachments/assets/b31aa0cb-0e46-4e82-8588-8f01aa08fd37" />


### 13.4 POST – Add a Book

<img width="959" height="502" alt="image" src="https://github.com/user-attachments/assets/fdb91617-24d0-4344-a704-0525351c5277" />

### 13.5 PUT – Update a Book

<img width="1918" height="1020" alt="image" src="https://github.com/user-attachments/assets/e116615c-c489-428c-8188-910d0d89d039" />


### 13.6 DELETE – Delete a Book

<img width="958" height="505" alt="image" src="https://github.com/user-attachments/assets/8614fa01-0198-48a6-9d8b-2cc57ff183c0" />


### 13.7 Render Deployment

https://vijayganesh-lab-2.onrender.com/
## 14. Conclusion

In this lab, I learned how to connect an Express.js application with an SQLite database and implement CRUD operations using REST APIs. I also learned how to test APIs using Postman, execute SQL queries, manage project files using Git and GitHub, and deploy a backend application using Render.
