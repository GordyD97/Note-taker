const router = require("express").Router();
const notes = require('../db')

router.get("/notes", (req, res) => {
  notes.readAllNotes().then((data) => res.json(data))
});

router.post("/notes", (req, res) => {
  notes.writeNotes(req.body).then((data) => res.json(data))
});

module.exports = router;