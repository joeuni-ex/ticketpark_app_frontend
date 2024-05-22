import React from "react";
import { Link } from "react-router-dom";

function CardComponent({ item, width, hight, src }) {
  return (
    <div className={`relative overflow-hidden ${width} ${hight}`}>
      <Link>
        <img
          src={item?.src || src}
          alt={item?.alt || "image"}
          className="transition-opacity duration-500 ease-in-out hover:opacity-60"
        />
        <div className="absolute space-y-3 flex-col top-0 left-0 w-full h-full flex justify-center items-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-500 ease-in-out ">
          <div className="text-white text-xl font-semibold ">영화 제목</div>
          <div className="text-white text-lg font-semibold">설명</div>
          <div className="text-orange-600 text-lg font-semibold">상세보기</div>
        </div>
      </Link>
    </div>
  );
}

export default CardComponent;
