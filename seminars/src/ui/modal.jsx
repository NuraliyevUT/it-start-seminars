import { useEffect } from "react";

function CustomModal({
  isOpen,
  onClose,
  title,
  children,
  maxW = "w-[29.18vw]",
  closeOnOverlay = false,
}) {
  // Хук useEffect следит за изменением isOpen и управляет прокруткой body
  useEffect(() => {
    if (isOpen) {
      // Если модальное окно открыто, запрещаем прокрутку страницы
      document.body.classList.add("overflow-hidden");
    } else {
      // Если модальное окно закрыто, разрешаем прокрутку страницы
      document.body.classList.remove("overflow-hidden");
    }
    // Очистка эффекта: при размонтировании компонента всегда удаляем класс overflow-hidden
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // Если модальное окно не открыто, ничего не рендерим
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      {/* Основное окно модального окна */}
      <div
        className={`relative bg-white rounded-lg shadow-lg overflow-auto max-h-[95vh] ${maxW}`}
      >
        {/* Заголовок модального окна с кнопкой закрытия */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-4xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {/* Контент модального окна */}
        <div className="p-4">{children}</div>
      </div>
      {/* Если closeOnOverlay установлен в true, то по клику на затемненную область закрываем модальное окно */}
      {closeOnOverlay && (
        <div className="absolute inset-0" onClick={onClose}></div>
      )}
    </div>
  );
}

export default CustomModal;
