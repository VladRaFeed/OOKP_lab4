const noteModel = require('../models/noteModel');

const getNotes = (req, res) => {
  noteModel
    .find({})
    .then(function (note) {
      res.json(note);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const getNoteById = (req, res) => {
  const id = req.params.id;
  noteModel
    .findById({ id })
    .then(function (note) {
      res.json(note);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const createNote = (req, res) => {
  const data = req.body;
  const newNote = {};

  if (data) {
    newNote._id = data._id;
    newNote.title = data.title;
    newNote.text = data.text;
  }

  noteModel.create(newNote);

  res.status(201).json({
    code: 201,
    status: 'Created',
    data: newNote,
  });
};

const deleteOneNote = (req, res) => {
  const id = req.params.id;

  noteModel
    .findByIdAndDelete(id)
    .then(function (note) {
      if (note) {
        res.status(200).json({
          code: 200,
          status: 'deleted',
        });
      } else {
        res.status(400).json({
          status: 400,
          message: 'Нотатку не знайдено!',
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};

const deleteAll = async (req, res) => {
  try {
    const result = await noteModel.deleteMany({});
    res.status(200).json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  deleteOneNote,
  deleteAll,
};
