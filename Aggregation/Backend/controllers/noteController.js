const Note = require("../models/Note");


//main Functionality.
const getCategoryStats = async (req, res, next) => {
  try {
    const stats = await Note.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }  
      }
    ]);

    res.json(stats);
  } catch (err) {
    next(err);
  }
};


const getNotes = async (req, res, next) => {
  try {
    const {
      category,
      search,
      sort = "desc",
      fields,
      page = 1,
      limit = 5,
    } = req.query;

    const query = {};

    // Filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    // Text search
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ title: regex }, { content: regex }];
    }

    // Sort option
    const sortOption = sort === "asc" ? "createdAt" : "-createdAt";

    // Projection
    let projection;
    if (fields) {
      projection = fields.split(",").join(" ");
    }

    // Pagination
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Fetch paginated notes + total count
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




module.exports = {getCategoryStats, getNotes, createNote, updateNote, deleteNote };
