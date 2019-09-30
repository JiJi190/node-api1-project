const express = require("express");
const db = require("./data/db.js");
const server = express();
server.use(express.json());

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert()
      .then(user => {
        res.status(201).json(user);
      })
      .catch(500)
      .json({
        message: "There was an error while saving the user to the database"
      });
  }
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

const port = process.env.port || 7000;

server.listen(port, console.log(`Listening on port ${port}`));
