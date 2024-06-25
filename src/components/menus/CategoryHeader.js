import React, { useState } from "react";
import { Link } from "react-router-dom";

function CategoryHeader() {
  const [selectedMenu, setSelectedMenu] = useState(1);
  return (
    <div>
      {/* header menu */}
      <div className="w-full hidden lg:block border-b border-stone-200 h-16">
        <ul className="flex justify-center space-x-10 text-lg">
          <li onClick={() => setSelectedMenu(1)}>
            <Link
              to={"/contents/genre/concert"}
              className={`${
                selectedMenu === 1 && "font-bold border-b-4 border-yellow-300"
              } hover:border-b-4 border-yellow-300 hover:font-semibold`}
            >
              콘서트
            </Link>
          </li>
          <li onClick={() => setSelectedMenu(2)}>
            <Link
              to={"/contents/genre/musical"}
              className={`${
                selectedMenu === 2 && "font-bold border-b-4 border-yellow-300"
              } hover:border-b-4 border-yellow-300 hover:font-semibold`}
            >
              뮤지컬
            </Link>
          </li>
          <li onClick={() => setSelectedMenu(3)}>
            <Link
              to={"/contents/genre/play"}
              className={`${
                selectedMenu === 3 && "font-bold border-b-4 border-yellow-300"
              } hover:border-b-4 border-yellow-300 hover:font-semibold`}
            >
              연극
            </Link>
          </li>
          <li onClick={() => setSelectedMenu(4)}>
            <Link
              to={"/contents/genre/classic"}
              className={`${
                selectedMenu === 4 && "font-bold border-b-4 border-yellow-300"
              } hover:border-b-4 border-yellow-300 hover:font-semibold`}
            >
              클래식
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CategoryHeader;
