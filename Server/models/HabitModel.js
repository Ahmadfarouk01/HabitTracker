const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // links to User model
    },
    title: { type: String, required: true },
    time: { type: String },
    completedDates: [{ type: Date }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Habit', habitSchema);
