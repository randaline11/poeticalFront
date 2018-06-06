import axios from 'axios';
// const ROOT_URL = 'https://cs52lab5pt2astarr.herokuapp.com/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

// const ROOT_URL = process.env.POETICAL_DB;
// const ROOT_URL = 'mongodb://admin:admin@ds121599.mlab.com:21599/poeticalscience';
const ROOT_URL = 'https://poeticalscience.herokuapp.com/api';
// console.log('poetical db is: ', process.env.POETICAL_DB);
// const API_KEY = '?key=a_starr';

function fetchBooks() {
  return new Promise((fulfill, reject) => {
    axios.get(`${ROOT_URL}/books`).then((response) => {
      fulfill(response);
    }).catch((error) => {
      reject(error);
      console.log(`hit an error! ${error}`);
    });
  });
}

function fetchBook(id) {
  return new Promise((fulfill, reject) => {
    axios.get(`${ROOT_URL}/books/${id}`).then((response) => {
      fulfill(response);
    }).catch((error) => {
      reject(error);
      console.log(`hit an error! ${error}`);
    });
  });
}

function fetchPoets() {
  return new Promise((fulfill, reject) => {
    axios.get(`${ROOT_URL}/poets`).then((response) => {
      fulfill(response);
    }).catch((error) => {
      reject(error);
      console.log(`hit an error! ${error}`);
    });
  });
}

function fetchPoetByName(name) {
  return new Promise((fulfill, reject) => {
    axios.get(`${ROOT_URL}/poets/getByName/${name}`).then((response) => {
      fulfill(response);
    }).catch((error) => {
      reject(error);
      console.log(`hit an error! ${error}`);
    });
  });
}

function fetchPoetById(id) {
  return new Promise((fulfill, reject) => {
    axios.get(`${ROOT_URL}/poets/${id}`).then((response) => {
      fulfill(response);
    }).catch((error) => {
      reject(error);
      console.log(`hit an error! ${error}`);
    });
  });
}

export { fetchBooks, fetchPoets, fetchPoetById, fetchBook, fetchPoetByName };
