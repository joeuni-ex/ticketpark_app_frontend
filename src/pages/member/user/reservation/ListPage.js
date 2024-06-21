import React, { useEffect, useState } from "react";
import useCustomMove from "../../../../hooks/useCustomMove";
import { getList, modifyOne } from "../../../../api/ReservationApi";
import { Link, useNavigate } from "react-router-dom";
import FetchingModal from "../../../../components/common/FetchingModal";
import PageComponent from "../../../../components/common/PageComponent";
import { API_SERVER_HOST } from "../../../../api/goodsApi";
import { motion } from "framer-motion";
import ResultModal from "../../../../components/common/ResultModal";
import useCustomLogin from "../../../../hooks/useCustomLogin";

import ConfirmModal from "../../../../components/common/ConfirmModal";

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

  const { loginState } = useCustomLogin();

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

  //결과 모달창 닫기
  const closeModal = () => {
    setResult(null);
    setReservationCancelModal(false);
    setCancelRno(null);
  };

  //사이드바 애니메이션 상태
  const boxVariants = {
    initial: { opacity: 0, y: -10 }, // 초기 상태
    animate: { opacity: 1, y: 0 }, // 애니메이션 진행 중 상태
    exit: { opacity: 0, y: -100 }, // 애니메이션 종료 상태
  };
  // 애니메이션 지속 시간 및 이징 함수 정의
  const transition = { duration: 0.5, ease: "easeInOut" };

  useEffect(() => {
    setFetching(true);
    getList({ page, size }).then((data) => {
      setFetching(false);
      setServerData(data);
    });
  }, [page, size, refresh, result]);

  console.log(serverData);
  return (
    <div className="flex flex-col p-5">
      {fetching && <FetchingModal />}
      {result ? (
        <ResultModal
          callbackFn={closeModal}
          title={"Reservation Cancel"}
          content={`정상적으로 예약취소 처리 되었습니다.`}
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

      <div className="font-bold text-stone-800 text-xl py-7 px-5 border-b-2 border-stone-600">
        예약 목록
      </div>
      <div className="flex w-full flex-wrap mx-auto justify-center ">
        <div className="w-full flex px-10 h-20 font-bold text-lg bg-stone-100 items-center ">
          <div className="w-1/4">공연명</div>
          <div className="w-1/4">공연장소</div>
          <div className="w-1/4">공연일자</div>
          <div className="w-1/4">공연시간</div>
        </div>
        {serverData.dtoList?.map((reservation) => (
          <div
            key={reservation.rno}
            className="flex flex-col items-center justify-center w-full min-w-[400px] p-8 m-2 rounded shadow-md text-stone-700"
          >
            <div className="flex justify-between w-full">
              <div className="w-full flex items-center">
                <div className="flex flex-col w-72 space-y-3">
                  <div className="w-28 ">
                    {reservation.imageFile ? (
                      <img
                        src={`${host}/api/goods/view/s_${reservation.imageFile}`}
                        alt="image"
                        className="h-full object-cover w-full"
                      />
                    ) : (
                      <img
                        src={`${host}/api/goods/view/default_image.png`}
                        alt="image"
                        className="h-full object-cover w-full"
                      />
                    )}
                  </div>
                  <div className="w-96 font-extrabold">
                    {reservation.gtitle}
                  </div>
                </div>
                <div className="w-72 px-2">{reservation.place}</div>
                <div className="w-80 px-6">{reservation.reservationDate}</div>
                <div className="w-10 px-2">{reservation.time}</div>
              </div>
              <div className="flex justify-center items-center text-1xl w-48 font-medium">
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
            {/* 상세보기 토글 */}
            {viewDetailsToggle === reservation.rno && (
              <motion.div
                variants={boxVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="flex flex-col w-full p-4 bg-gray-100 rounded mt-4"
              >
                <div className="flex flex-wrap">
                  <div className="w-1/3 p-2">
                    <div className="text-lg font-semibold">좌석정보</div>
                    <div>
                      {`<${reservation.seatClass}>`} {reservation.seatNumber}번
                      좌석
                    </div>
                  </div>
                  <div className="w-1/3 p-2">
                    <div className="text-lg font-semibold">가격정보</div>
                    <div>{reservation.price.toLocaleString()}원</div>
                  </div>
                  <div className="w-1/3 p-2">
                    <div className="text-lg font-semibold">결제일자</div>
                    <div>{reservation.dueDate}</div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Link
                    to={`/member/user/reservation/modify/${reservation.rno}`}
                    className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    예약변경
                  </Link>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleClickCancel(reservation.rno)}
                  >
                    예약취소
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
}

export default ListPage;
