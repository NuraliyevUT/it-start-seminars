import React, { useState, useEffect, useCallback } from "react";
import CustomTable from "../ui/table";
import CustomModal from "../ui/modal";
import SeminarForm from "../components/SeminarForm";
import { useSeminars } from "../hooks/useSeminars";

function Home() {
  // Получаем функции для работы с семинарами
  const { fetchSeminars, handleDeleteSeminar } = useSeminars();

  // Состояния для хранения списка семинаров и текущего выбранного семинара
  const [seminars, setSeminars] = useState([]);
  const [selectedSeminar, setSelectedSeminar] = useState(null);

  // Состояние управления модальными окнами
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  // Состояние пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Получение списка семинаров при загрузке страницы
  useEffect(() => {
    fetchSeminars().then(setSeminars);
  }, []);

  // Функция обновления списка семинаров
  const refreshSeminars = useCallback(() => {
    fetchSeminars().then(setSeminars);
  }, []);

  // Открытие модального окна
  const openModal = (type, seminar = null) => {
    setSelectedSeminar(seminar);
    setModalState((prev) => ({ ...prev, [type]: true }));
  };

  // Закрытие модального окна
  const closeModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
    setSelectedSeminar(null);
  };

  // Удаление семинара
  const handleDelete = async () => {
    if (!selectedSeminar) return;
    await handleDeleteSeminar(selectedSeminar.id);
    refreshSeminars();
    closeModal("delete");
  };

  // Вычисление данных для пагинации
  const totalPages = Math.ceil(seminars?.length / itemsPerPage);
  const paginatedData = seminars?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      {/* Верхняя панель с заголовком и кнопкой добавления */}
      <div className="sticky top-0 bg-white z-10 shadow-md p-4 flex justify-between items-center mb-2 rounded-2xl">
        <h1 className="text-xl font-semibold">Список семинаров</h1>
        <button
          onClick={() => openModal("add")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Добавить семинар
        </button>
      </div>

      {/* Модальные окна для добавления и редактирования семинаров */}
      {["add", "edit"].map((type) => (
        <CustomModal
          key={type}
          maxW="480px"
          isOpen={modalState[type]}
          onClose={() => closeModal(type)}
          title={type === "add" ? "Добавить семинар" : "Редактировать семинар"}
        >
          <SeminarForm
            closeModal={() => {
              refreshSeminars();
              closeModal(type);
            }}
            seminar={selectedSeminar}
          />
        </CustomModal>
      ))}

      {/* Таблица с данными */}
      {seminars?.length > 0 ? (
        <>
          <div className="h-[550px] overflow-y-auto">
            <CustomTable
              headers={["Фото", "Название", "Описание", "Дата", "Время"]}
              data={paginatedData}
              dataKeys={["photo", "title", "description", "date", "time"]}
              onEdit={(seminar) => openModal("edit", seminar)}
              showDelete
              onDelete={(seminar) => openModal("delete", seminar)}
            />
          </div>

          {/* Элементы управления пагинацией */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 gap-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Назад
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Вперед
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="h-[550px] bg-white rounded-2xl flex justify-center items-center">
          <p className="text-gray-500 text-lg">Данные отсутствуют</p>
        </div>
      )}

      {/* Модальное окно подтверждения удаления */}
      <CustomModal
        maxW="400px"
        isOpen={modalState.delete}
        onClose={() => closeModal("delete")}
        title="Удалить семинар"
      >
        <p>Вы уверены, что хотите удалить этот семинар?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={() => closeModal("delete")}
          >
            Отмена
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={handleDelete}
          >
            Удалить
          </button>
        </div>
      </CustomModal>
    </div>
  );
}

export default Home;
