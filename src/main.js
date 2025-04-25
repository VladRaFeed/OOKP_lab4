// const { default: axios } = require('axios');

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

const fetchNotes = async () => {
    try {
      const data = await axios.get('http://localhost:5000/getNotes');
      return data
    } catch (error) {
      console.log(error);
    }
}

readBtn.addEventListener('click', fetchNotes)

console.log(readBtn)