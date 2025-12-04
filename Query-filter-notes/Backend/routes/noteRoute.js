const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getCategories,
} = require("../controllers/noteController");

router.get("/categories", getCategories);

router.route("/")
  .get(getNotes)
  .post(createNote);

router.route("/:id")
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
