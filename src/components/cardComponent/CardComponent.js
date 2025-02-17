import React from "react";
import { Link } from "react-router-dom";
import { API_SERVER_HOST } from "../../api/goodsApi";

const host = API_SERVER_HOST;
function CardComponent({ item, width, hight, src }) {
  return (
    <div className={`relative overflow-hidden ${width} ${hight}`}>
      <Link to={`/goods/${item.gno}`}>
        <img
          src={`${host}/api/goods/view/${src}`}
          alt={item?.alt || "goods"}
          className="transition-opacity duration-500 ease-in-out hover:opacity-60"
        />
        <div className="absolute p-3 space-y-3 flex-col top-0 left-0 w-full h-full flex justify-center items-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-500 ease-in-out ">
          <div className="text-white text-xs  sm:text-sm md:text-xl font-semibold ">
            {item.title}
          </div>
          <div className="text-white hidden md:block  text-xs lg:text-sm font-semibold">
            {item.gdesc}
          </div>
          <div className="text-orange-600 hidden md:block  text-sm lg:text-lg font-semibold">
            상세보기
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardComponent;
