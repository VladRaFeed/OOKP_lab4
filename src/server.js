const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {
  getNotes,
  createNote,
  deleteOneNote,
  deleteAll,
} = require('./controllers/notesController');

dotenv.config();

const { MONGO_URL } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Database connection successful!');
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

app.get('/getNotes', getNotes);
app.post('/createNote', createNote);
app.delete('/deleteNote/:id', deleteOneNote);
app.delete('/deleteAll', deleteAll);
