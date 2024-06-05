import React from "react";

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div
      className={`fixed top-0 left-0 z-[1055] flex h-full w-full justify-center  items-center  bg-black bg-opacity-20`}
    >
      <div className="absolute bg-white shadow opacity-100 w-1/4 rounded mt-10 mb-10 px-6 min-w-[600px]">
        <div className="text-2xl  pt-4 pb-4 text-stone-700 ">{message}</div>
        {/* button */}
        <div className="justify-end flex space-x-2">
          <button
            className="rounded bg-gray-500 mt-4 mb-4 px-6 pt-4 pb-4 text-lg hover:bg-gray-400 text-white"
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
            }}
          >
            취소
          </button>
          <button
            className="rounded bg-blue-500 mt-4 mb-4 px-6 pt-4 pb-4 text-lg hover:bg-blue-400 text-white"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
