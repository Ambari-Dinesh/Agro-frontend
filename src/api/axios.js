import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, 
});
console.log(process.env.REACT_APP_BACKEND_URL); 
export default instance;
