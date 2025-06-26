const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  isComplete: { type: Boolean },
  id_checklist: { type: mongoose.Schema.Types.ObjectId, ref: "checklist" },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
