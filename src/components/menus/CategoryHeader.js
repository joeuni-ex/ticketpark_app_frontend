import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CategoryHeader() {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const param = useParams();

  useEffect(() => {
    setSelectedMenu(param.genre);
  }, [selectedMenu, param.genre]);

  return (
    <div>
      {/* header menu */}
      <div className="w-full hidden lg:block border-b border-stone-200 h-16">
        <ul className="flex justify-center space-x-10 text-lg">
          <li onClick={() => setSelectedMenu("concert")}>
            <Link
              to={"/contents/genre/concert"}
              className={`${
                selectedMenu === "concert" &&
                "font-bold border-b-4 border-yellow-300"
              } hover:border-b-4 border-yellow-300 hover:font-semibold`}
            >
              콘서트
            </Link>
          </li>
          <li onClick={() => setSelectedMenu("musical")}>
            <Link
              to={"/contents/genre/musical"}
              className={`${
                selectedMenu === "musical" &&
                "font-bold border-b-4 border-yellow-300"
              } hover:border-b-4 border-yellow-300 hover:font-semibold`}
            >
              뮤지컬
            </Link>
          </li>
          <li onClick={() => setSelectedMenu("play")}>
            <Link
              to={"/contents/genre/play"}
              className={`${
                selectedMenu === "play" &&
                "font-bold border-b-4 border-yellow-300"
              } hover:border-b-4 border-yellow-300 hover:font-semibold`}
            >
              연극
            </Link>
          </li>
          <li onClick={() => setSelectedMenu("classic")}>
            <Link
              to={"/contents/genre/classic"}
              className={`${
                selectedMenu === "classic" &&
                "font-bold border-b-4 border-yellow-300"
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
