import React from "react";

function ReadPage() {
  return (
    <div className="flex  justify-center">
      {/* left */}
      <div className="flex flex-col w-6/12 bg-slate-500">
        <div>제목</div>
        <div className="flex">
          <div className="w-80 h-96 bg-green-500">
            <img src="" alt="" />
          </div>

          <div>
            <p>장소 </p>
            <p>장소 </p>
            <p>장소 </p>
            <p>장소 </p>
            <p>장소 </p>
          </div>
        </div>
        <div>공연정보/ 관람후기</div>
      </div>

      {/* right */}
      <div className="flex w-3/12 h-screen bg-blue-400 flex-col ">
        <div className="flex border flex-col items-center rounded justify-center sticky top-0 bg-red-500">
          {/* cal */}
          <div className="h-96">달력</div>
          <div className="flex justify-center items-center  w-80 h-16 rounded text-xl text-white font-bold bg-yellow-400">
            예매하기
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadPage;
