import axios from "axios";

const baseURL = "http://localhost:5000/seminars";

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000, // 10 секунд
});

export default api;
