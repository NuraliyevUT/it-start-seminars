import React, { useState, useEffect } from "react";
import { useSeminars } from "../hooks/useSeminars";

function SeminarForm({ closeModal, seminar }) {
  const { handleAddSeminar, handleUpdateSeminar } = useSeminars();

  // Локальное состояние для данных семинара
  const [seminarData, setSeminarData] = useState({
    title: "", // Название семинара
    description: "", // Описание семинара
    date: "", // Дата проведения
    time: "", // Время проведения
    photo: "", // Ссылка на изображение
  });

  // Заполняем форму данными семинара при редактировании
  useEffect(() => {
    if (seminar) {
      setSeminarData({
        ...seminar,
        date: seminar.date ? seminar.date.split(".").reverse().join("-") : "", // Преобразуем дату в формат для input
      });
    }
  }, [seminar]);

  // Обработчик изменения данных в input-полях
  const handleChange = (e) => {
    setSeminarData({ ...seminarData, [e.target.name]: e.target.value });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Преобразуем дату обратно в формат с точками (dd.mm.yyyy)
    const formattedData = {
      ...seminarData,
      date: seminarData.date.split("-").reverse().join("."),
    };

    if (seminar) {
      // Если семинар уже существует, обновляем его
      await handleUpdateSeminar(seminar.id, formattedData);
    } else {
      // Если семинар новый, добавляем его
      await handleAddSeminar(formattedData);
    }

    closeModal(); // Закрываем модальное окно после сохранения
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
        {seminar ? "Редактировать семинар" : "Добавить семинар"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле ввода названия */}
        <input
          type="text"
          name="title"
          value={seminarData.title}
          onChange={handleChange}
          placeholder="Название"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Поле ввода описания */}
        <textarea
          name="description"
          value={seminarData.description}
          onChange={handleChange}
          placeholder="Описание"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Поле ввода даты */}
          <input
            type="date"
            name="date"
            value={seminarData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Поле ввода времени */}
          <input
            type="time"
            name="time"
            value={seminarData.time}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Поле ввода ссылки на изображение */}
        <input
          type="text"
          name="photo"
          value={seminarData.photo}
          onChange={handleChange}
          placeholder="Фото URL"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Кнопка отправки формы */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-200 active:scale-95"
        >
          {seminar ? "Сохранить изменения" : "Добавить"}
        </button>
      </form>
    </div>
  );
}

export default SeminarForm;
