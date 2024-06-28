import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect } from "react";
import { TfiClose } from "react-icons/tfi";

function BasicMenu() {
  //로그인 상태 데이터
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
    initial: { opacity: 0, x: 100 }, // 초기 상태
    animate: { opacity: 1, x: 0 }, // 애니메이션 진행 중 상태
    exit: { opacity: 0, x: 100 }, // 애니메이션 종료 상태
  };
  // 애니메이션 지속 시간 및 이징 함수 정의
  const transition = { duration: 0.5, ease: "easeInOut" };
  useEffect(() => {}, [loginState]);

  return (
    <div>
      <nav
        id="navbar"
        className="flex lg:justify-normal flex-col items-center px-5 lg:px-10 "
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
              {loginState?.email && (
                <>
                  {loginState?.roleNames[0] === "USER" ? (
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
        <div
          className={`fixed top-0 left-0 z-[1055] flex h-full w-full bg-black bg-opacity-20`}
        >
          <motion.main
            variants={boxVariants} // 애니메이션 상태 객체 적용
            initial="initial" // 초기 상태 설정
            animate="animate" // 애니메이션 진행 중 상태 설정
            exit="exit" // 애니메이션 종료 상태 설정
            transition={transition} // 애니메이션 지속 시간 및 이징 함수 설정
            className="lg:hidden w-1/2 right-0 h-full absolute  text-stone-700 bg-white z-50 text-sm"
          >
            <aside className=" flex flex-col  space-y-4 justify-center px-6 py-6">
              {/* mobile menu toggle*/}
              <div className=" w-full  flex justify-end t">
                <TfiClose onClick={handleClickMenuToggle} className="text-lg" />
              </div>
              <ul className="md:text-lg space-y-4">
                <li className="text-base font-semibold">카테고리</li>
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
                      <>
                        <li className="text-base font-semibold">마이페이지</li>
                        <li>
                          <Link to={"/member/user/reservation/"}>예약목록</Link>
                        </li>
                        <li>
                          <Link to={"/member/user/reservation/"}>
                            내가 작성한 리뷰
                          </Link>
                        </li>
                        <li
                          className="cursor-pointer"
                          onClick={handleClickLogout}
                        >
                          로그아웃
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="text-base font-semibold">
                          관리자페이지
                        </li>
                        <li>
                          <Link to={"/member/admin/goods/list"}>상품목록</Link>
                        </li>
                        <li>
                          <Link to={"/member/admin/goods/register"}>
                            상품등록
                          </Link>
                        </li>
                        <li>
                          <Link to={"/member/admin/review/list"}>리뷰관리</Link>
                        </li>
                        <li
                          className="cursor-pointer"
                          onClick={handleClickLogout}
                        >
                          로그아웃
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
              {/* 검색창 */}
              <div className="space-x-1 flex w-full bg-amber-200 p-3">
                <input
                  type="text"
                  value={searchWord}
                  onChange={(e) => handleChangeSearch(e)}
                  name="searchWord"
                  className="border-b-2 border-black w-full outline-none  bg-amber-200"
                />
                <Link to={`/contents/search/${searchWord}/`}>
                  <RiSearchLine
                    className="text-xl"
                    onClick={handleClickMenuToggle}
                  />
                </Link>
              </div>
            </aside>
          </motion.main>
        </div>
      )}
    </div>
  );
}

export default BasicMenu;
