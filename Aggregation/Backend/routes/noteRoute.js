const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getCategoryStats,
} = require("../controllers/noteController");

router.get("/category-stats", getCategoryStats);

router.route("/")
  .get(getNotes)
  .post(createNote);

router.route("/:id")
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
