const Note = require("../models/Note");

// desc    Get all notes with filter/sort/projection
// route   GET /api/notes
// access  Public
const getNotes = async (req, res, next) => {
  try {
    const {
      category,    // filter by category
      search,      // search in title/content
      sort = "desc", // asc | desc (by createdAt)
      fields,      // projection: "title,category"
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    // Text search (simple regex)
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ title: regex }, { content: regex }];
    }

    // Sort by createdAt
    const sortOption = sort === "asc" ? "createdAt" : "-createdAt";

    // Projection / fields selection
    // ?fields=title,category => "title category"
    let projection;
    if (fields) {
      projection = fields.split(",").join(" ");
    }

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const [notes, total] = await Promise.all([
      Note.find(query)
        .select(projection)
        .sort(sortOption)
        .skip(skip)
        .limit(pageSize),
      Note.countDocuments(query),
    ]);

    res.json({
      data: notes,
      meta: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create note
// @route   POST /api/notes
// @access  Public
const createNote = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      res.status(400);
      throw new Error("Title, content and category are required");
    }

    const note = await Note.create({ title, content, category });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Public
const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    const { title, content, category } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (category !== undefined) note.category = category;

    const updated = await note.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Public
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    await note.deleteOne();
    res.json({ message: "Note removed" });
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Note.distinct("category");
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote ,getCategories};
