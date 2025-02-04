import React, { useState, useEffect, useCallback } from "react";
import CustomTable from "../ui/table";
import CustomModal from "../ui/modal";
import SeminarForm from "../components/SeminarForm";
import { useSeminars } from "../hooks/useSeminars";

function Home() {
  const { fetchSeminars, handleDeleteSeminar } = useSeminars();
  const [seminars, setSeminars] = useState([]);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSeminars().then(setSeminars);
  }, []);

  const refreshSeminars = useCallback(() => {
    fetchSeminars().then(setSeminars);
  }, []);

  const openModal = (type, seminar = null) => {
    setSelectedSeminar(seminar);
    setModalState((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
    setSelectedSeminar(null);
  };

  const handleDelete = async () => {
    if (!selectedSeminar) return;
    await handleDeleteSeminar(selectedSeminar.id);
    refreshSeminars();
    closeModal("delete");
  };

  // Pagination calculations
  const totalPages = Math.ceil(seminars?.length / itemsPerPage);
  const paginatedData = seminars?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <div className="sticky top-0 bg-white z-10 shadow-md p-4 flex justify-between items-center mb-2 rounded-2xl">
        <h1 className="text-xl font-semibold">Список семинаров</h1>
        <button
          onClick={() => openModal("add")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Добавить семинар
        </button>
      </div>

      {/* Add & Edit Modals */}
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

      {/* Content Section */}
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

          {/* Pagination Controls */}
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Вперед
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="h-[550px] flex justify-center items-center">
          <p className="text-gray-500 text-lg">Данные отсутствуют</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
