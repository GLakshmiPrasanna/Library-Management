# Library Management API

This project implements a simple RESTful API for managing a library system. The API supports basic CRUD operations on books and interacts with a MongoDB database for data storage.

## Prerequisites:
- Node.js: It provides the runtime environment for executing JavaScript on the server side. You can download and install Node.js from the official website: Node.js Downloads.
- MongoDB: The API uses MongoDB as its database system. You need to install MongoDB on your machine. You can download and install MongoDB from the official website: MongoDB Downloads.
- npm (Node Package Manager): npm is used to manage the dependencies (libraries, frameworks, etc.) required by the API. Users don't need to install npm separately, it comes bundled with Node.js.
## Installation:
- Clone the repository: [Repository link](https://github.com/GLakshmiPrasanna/Library-Management)
<br>`git clone https://github.com/GLakshmiPrasanna/Library-Management.git`
- Move to the directory where the project is cloned using ‘cd’ command
- Install dependencies using command
<br>`npm install`
- Configure the database connection by editing the index.js file with your MongoDB connection details.
## Running the Application:
- Start the server using command:
<br>`npm start`
- The server will run on http://localhost:3000 by default. (Port number can be changed in index.js file).

## API Endpoints:
- ### Retrieve All Books
  - **Endpoint:** GET /api/books
  - **Description:** Retrieves a list of all books in the library.
  - **Response:** Array of book objects in “JSON String format”.
- ### Add a New Book
  - **Endpoint:** POST /api/books 
  - **Description:** Adds a new book to the library.
  - **Request Body:** JSON object representing the new book (id, name).
  ```
  Ex:
   {
  	“id”:”1”,
  	“name”:”book1”
   }
  ```
  - **Response:** Redirects to the main page if a new book is added successfully. It displays a message if the book already exists or the request is not in json format. 
- ### Update Book Details
  - **Endpoint:** PATCH /api/books/:id
  - **Description:** Updates the details of a specific book(Book name) in the library.
  - **Request Body:** JSON object with updated book details (name).
  ```
  Ex:
   {
  	“name”:”book1”
   }
  (Id field value is used in endpoint to update the particular book)
  ```
  - **Response:** Redirects to the main page and the value will get updated if the book exists. It displays a message if the book does not exist or the request is not in json format. 
## Seeding the Database with Mock Data:
- To seed the database with mock data, you can add a code snippet like
  ```
  const mockData = async () => {
    // Array of mock book data
    const mockBooks = [
      { id: '1', name: 'Mock Book 1' },
      { id: '2', name: 'Mock Book 2' },
      // Add as many mock books as needed
    ];
    // Insert mock books into the database
    try {
      await bookModel.insertMany(mockBooks);
      console.log('Database seeded with mock data.');
    } catch (error) {
      console.error('Error seeding database with mock data:', error);
    }
    };
    ```
- Or use a tool like ‘MongoDB Compass’ or ‘Mongosh’ shell. Insert documents into the BookList collection with unique IDs and book names.
## Additional Notes:
- Ensure that MongoDB is running and accessible before starting the application.
- Proper error handling is implemented for database connection issues and duplicate book entries.
- The application includes a simple web interface with forms for adding, updating and retrieving books. Access it by visiting http://localhost:3000 in your browser.
- Postman can also be used to test the API using the provided endpoints.

