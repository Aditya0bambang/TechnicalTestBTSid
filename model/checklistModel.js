const mongoose = require("mongoose");

const ChecklistSchema = new mongoose.Schema({
  listName: { type: String, required: true },
});

const Checklist = mongoose.model("Checklist", ChecklistSchema);

module.exports = Checklist;
