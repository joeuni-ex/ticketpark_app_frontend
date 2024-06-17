import React from "react";

function AgeComponent({ age }) {
  return (
    <>
      {age === 0 ? (
        <div className="flex justify-center items-center min-w-7 min-h-7 rounded-full bg-green-600 text-xs text-white">
          전체
        </div>
      ) : (
        ""
      )}
      {age === 12 ? (
        <div className="flex justify-center items-center min-w-7 min-h-7 rounded-full bg-blue-500 text-xs text-white">
          12
        </div>
      ) : (
        ""
      )}
      {age === 15 ? (
        <div className="flex justify-center items-center min-w-7 min-h-7 rounded-full bg-yellow-500 text-xs text-white">
          15
        </div>
      ) : (
        ""
      )}
      {age === 18 ? (
        <div className="flex justify-center items-center min-w-7 min-h-7 rounded-full bg-red-500 text-xs text-white">
          18
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AgeComponent;
