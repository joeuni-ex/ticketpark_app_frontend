import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import { RiSearchLine } from "react-icons/ri";
import { useSelector } from "react-redux";

function BasicMenu() {
  //로그인 상태 데이터
  const loginState = useSelector((state) => state.loginSlice);

  const [menuToggle, setMenuToggle] = useState(false);

  const handleClickMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  //사이드바 애니메이션 상태
  const boxVariants = {
    initial: { opacity: 0, y: -50 }, // 초기 상태
    animate: { opacity: 1, y: 0 }, // 애니메이션 진행 중 상태
    exit: { opacity: 0, y: -100 }, // 애니메이션 종료 상태
  };
  // 애니메이션 지속 시간 및 이징 함수 정의
  const transition = { duration: 0.5, ease: "easeInOut" };

  return (
    <div>
      <nav
        id="navbar"
        className="flex lg:justify-normal flex-col items-center px-5 lg:px-10 pb-8 border-b border-stone-200 "
      >
        <div className="flex w-full justify-between items-center h-20">
          <div className="flex items-center space-x-1 lg:w-1/4 font-extrabold text-2xl ">
            <Link to={"/"} className="flex">
              <div className="flex items-center">TicketPark</div>
              <img src="/logo.png" alt="" className="w-8  h-8" />
            </Link>
          </div>
          <div className="flex space-x-7">
            {/* searchbar */}
            <div className="flex space-x-1">
              <input
                type="text"
                name=""
                id=""
                className="border-b-2 border-black w-60 outline-none"
              />
              <RiSearchLine className="text-xl" />
            </div>
            {/* web */}
            <div className="justify-end w-2/4 space-x-2  hidden lg:flex">
              <Link>
                <FaUserAlt className="text-lg" />
              </Link>
              <Link>
                <FaUserAlt className="text-lg" />
              </Link>
              <Link>로그아웃</Link>
            </div>
            {/* mobile menu toggle*/}
            <div className="lg:hidden">
              <GiHamburgerMenu
                onClick={handleClickMenuToggle}
                className="text-lg"
              />
            </div>
          </div>
        </div>
        {/* header menu */}
        <div className="w-full hidden lg:block">
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
      </nav>

      {/* 사이드 바 - 모바일  */}

      {menuToggle && (
        <motion.main
          variants={boxVariants} // 애니메이션 상태 객체 적용
          initial="initial" // 초기 상태 설정
          animate="animate" // 애니메이션 진행 중 상태 설정
          exit="exit" // 애니메이션 종료 상태 설정
          transition={transition} // 애니메이션 지속 시간 및 이징 함수 설정
          className="lg:hidden w-full bg-white z-50"
        >
          <aside className="flex justify-center p-4">
            <ul className="text-lg space-y-4">
              <li>
                <Link to={"/genre/genrelist"}>콘서트</Link>
              </li>
              <li>
                <Link to={"/genre/genrelist"}>뮤지컬</Link>
              </li>
              <li>
                <Link to={"/genre/genrelist"}>연극</Link>
              </li>
              <li>
                <Link to={"/genre/genrelist"}>클래식</Link>
              </li>
            </ul>
          </aside>
        </motion.main>
      )}
    </div>
  );
}

export default BasicMenu;
