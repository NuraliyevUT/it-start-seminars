import { useState } from "react";
import {
  getSeminars,
  addSeminar,
  updateSeminar,
  deleteSeminar,
} from "../service/seminarService";

// Кастомный хук для работы с семинарами
export const useSeminars = () => {
  const [loading, setLoading] = useState(false); // Состояние загрузки

  // Функция-обёртка для обработки запросов к API
  const handleRequest = async (callback) => {
    setLoading(true); // Устанавливаем состояние загрузки
    try {
      return await callback(); // Выполняем переданный колбэк (запрос к API)
    } catch (error) {
      console.error("Seminar API error:", error); // Выводим ошибку в консоль
      throw error; // Прокидываем ошибку дальше
    } finally {
      setLoading(false); // Сбрасываем состояние загрузки
    }
  };

  // Функция для получения списка семинаров
  const fetchSeminars = () => handleRequest(() => getSeminars());

  // Функция для добавления нового семинара
  const handleAddSeminar = (seminar) =>
    handleRequest(() => addSeminar(seminar));

  // Функция для обновления данных семинара
  const handleUpdateSeminar = (id, updatedSeminar) =>
    handleRequest(() => updateSeminar(id, updatedSeminar));

  // Функция для удаления семинара
  const handleDeleteSeminar = (id) => handleRequest(() => deleteSeminar(id));

  return {
    loading, // Состояние загрузки
    fetchSeminars, // Функция получения семинаров
    handleAddSeminar, // Функция добавления семинара
    handleUpdateSeminar, // Функция обновления семинара
    handleDeleteSeminar, // Функция удаления семинара
  };
};
