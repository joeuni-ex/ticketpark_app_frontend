import React from "react";

function ResultModal({ title, content, callbackFn }) {
  return (
    <div
      className={`fixed top-0 left-0 z-[1055] flex h-full w-full justify-center  items-center  bg-black bg-opacity-20`}
    >
      <div className="absolute bg-white shadow opacity-100 w-1/4 rounded mt-10 mb-10 px-6 min-w-[600px]">
        <div className="justify-center bg-warning-400 mt-6 mb-6 text-xl border-b-2 border-orange-400 font-semibold">
          {title}
        </div>
        <div className="text-2xl  pt-4 pb-4 text-stone-700 ">{content}</div>
        {/* button */}
        <div className="justify-end flex">
          <button
            className="rounded bg-amber-400 mt-4 mb-4 px-6 pt-4 pb-4 text-lg hover:bg-amber-300 text-white"
            onClick={() => {
              if (callbackFn) {
                callbackFn();
              }
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
