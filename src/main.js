const { default: axios } = require('axios');

const getCourses = async () => {
  try {
    const data = await axios.get('http://localhost:5000/getNotes');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getCourses();
