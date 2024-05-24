import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

function ListPage() {
  const genreParam = useParams();

  const [genre, setGenre] = useState("콘서트"); //컨텐츠 종류

  useEffect(() => {
    if (genreParam.genre == "musical") {
      setGenre("뮤지컬");
    } else if (genreParam.genre == "concert") {
      setGenre("콘서트");
    } else if (genreParam.genre == "play") {
      setGenre("연극");
    } else if (genreParam.genre == "classic") {
      setGenre("클래식");
    }
  }, [genreParam]);

  return (
    <div className="flex flex-col">
      {/* List */}
      <div className="flex flex-col justify-center items-center space-y-10 py-20">
        <div className="text-3xl font-bold">{`${genre}`} 둘러보기</div>
        <div className="flex flex-wrap w-9/12 gap-7 justify-center">
          {/* 1 */}

          <Link className="w-56 overflow-hidden space-y-2 ">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
            <div className="border rounded border-purple-500 w-20 text-sm p-1 flex items-center justify-center font-semibold text-purple-700">
              단독판매
            </div>
          </Link>
          {/* 2 */}
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
            <div className="border rounded border-purple-500 w-20 text-sm p-1 flex items-center justify-center font-semibold text-purple-700">
              단독판매
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
