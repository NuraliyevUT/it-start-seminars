import axios from "axios";

// Базовый URL для запросов к серверу семинаров
const baseURL = "http://localhost:5000/seminars";

// Создание экземпляра axios с заданными настройками
const api = axios.create({
  baseURL: baseURL, // базовый URL для всех запросов
  timeout: 10000, // таймаут запроса 10 секунд
});

export default api;
