const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  time: { type: String }, // optional, format "HH:MM"
  date: { type: Date, required: true }, // day todo belongs to
  completed: { type: Boolean, default: false },
  expired: { type: Boolean, default: false }, // for past todos
});

module.exports = mongoose.model('Todo', todoSchema);
