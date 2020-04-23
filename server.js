const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const BooksCollection = "inventory";

const app = express();
app.use(bodyParser.json());


// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }


 // Create a database variable outside of the database connection callback to reuse the connection pool in your app.
// Save database object from the callback for reuse.
let db = client.db();


  // Initialize the app.
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}

//create a new book > bookstore.create
app.post("/api/bookstore", function (req, res) {
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

//retrieve all in bookstore_list > bookstore.findAll,
app.get("/api/bookstore", function (req, res) {
  db.collection(BooksCollection).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Sorry, failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

//retrieve all published books > bookstore.findAllPublished
app.get("/api/bookstore/published", function (req, res) {

});

//retrieve one book by id > bookstore.findOne,
app.get("/api/bookstore/:id", function (req, res) {

});

//update a book item by id > , bookstore.update
app.put("/api/bookstore/:id", function (req, res) {
  let updateBook = req.body;
  delete updateBook._id;

  db.collection(BooksCollection).update({_id: new ObjectID(req.params.id)}, updateBook, function(err, doc){
    if (err){
      handleError(res,err.message, "Error on updating book item");
    } else {
      updateBook._id = req.params.id;
      res.status(200).json(updateBook);
    }
  });
});

//delete book item by id >  bookstore.delete,
app.delete("/api/bookstore/:id", function (req, res) {
  db.collection(BooksCollection).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result){
    if (err) {
      handleError(res, err.message, "Error on deleting book title");
    }
  });
});


