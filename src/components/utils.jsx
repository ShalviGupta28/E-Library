import axios from 'axios';

const github = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes?q=search+terms",
  timeout: 15000
});


export { github };