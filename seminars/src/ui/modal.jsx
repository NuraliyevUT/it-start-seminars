import { useEffect } from "react";

function CustomModal({ isOpen, onClose, title, children, maxW = "w-[29.18vw]", closeOnOverlay = false }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className={`relative bg-white rounded-lg shadow-lg overflow-auto max-h-[95vh] ${maxW}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-4xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
      {closeOnOverlay && (
        <div className="absolute inset-0" onClick={onClose}></div>
      )}
    </div>
  );
}

export default CustomModal;
