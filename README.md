**Live Deployment:**  
https://vijayganesh-lab-3.onrender.com
# Lab 3 – REST API, Query Parameters, Validation and Debugging

## 1. Project Details

**Project Name:** Book Management REST API  
**Student Name:** Vijay Ganesh Bonthala  
**Course:** Backend Development Fundamentals  
**Year:** 2nd-CSE-AIDE-2A  

**GitHub Repository:**  
https://github.com/vijayganeshb21-hub/Vijayganesh_Lab_3

**Live Deployment:**  
https://vijayganesh-lab-3.onrender.com

## 2. Project Description

This project is a Book Management REST API developed using Node.js, Express.js and SQLite.

The main objective of this project is to manage book information through REST API endpoints. It allows users to retrieve, search, sort, filter, add, update and delete book records.

The project also implements query parameters, pagination, input validation, proper HTTP status codes and error handling.

Postman is used to test the API endpoints, and the application is deployed using Render.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Runs JavaScript on the server |
| Express.js | Creates REST API endpoints |
| SQLite | Stores book information |
| SQLite3 | Connects Node.js with SQLite |
| JavaScript | Backend programming |
| Postman | Tests API requests and responses |
| Nodemon | Automatically restarts the server |
| Git | Version control |
| GitHub | Stores project source code |
| Render | Deploys the backend application |

## 4. Project Structure

```text
lab_3/
│
├── screenshots/
│   ├── get-all-books.png
│   ├── get-book-by-id.png
│   ├── search-books.png
│   ├── search-and-sort.png
│   ├── sort-ascending-order.png
│   ├── sort-descending-order.png
│   ├── limit-books.png
│   ├── pagination.png
│   ├── minimum-price-filter.png
│   ├── maximum-price-filter.png
│   ├── price-range-filter.png
│   ├── post-add-book.png
│   ├── put-update-book.png
│   └── delete-book.png
│
├── app.js
├── library.db
├── package.json
├── package-lock.json
└── .gitignore
```

## 5. Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/vijayganeshb21-hub/Vijayganesh_Lab_3.git
```

### Step 2: Open the Project Folder

```bash
cd Vijayganesh_Lab_3
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Server

```bash
npm run dev
```

The server runs at:

```text
http://localhost:3000
```

Expected terminal output:

```text
Database connected successfully
Server running on port 3000
```

## 6. Database Information

**Database Name:** `library.db`  
**Table Name:** `book`

The book table contains the following columns:

| Column | Data Type | Description |
|---|---|---|
| id | INTEGER | Unique book ID |
| title | TEXT | Name of the book |
| author | TEXT | Author of the book |
| price | INTEGER | Price of the book |
| pages | INTEGER | Number of pages |

SQLite is used to store and manage all book records.

## 7. API Endpoints

The application provides the following REST API endpoints:

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:bookId` | Retrieve a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:bookId` | Update an existing book |
| DELETE | `/books/:bookId` | Delete a book |

## 8. Query Parameters

Query parameters are used to search, sort, filter and retrieve specific book records.

### 8.1 Search Books

Search books by entering part of a book title.

```http
GET /books?search_q=Alchemist
```

**Explanation:** Returns books whose titles contain the search text.

### 8.2 Sorting in Ascending Order

```http
GET /books?order_by=price&order=ASC
```

**Explanation:** Displays books from the lowest price to the highest price.

### 8.3 Sorting in Descending Order

```http
GET /books?order_by=price&order=DESC
```

**Explanation:** Displays books from the highest price to the lowest price.

### 8.4 Limit

```http
GET /books?limit=3
```

**Explanation:** Returns a maximum of three book records.

### 8.5 Pagination

```http
GET /books?limit=3&offset=3
```

**Explanation:**
- `limit` specifies the maximum number of records.
- `offset` specifies how many records to skip.

### 8.6 Minimum Price Filter

```http
GET /books?min_price=300
```

**Explanation:** Returns books with a price greater than or equal to 300.

### 8.7 Maximum Price Filter

```http
GET /books?max_price=450
```

**Explanation:** Returns books with a price less than or equal to 450.

### 8.8 Price Range Filter

```http
GET /books?min_price=300&max_price=450
```

**Explanation:** Returns books priced between 300 and 450.

### 8.9 Combined Search and Sorting

The API also supports combining multiple query parameters in one request.

**Explanation:** Multiple conditions can be applied together to retrieve the required book records.

## 9. CRUD Operations

### 9.1 GET – Retrieve All Books

**Endpoint:**

```http
GET /books
```

Returns all available books from the database.

### 9.2 GET – Retrieve Book by ID

**Endpoint:**

```http
GET /books/1
```

Returns the details of the book with the specified ID.

### 9.3 POST – Add a New Book

**Endpoint:**

```http
POST /books
```

Request Body:

```json
{
  "title": "Python Programming",
  "author": "John Smith",
  "price": 400,
  "pages": 250
}
```

**Explanation:** Adds a new book to the SQLite database.

**Expected Status Code:** `201 Created`

### 9.4 PUT – Update an Existing Book

**Endpoint:**

```http
PUT /books/12
```

Request Body:

```json
{
  "title": "Advanced Python",
  "author": "John Smith",
  "price": 500,
  "pages": 300
}
```

**Explanation:** Updates the details of an existing book.

**Expected Status Code:** `200 OK`

### 9.5 DELETE – Delete a Book

**Endpoint:**

```http
DELETE /books/12
```

**Explanation:** Deletes the specified book from the database.

**Expected Status Code:** `200 OK`

## 10. Input Validation

Input validation ensures that users enter correct information before adding or updating book records.

The application checks the following conditions:

- Book title must not be empty.
- Author name must not be empty.
- Price must be a valid non-negative number.
- Pages must be a non-negative integer.
- Book ID must be a valid positive integer.
- Invalid input returns an appropriate error message.

**Expected Status Code for Invalid Input:** `400 Bad Request`

## 11. HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 OK | Request completed successfully |
| 201 Created | New book successfully added |
| 400 Bad Request | Invalid request or input |
| 404 Not Found | Book or endpoint not found |
| 500 Internal Server Error | Unexpected server error |

## 12. Postman Testing

The API was tested using Postman to verify the functionality of the endpoints.

The following operations were tested:

1. Retrieve all books.
2. Retrieve a book by ID.
3. Search books by title.
4. Sort books in ascending order.
5. Sort books in descending order.
6. Apply limit and pagination.
7. Filter books by minimum price.
8. Filter books by maximum price.
9. Filter books using a price range.
10. Combine search and sorting.
11. Add a new book.
12. Update an existing book.
13. Delete a book.

## 13. Screenshots

The following screenshots show the actual API testing outputs.

### 13.1 GET All Books

<img width="1918" height="1272" alt="Get_ALL_books" src="https://github.com/user-attachments/assets/2ce88f9f-e8c0-43df-b5c6-3d1321a0ea03" />


### 13.2 GET Book by ID

<img width="1918" height="1272" alt="Get_book_by_id" src="https://github.com/user-attachments/assets/06ac358b-c3e6-4da0-ab7e-f4db5235faa8" />


### 13.3 Search Books

<img width="1918" height="1272" alt="Search books" src="https://github.com/user-attachments/assets/044a13b2-50ea-44cf-843d-bb14234c1cfa" />


### 13.4 Search and Sort

<img width="1918" height="1272" alt="Search_sort" src="https://github.com/user-attachments/assets/0c68600c-1d81-49ab-ba2e-a25b52c04a5b" />


### 13.5 Sorting – Ascending Order

<img width="1918" height="1272" alt="price_Asc_order" src="https://github.com/user-attachments/assets/b2e5193e-57cf-44ab-add4-41839bfb03ad" />


### 13.6 Sorting – Descending Order

<img width="1918" height="1272" alt="price_DSC_order" src="https://github.com/user-attachments/assets/209f89a7-05de-4421-8a80-5c98debcad03" />


### 13.7 Limit

<img width="1918" height="1272" alt="limit" src="https://github.com/user-attachments/assets/3ad4f9ad-b4c2-4b64-a3ad-0abf86c1362e" />


### 13.8 Pagination

<img width="1918" height="1272" alt="Pagination" src="https://github.com/user-attachments/assets/46b76872-1682-4761-812f-d19b8dc343ee" />


### 13.9 Minimum Price Filter

<img width="1918" height="1272" alt="Minimum_Price" src="https://github.com/user-attachments/assets/2f974ee5-b478-4c77-abd7-b69189b131df" />

### 13.10 Maximum Price Filter

<img width="1918" height="1272" alt="Maximum_Price" src="https://github.com/user-attachments/assets/71a3ba0c-95d3-462a-9427-26256ed5d447" />


### 13.11 Price Range Filter

<img width="1918" height="1272" alt="Price_Range" src="https://github.com/user-attachments/assets/9b9b86cc-b9a1-497f-87b5-a3d310f308ca" />

### 13.12 POST – Add a New Book

<img width="1918" height="1272" alt="post_add_book" src="https://github.com/user-attachments/assets/8f3088d4-0b34-42f7-ac46-f7ed5fce31d4" />


### 13.13 PUT – Update a Book

<img width="1918" height="1272" alt="Update_book" src="https://github.com/user-attachments/assets/8529f299-a11a-416b-862f-125a018b934c" />

### 13.14 DELETE – Delete a Book

<img width="1918" height="1272" alt="Delete_book" src="https://github.com/user-attachments/assets/0f20ea89-6d2e-4c18-93bb-ec73b3901579" />

## 14. Debugging and Error Handling

During development, common backend errors were considered and debugged.

| Error | Description | Solution |
|---|---|---|
| EADDRINUSE | Port is already in use | Stop the existing server |
| MODULE_NOT_FOUND | Module or file not found | Check the file path and dependencies |
| No such table | Database table not found | Verify database and table names |
| Missing await | Asynchronous operation not awaited | Use async/await |
| Invalid input | Incorrect request data | Apply input validation |
| 404 Not Found | Requested book does not exist | Return a 404 response |

The application also uses parameterized SQL queries to prevent SQL injection.

## 15. Deployment

The backend application is deployed using Render.

**Live Application:**

https://vijayganesh-lab-3.onrender.com

**Books API:**

https://vijayganesh-lab-3.onrender.com/books

The deployed API can be accessed online without running the application locally.

## 16. Learning Outcomes

Through this project, I learned:

- How to develop REST APIs using Express.js.
- How to connect Node.js with SQLite.
- How to perform CRUD operations.
- How to use query parameters.
- How to implement search and sorting.
- How to apply pagination.
- How to filter records using price ranges.
- How to validate user input.
- How to handle HTTP status codes.
- How to test APIs using Postman.
- How to debug common backend errors.
- How to deploy applications using Render.
- How to manage projects using Git and GitHub.

## 17. Conclusion

This project helped me understand backend development and REST API concepts using Node.js, Express.js and SQLite.

I implemented CRUD operations and enhanced the API with searching, sorting, pagination, price filtering and input validation.

I also gained practical experience in testing APIs using Postman, handling errors, debugging problems and deploying a backend application using Render.

**Overall, this lab improved my practical knowledge of backend development and REST API implementation.**
