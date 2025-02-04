import React, { useState, useEffect } from "react";
import { useSeminars } from "../hooks/useSeminars";

function SeminarForm({ closeModal, seminar }) {
  const { handleAddSeminar, handleUpdateSeminar } = useSeminars();
  const [seminarData, setSeminarData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    photo: "",
  });

  useEffect(() => {
    if (seminar) {
      setSeminarData({
        ...seminar,
        date: seminar.date ? seminar.date.split(".").reverse().join("-") : "", // Convert to input format
      });
    }
  }, [seminar]);

  const handleChange = (e) => {
    setSeminarData({ ...seminarData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...seminarData,
      date: seminarData.date.split("-").reverse().join("."),
    };

    if (seminar) {
      await handleUpdateSeminar(seminar.id, formattedData);
    } else {
      await handleAddSeminar(formattedData);
    }
    closeModal();
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
        {seminar ? "Редактировать семинар" : "Добавить семинар"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={seminarData.title}
          onChange={handleChange}
          placeholder="Название"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="description"
          value={seminarData.description}
          onChange={handleChange}
          placeholder="Описание"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={seminarData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="time"
            name="time"
            value={seminarData.time}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <input
          type="text"
          name="photo"
          value={seminarData.photo}
          onChange={handleChange}
          placeholder="Фото URL"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
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
