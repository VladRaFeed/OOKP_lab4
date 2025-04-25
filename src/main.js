import axios from "axios";

// const getCourses = async () => {
//   try {
//     const data = await axios.get('http://localhost:5000/getNotes');
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// getCourses();

const readBtn = document.querySelector('.readBtn');
const notesList = document.querySelector('.nodesList');
const noteTitleInput = document.querySelector('.noteTitle');
const noteText = document.querySelector('.noteText');
const createNoteBtn = document.querySelector('.createNoteBtn');
const deleteAllBtn = document.querySelector('.deleteAllBtn');


const fetchNotes = async () => {
    try {
      const {data} = await axios.get('http://localhost:5000/getNotes');
      return data;
    } catch (error) {
      console.log(error);
    }
}

const markupNotesList = async () => {
    const markupData = await fetchNotes();
    for (let i = 0; i < markupData.length; i++) {
      const element = markupData[i];
      notesList.innerHTML += `
        <li key=${element._id}>
          <h2>${element.title}</h2>
          <p>${element.text}</p>
          <button type="button" class="deleteCurrentNote">Видалити нотатку</button>
        </li>
      `
      console.log(element);
    }
}

readBtn.addEventListener('click', markupNotesList);

const createNote = async () => {
  const title = noteTitleInput.value;
  const text = noteText.value;
  const _id = Math.floor(Math.random() * 100000000000);

  console.log(title, text, _id);

  try {
    const {data} = await axios({url: 'http://localhost:5000/createNote', method: 'post', data: {_id: _id, title: title, text: text}});
    console.log(data)
    // return data;
  } catch (error) {
    console.log(error);
  }
}

createNoteBtn.addEventListener('click', createNote);

const deleteCurrentNote = async (id) => {
  try {
    const {data} = await axios({url: 'http://localhost:5000/deleteNote', method: 'delete', params: {_id: id}});
    console.log(data)
    // return data;
  } catch (error) {
    console.log(error);
  }
  
  notesList.innerHTML = ``;
  fetchNotes();
}

const deleteAll = async () => {
  try {
    const {data} = await axios({url: 'http://localhost:5000/deleteAll', method: 'delete'});
    console.log(data)
    // return data;
  } catch (error) {
    console.log(error);
  }

  notesList.innerHTML = ``;
  fetchNotes();
}

deleteAllBtn.addEventListener('click', deleteAll)