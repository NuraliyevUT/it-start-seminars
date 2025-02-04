import api from "./api"; // Импортируем экземпляр API-клиента

// Функция для получения списка семинаров
export const getSeminars = async () => {
  const response = await api.get("/"); // Отправляем GET-запрос на сервер
  return response.data; // Возвращаем полученные данные
};

// Функция для добавления нового семинара
export const addSeminar = async (seminar) => {
  const response = await api.post("/", seminar); // Отправляем POST-запрос с данными семинара
  return response.data; // Возвращаем данные ответа
};

// Функция для обновления существующего семинара
export const updateSeminar = async (id, seminar) => {
  const response = await api.put(`/${id}`, seminar); // Отправляем PUT-запрос с обновленными данными семинара
  return response.data; // Возвращаем данные ответа
};

// Функция для удаления семинара
export const deleteSeminar = async (id) => {
  await api.delete(`/${id}`); // Отправляем DELETE-запрос для удаления семинара по его ID
};
