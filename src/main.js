import axios from "axios";

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
          <button type="button" class="deleteCurrentNote" data-id="${element._id}">Видалити нотатку</button>
        </li>
      `
    }

    const allBtns = document.querySelectorAll('.deleteCurrentNote');

    allBtns.forEach(element => {
      element.addEventListener('click', async (e) => {
        const id = element.dataset.id;
        await deleteCurrentNote(id);
      })
    });
}

markupNotesList();

const createNote = async () => {
  const title = noteTitleInput.value;
  const text = noteText.value;
  const _id = Math.floor(Math.random() * 100000000000);

  try {
    const {data} = await axios({url: 'http://localhost:5000/createNote', method: 'post', data: {_id: _id, title: title, text: text}});
    notesList.innerHTML = ``;
    markupNotesList();
    noteTitleInput.value = '';
    noteText.value = '';
  } catch (error) {
    console.log(error);
  }

}

createNoteBtn.addEventListener('click', createNote);

const deleteCurrentNote = async (id) => {
  
  try {
    const {data} = await axios.delete(`http://localhost:5000/deleteNote/${id}`);
  } catch (error) {
    console.log(error);
  }
  
  notesList.innerHTML = ``;
  markupNotesList();
}

const deleteAll = async () => {
  try {
    const {data} = await axios({url: 'http://localhost:5000/deleteAll', method: 'delete'});
  } catch (error) {
    console.log(error);
  }

  notesList.innerHTML = ``;
  fetchNotes();
}

deleteAllBtn.addEventListener('click', deleteAll)