import React, { useEffect, useState } from "react";
import useCustomMove from "../../../../hooks/useCustomMove";
import { getList, modifyOne } from "../../../../api/ReservationApi";
import { Link } from "react-router-dom";
import FetchingModal from "../../../../components/common/FetchingModal";
import PageComponent from "../../../../components/common/PageComponent";
import { API_SERVER_HOST } from "../../../../api/goodsApi";
import { motion } from "framer-motion";
import ResultModal from "../../../../components/common/ResultModal";
import useCustomLogin from "../../../../hooks/useCustomLogin";

import ConfirmModal from "../../../../components/common/ConfirmModal";
import ReviewModal from "../../../../components/common/ReviewModal";
import { getCheckWrittenReview, postAdd } from "../../../../api/reviewApi";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};
const host = API_SERVER_HOST;

function ListPage() {
  const [serverData, setServerData] = useState(initState);
  const { page, size, refresh, moveToList } = useCustomMove();

  const [fetching, setFetching] = useState(false); // 로딩 모달
  const [result, setResult] = useState(false); // 결과가 나오면 모달창으로 결과 데이터가 보이게끔

  const [viewDetailsToggle, setViewDetailsToggle] = useState(null); //상세보기 토글

  const [reservationCancelModal, setReservationCancelModal] = useState(false); //예약 취소 모달
  const [cancelRno, setCancelRno] = useState(""); //예약 취소할 번호

  const [writeReviewModal, setWriteReviewModal] = useState(false);
  const [reviewRno, setReviewRno] = useState(""); //리뷰 작성할 번호

  const { loginState } = useCustomLogin();

  // ==================== 예약 취소 ==========================
  //예약 취소 모달
  const handleClickCancel = async (rno) => {
    setCancelRno(rno);
    setReservationCancelModal(true);
  };

  //예약 취소 모달 -> 확인 클릭 시
  const handleConfirmCancel = async () => {
    setReservationCancelModal(false);
    setFetching(true);
    try {
      const formData = new FormData();

      formData.append("email", loginState.email);
      formData.append("cancelFlag", true);

      modifyOne(cancelRno, formData).then((result) => {
        setResult("Cancel");
        setFetching(false);
      });
    } catch (error) {
      console.error("Error cancel item:", error);
      setResult("Error cancel item");
    } finally {
      setFetching(false);
    }
  };

  // ==================== 리뷰 작성==========================
  //리뷰 작성 모달 출력
  const handleClickWriteReview = (rno) => {
    setReviewRno(rno);

    let writtenReview = false;

    getCheckWrittenReview(rno, writtenReview).then((result) => {
      console.log(result);
      if (result.writtenReview === true) {
        alert("이미 리뷰한 리뷰가 있습니다.");
        return;
      } else if (result.writtenReview === false) {
        setWriteReviewModal(true);
      }
    });
  };

  const handleClickAddReview = (reviewModalData) => {
    setWriteReviewModal(false);
    setFetching(true);
    try {
      const formData = new FormData();

      formData.append("email", loginState.email);
      formData.append("content", reviewModalData.content);
      formData.append("grade", reviewModalData.grade);
      formData.append("likes", 0);
      formData.append("rno", reviewRno);

      postAdd(formData).then((result) => {
        setResult("Review");
        setFetching(false);
      });
    } catch (error) {
      console.error("Error add review:", error);
      setResult("Error add review");
    } finally {
      setFetching(false);
    }
  };

  //결과 모달창 닫기
  const closeModal = () => {
    setResult(null);
    setReservationCancelModal(false);
    setWriteReviewModal(false);
    setCancelRno(null);
  };

  // ==================== 애니메이션 ==========================

  //사이드바 애니메이션 상태
  const boxVariants = {
    initial: { opacity: 0, y: -10 }, // 초기 상태
    animate: { opacity: 1, y: 0 }, // 애니메이션 진행 중 상태
    exit: { opacity: 0, y: -100 }, // 애니메이션 종료 상태
  };
  // 애니메이션 지속 시간 및 이징 함수 정의
  const transition = { duration: 0.5, ease: "easeInOut" };

  // 현재 날짜 가져오기
  const currentDate = new Date();

  useEffect(() => {
    setFetching(true);
    getList({ page, size }).then((data) => {
      setFetching(false);
      setServerData(data);
    });
  }, [page, size, refresh, result]);

  return (
    <div className="flex flex-col p-5">
      {fetching && <FetchingModal />}
      {result === "Cancel" ? (
        <ResultModal
          callbackFn={closeModal}
          title={"Cancel reservation Result"}
          content={`정상적으로 예약취소 처리 되었습니다.`}
        />
      ) : result === "Review" ? (
        <ResultModal
          callbackFn={closeModal}
          title={"Add Review Result"}
          content={`정상적으로 리뷰 작성이 완료 되었습니다..`}
        />
      ) : (
        <></>
      )}
      {reservationCancelModal && (
        <ConfirmModal
          message="해당 예약을 취소하시겠습니까?"
          onConfirm={handleConfirmCancel}
          onCancel={closeModal}
        />
      )}

      {writeReviewModal && (
        <ReviewModal onCancel={closeModal} addReview={handleClickAddReview} />
      )}

      <div className="font-bold text-stone-800 text-xl py-7 px-5 border-b-2 border-stone-600">
        예약 목록
      </div>
      <div className="flex w-full flex-wrap mx-auto justify-center ">
        <div className="w-full flex px-5 md:px-10 h-20 font-bold   md:text-lg bg-stone-100 items-center  border-b border-stone-200 ">
          <div className="text-sm md:text-base w-1/4">공연명</div>
          <div className="text-sm md:text-base  w-1/4">공연장소</div>
          <div className="text-sm md:text-base w-1/4">공연일자</div>
          <div className="text-sm md:text-base w-1/4">공연시간</div>
        </div>
        {serverData.dtoList?.map((reservation) => {
          // 공연일자가 현재 날짜를 지났는지 확인
          const reservationDate = new Date(reservation.reservationDate);
          const isPast = reservationDate < currentDate;

          return (
            <div
              key={reservation.rno}
              className="flex flex-col items-center justify-center w-full min-w-[400px] p-2 md:p-8 md:m-2 rounded shadow-md text-stone-700"
            >
              <div className="flex justify-between w-full md:text-base text-sm">
                <div className="w-full flex items-center">
                  <div className="flex flex-col w-1/4 md:space-y-3">
                    <Link
                      to={`/goods/${reservation.gno}`}
                      className="w-16 md:w-28 "
                    >
                      {reservation.imageFile ? (
                        <img
                          src={`${host}/api/goods/view/s_${reservation.imageFile}`}
                          alt="goods"
                          className="h-full object-cover w-full"
                        />
                      ) : (
                        <img
                          src={`${host}/api/goods/view/default_image.png`}
                          alt="goods"
                          className="h-full object-cover w-full"
                        />
                      )}
                    </Link>
                    <div className="text-xs  md:text-base  md:w-4/4  font-extrabold">
                      {reservation.gtitle}
                    </div>
                  </div>
                  <div className="text-xs  md:text-base w-1/4 md:pl-10 ">
                    {reservation.place}
                  </div>
                  <div className="text-xs  md:text-base w-1/4 md:pl-16">
                    {reservation.reservationDate}
                  </div>
                  <div className="text-xs md:text-base w-1/4 md:pl-24 text-center md:text-left">
                    {reservation.time}
                  </div>
                  <div className=" flex justify-center items-center text-1xl w-24 md:w-32 font-medium">
                    <span
                      className="cursor-pointer hover:underline font-semibold"
                      onClick={() =>
                        setViewDetailsToggle(
                          viewDetailsToggle === reservation.rno
                            ? null
                            : reservation.rno
                        )
                      }
                    >
                      상세보기
                    </span>
                  </div>
                </div>
              </div>
              {/* 상세보기 토글 */}
              {viewDetailsToggle === reservation.rno && (
                <motion.div
                  variants={boxVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="flex flex-col w-full p-2 md:p-4 bg-gray-100 rounded mt-4 text-sm md:text-base"
                >
                  <div className="flex flex-wrap">
                    <div className="w-1/3 p-2">
                      <div className="md:text-lg font-semibold">좌석정보</div>
                      <div>
                        {`<${reservation.seatClass}>`} {reservation.seatNumber}
                        번 좌석
                      </div>
                    </div>
                    <div className="w-1/3 p-2">
                      <div className="md:text-lg font-semibold">가격정보</div>
                      <div>{reservation.price.toLocaleString()}원</div>
                    </div>
                    <div className="w-1/3 p-2">
                      <div className="md:text-lg font-semibold">결제일자</div>
                      <div>{reservation.dueDate}</div>
                    </div>
                  </div>
                  <div className="flex justify-end md:mt-4">
                    {isPast ? (
                      <button
                        onClick={() => handleClickWriteReview(reservation.rno)}
                        className="mr-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        리뷰작성
                      </button>
                    ) : (
                      <>
                        <Link
                          to={`/member/user/reservation/modify/${reservation.rno}`}
                          className="mr-2 md:mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          예약변경
                        </Link>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleClickCancel(reservation.rno)}
                        >
                          예약취소
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
}

export default ListPage;
