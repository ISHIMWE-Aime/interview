const mongoose = require('mongoose')

const task = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      unique: true,
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
    },
    deadline: {
      type: Date,
      required: [true, 'Date is required'],
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model('Task', task);

module.exports = { Task };
