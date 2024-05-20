import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";

function BasicMenu() {
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
        className="flex justify-between md:justify-normal items-center px-5 md:px-10 h-20"
      >
        <div className="flex items-center space-x-1 md:w-1/5 font-extrabold text-2xl ">
          <p>Ticket Park</p>
          <IoTicketSharp />
        </div>
        <div className="w-3/5 hidden md:block">
          <ul className="flex justify-center space-x-6 text-lg">
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
        </div>
        {/* web */}
        <div className="justify-end w-1/5 space-x-2  hidden md:flex">
          <Link>
            <FaUserAlt className="text-lg" />
          </Link>
          <Link>
            <FaUserAlt className="text-lg" />
          </Link>
          <Link>로그아웃</Link>
        </div>
        {/* mobile */}
        <div className="md:hidden">
          <GiHamburgerMenu
            onClick={handleClickMenuToggle}
            className="text-lg"
          />
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
          className="md:hidden w-full bg-white z-50"
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
