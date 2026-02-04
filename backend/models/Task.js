const mongoose = require('mongoose');

const task = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model("Task", task);