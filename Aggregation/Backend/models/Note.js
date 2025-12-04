const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true, // for fast category filter
    }
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

noteSchema.index({ createdAt: -1 }); // for sorting by date

module.exports = mongoose.model("Note", noteSchema);
