import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Access the environment variable
});
console.log(process.env.REACT_APP_BACKEND_URL); // It should now print the correct URL
export default instance;
