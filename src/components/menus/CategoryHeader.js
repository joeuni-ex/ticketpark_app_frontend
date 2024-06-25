import React from "react";
import { Link } from "react-router-dom";

function CategoryHeader() {
  return (
    <div>
      {/* header menu */}
      <div className="w-full hidden lg:block border-b border-stone-200 h-16">
        <ul className="flex justify-center space-x-10 text-lg">
          <li>
            <Link
              to={"/contents/genre/concert"}
              className="hover:border-b-4 border-yellow-300 hover:font-semibold"
            >
              콘서트
            </Link>
          </li>
          <li>
            <Link
              to={"/contents/genre/musical"}
              className="hover:border-b-4 border-yellow-300 hover:font-semibold"
            >
              뮤지컬
            </Link>
          </li>
          <li>
            <Link
              to={"/contents/genre/play"}
              className="hover:border-b-4 border-yellow-300 hover:font-semibold"
            >
              연극
            </Link>
          </li>
          <li>
            <Link
              to={"/contents/genre/classic"}
              className="hover:border-b-4 border-yellow-300 hover:font-semibold"
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
