const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
