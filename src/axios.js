import axios from 'axios';
// const ROOT_URL = 'https://cs52lab5pt2astarr.herokuapp.com/api';
 // const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
 const ROOT_URL = 'http://localhost:9090/api';
// const API_KEY = '?key=a_starr';

function fetchBooks() {
  return new Promise((fulfill, reject) => {
    console.log('fetchBooks');

    axios.get(`${ROOT_URL}/books`).then((response) => {
      console.log(`success! ${JSON.stringify(response)}`);
      fulfill(response);
    }).catch((error) => {
      reject(error);
      console.log(`hit an error! ${error}`);
    });
  });
}

function fetchBook(id) {
  return new Promise((fulfill, reject) => {
    console.log('fetchBook');

    axios.get(`${ROOT_URL}/books/${id}`).then((response) => {
      console.log(`success! ${JSON.stringify(response)}`);
      fulfill(response);
    }).catch((error) => {
      reject(error);
      console.log(`hit an error! ${error}`);
    });
  });
}

function fetchPoets() {
  return new Promise((fulfill, reject) => {
    console.log('fetchPoets');

    axios.get(`${ROOT_URL}/poets`).then((response) => {
      console.log(`success! ${JSON.stringify(response)}`);
      fulfill(response);
    }).catch((error) => {
      reject(error);
      console.log(`hit an error! ${error}`);
    });
  });
}

export {fetchBooks, fetchPoets, fetchBook};
// export function createPost(post, history) {
//   return (dispatch) => {
//     console.log('in createPost');
//
//     const fields = { title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url };
//     axios.post(`${ROOT_URL}/posts`, fields, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
//       console.log(`created post! response: ${response.data}`);
//       history.goBack();
//       dispatch({ type: 'FETCH_POST', payload: { stuff: response.data } });
//       console.log(`history? ${history}`);
//     }).catch((error) => {
//       // hit an error do something else!
//       console.log(`hit an error! ${error}`);
//     });
//   };
// }
//
// export function updatePost(post, id) {
//   return (dispatch) => {
//     console.log('in updatePost');
//
//     const fields = { title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url };
//     axios.put(`${ROOT_URL}/posts/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
//       console.log(`updated post! response: ${response.data}`);
//       console.log(response);
//       dispatch({ type: 'UPDATE_POSTS', payload: response.data });
//     }).catch((error) => {
//       // hit an error do something else!
//       console.log(`hit an error! ${error}`);
//     });
//   };
// }
//
// export function fetchPost(id) {
//   return (dispatch) => {
//     console.log('in fetchPost');
//
//     axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
//       dispatch({ type: 'FETCH_POST', payload: response.data });
//     }).catch((error) => {
//       // hit an error do something else!
//       console.log(`hit an error! ${error}`);
//     });
//   };
// }
//
// export function deletePost(id, history) {
//   return (dispatch) => {
//     console.log('in deletePost');
//
//     axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
//       history.goBack();
//       dispatch({ type: 'FETCH_POST', payload: response.data });
//     }).catch((error) => {
//       // hit an error do something else!
//       console.log(`hit an error! ${error}`);
//     });
//   };
// }
