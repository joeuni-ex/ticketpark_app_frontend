import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";

function MemberMenu() {
  const { doLogout, moveToPath, loginState } = useCustomLogin(); //로그인 커스텀 훅

  const [searchWord, setSearchWord] = useState("");

  const [menuToggle, setMenuToggle] = useState(false);

  const handleClickMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  //검색어 변경 시
  const handleChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };

  //로그아웃
  const handleClickLogout = (e) => {
    doLogout();
    alert("로그아웃되었습니다.");
    moveToPath("/");
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
        className="flex lg:justify-normal flex-col items-center px-5 lg:px-10  border-b border-stone-200 "
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
            <div className="space-x-1 md:flex hidden">
              <input
                type="text"
                value={searchWord}
                onChange={(e) => handleChangeSearch(e)}
                name="searchWord"
                className="border-b-2 border-black w-60 outline-none"
              />
              <Link to={`/contents/search/${searchWord}/`}>
                <RiSearchLine className="text-xl" />
              </Link>
            </div>
            {/* web */}
            <div className="justify-end w-2/4 space-x-2  hidden lg:flex">
              {!loginState.email && (
                <>
                  <Link to={"/member/login"}>로그인</Link>
                </>
              )}
              {loginState.email && (
                <>
                  {loginState.roleNames[0] === "USER" ? (
                    <Link to={"/member/user/reservation/"}>마이페이지</Link>
                  ) : (
                    <Link to={"/member/admin/goods/"}>관리자페이지</Link>
                  )}
                  <div className="cursor-pointer" onClick={handleClickLogout}>
                    로그아웃
                  </div>
                </>
              )}
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
          <aside className="flex flex-col items-center space-y-4 justify-center p-4">
            <ul className="text-lg space-y-4">
              <li>
                <Link to={"/contents/genre/concert"}>콘서트</Link>
              </li>
              <li>
                <Link to={"/genre/genre/musical"}>뮤지컬</Link>
              </li>
              <li>
                <Link to={"/genre/genre/play"}>연극</Link>
              </li>
              <li>
                <Link to={"/genre/genre/classic"}>클래식</Link>
              </li>
              {!loginState.email && (
                <li>
                  <Link to={"/member/login"}>로그인</Link>
                </li>
              )}
              {loginState.email && (
                <>
                  {loginState.roleNames[0] === "USER" ? (
                    <li>
                      <Link to={"/member/user/reservation/"}>마이페이지</Link>
                    </li>
                  ) : (
                    <li>
                      <Link to={"/member/admin/goods/"}>관리자페이지</Link>
                    </li>
                  )}
                  <li className="cursor-pointer" onClick={handleClickLogout}>
                    로그아웃
                  </li>
                </>
              )}
            </ul>
            <div className="space-x-1 flex w-full">
              <input
                type="text"
                value={searchWord}
                onChange={(e) => handleChangeSearch(e)}
                name="searchWord"
                className="border-b-2 border-black w-full outline-none"
              />
              <Link to={`/contents/search/${searchWord}/`}>
                <RiSearchLine className="text-xl" />
              </Link>
            </div>
          </aside>
        </motion.main>
      )}
    </div>
  );
}

export default MemberMenu;
