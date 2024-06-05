import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function SideMenu() {
  const [contentsToggle, setContentsToggle] = useState(true);
  const [reviewToggle, setReviewToggle] = useState(true);

  //사이드바 애니메이션 상태
  const boxVariants = {
    initial: { opacity: 0, y: -5 }, // 초기 상태
    animate: { opacity: 1, y: 0 }, // 애니메이션 진행 중 상태
    exit: { opacity: 0, y: -100 }, // 애니메이션 종료 상태
  };
  // 애니메이션 지속 시간 및 이징 함수 정의
  const transition = { duration: 0.5, ease: "easeInOut" };

  return (
    <div className="bg-blue-40 p-4">
      <div className="p-2">홈</div>
      <div className="flex justify-between">
        <div className="p-2">상품 관리</div>
        <div
          className="cursor-pointer"
          onClick={() => setContentsToggle(!contentsToggle)}
        >
          <FaAngleDown />
        </div>
      </div>
      {contentsToggle ? (
        <motion.div
          variants={boxVariants} // 애니메이션 상태 객체 적용
          initial="initial" // 초기 상태 설정
          animate="animate" // 애니메이션 진행 중 상태 설정
          exit="exit" // 애니메이션 종료 상태 설정
          transition={transition} // 애니메이션 지속 시간 및 이징 함수 설정
          className=" w-full flex flex-col bg-white z-50"
        >
          <Link to={"/member/admin/goods/list"} className="p-2 pl-5">
            상품 목록
          </Link>
          <Link to={"/member/admin/goods/register"} className="p-2 pl-5">
            상품 등록
          </Link>
        </motion.div>
      ) : (
        <></>
      )}

      <div className="flex justify-between">
        <div className="p-2">리뷰 관리</div>
        <div
          className="cursor-pointer"
          onClick={() => setReviewToggle(!reviewToggle)}
        >
          <FaAngleDown />
        </div>
      </div>

      {reviewToggle ? (
        <motion.div
          variants={boxVariants} // 애니메이션 상태 객체 적용
          initial="initial" // 초기 상태 설정
          animate="animate" // 애니메이션 진행 중 상태 설정
          exit="exit" // 애니메이션 종료 상태 설정
          transition={transition} // 애니메이션 지속 시간 및 이징 함수 설정
          className=" w-full bg-white z-50"
        >
          <div className="p-2 pl-5">리뷰 조회</div>
        </motion.div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SideMenu;
