import React from 'react';

const Modal = ({ open, onClose, children }) => {
  return (
    //backdrop
    <div
      onClick={onClose}
      className={`
      z-40 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto
      inset-0 flex justify-center overflow-auto items-center transition-colors
      ${open ? 'visible bg-black/20' : 'invisible'}
      `}
    >
      <div className="sm:h-[calc(100%-3rem)] max-w-lg my-6 mx-auto relative w-auto">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
          `}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg
              text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            <>X</>
          </button>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
