const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

//Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/book", (req, res) => {
  const book = req.body;

  // Output the book to the console for debugging
  console.log(book);
  books.push(book);

  res.send(book);
});

app.post("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const newBook = req.body;

  for (let i = 0; i < books.length; i++) {
    if (book[i].isbn === isbn) {
      books[i] = newBook;
    }
  }

  res.send("Book is edited");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  for (let book of books) {
    if (book.isbn === isbn) {
      res.json(book);
      return;
    }
  }

  res.status(404).send("Book not found");
});

app.delete("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  books = books.filter((i) => {
    if (i.isbn !== isbn) {
      return true;
    }
    return false;
  });

  res.send("Book is deleted");
});

app.listen(port, () => console.log(`Book api listening on port ${port}!`));
