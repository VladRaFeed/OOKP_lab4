const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    _id: Number,
    title: String,
    text: String,
  },
  { versionKey: false }
);

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;
