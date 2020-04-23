const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

// const CONTACTS_COLLECTION = "contacts";
const BooksCollection = "inventory";

const app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
const db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}

//create a new book
app.post("/api/bookstore", bookstore.create, function (req, res) {
  let newBook = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Field 'name' cannot be empty.", 400);
  } else {
    db.collection(BooksCollection).insertOne(newContact, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

//retrieve all in bookstore_list
app.get("/api/bookstore", bookstore.findAll, function (req, res) {
  db.collection(BooksCollection).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Sorry, failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

//retrieve all published books
app.get("/api/bookstore/published", bookstore.findAllPublished, function (req, res) {

});

//retrieve one book by id
app.get("/api/bookstore/:id", bookstore.findOne, function (req, res) {

});

//update a book item by id
app.put("/api/bookstore/:id", bookstore.update, function (req, res) {

});

//delete book item by id
app.delete("/api/bookstore/:id", bookstore.delete, function (req, res) {

});

//delete all books in the list
app.delete("/api/bookstore", bookstore.deleteAll, function (req, res) {

});

