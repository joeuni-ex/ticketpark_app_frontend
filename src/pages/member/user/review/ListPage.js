import React, { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../../../api/goodsApi";
import FetchingModal from "../../../../components/common/FetchingModal";
import ResultModal from "../../../../components/common/ResultModal";
import useCustomLogin from "../../../../hooks/useCustomLogin";
import { getMyList } from "../../../../api/reviewApi";
import { FaStar } from "react-icons/fa";

const initState = [
  {
    reno: 0,
    content: "",
    likes: 0,
    grade: 0,
    reservationDate: "",
    imageFile: "",
    gno: 0,
    goods_title: "",
    createDate: "",
    deleteFlag: false,
  },
];

const host = API_SERVER_HOST;

function ListPage() {
  const [serverData, setServerData] = useState(initState);

  const [fetching, setFetching] = useState(false); // 로딩 모달
  const [result, setResult] = useState(false); // 결과가 나오면 모달창으로 결과 데이터가 보이게끔

  const { loginState } = useCustomLogin();

  //결과 모달창 닫기
  const closeModal = () => {
    setResult(null);
    // setReservationCancelModal(false);
    // setCancelRno(null);
  };

  useEffect(() => {
    setFetching(true);
    getMyList().then((data) => {
      setServerData(data);
      setFetching(false);
    });
  }, []);

  return (
    <div className="flex flex-col p-5">
      {fetching && <FetchingModal />}
      {result ? (
        <ResultModal
          callbackFn={closeModal}
          title={"Reservation Cancel"}
          content={`정상적으로 리뷰가 삭제 처리 되었습니다.`}
        />
      ) : (
        <></>
      )}
      {/* {reservationCancelModal && (
        <ConfirmModal
          message="해당 리뷰를 삭제하시겠습니까?"
          onConfirm={handleConfirmCancel}
          onCancel={closeModal}
        />
      )} */}

      <div className="font-bold text-stone-800 text-xl py-7 px-5 border-b-2 border-stone-600">
        내가 작성한 리뷰{" "}
        <span className="text-base font-medium">
          총{" "}
          <span className="text-orange-400 font-semibold">
            {serverData.length}
          </span>
          건
        </span>
      </div>
      <div className="flex w-full flex-wrap mx-auto justify-center ">
        <div className="w-full flex px-10 h-20 font-bold text-lg   bg-stone-100 items-center border-b border-stone-200 ">
          <div className="w-1/5"></div>
          <div className="w-4/5">후기</div>
          <div className="w-2/5">작성일</div>
          <div className="w-1/5 ">관리</div>
        </div>
        {serverData?.map((review) => (
          <div
            key={review.reno}
            className="flex flex-col items-center justify-center w-full min-w-[400px] p-8 m-2 space-y-5 rounded shadow-md text-stone-700"
          >
            <div className="flex justify-between w-full">
              <div className="w-full flex items-center">
                <div className="w-1/5 flex flex-col  space-y-3">
                  <div className="w-28 ">
                    {review.imageFile ? (
                      <img
                        src={`${host}/api/goods/view/s_${review.imageFile}`}
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
                </div>
                <div className="w-4/5 space-y-2 ">
                  <div className="font-semibold text-lg">
                    {review.goods_title}
                  </div>
                  <div className="">예약일자: {review.reservationDate}</div>
                </div>
                <div className="w-2/5"></div>
                <div className="w-1/5 "></div>
              </div>
            </div>
            <div className="flex items-center bg-stone-100 w-full h-36">
              {/* 평점 */}
              <div className="flex w-1/5 m-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.grade
                        ? "text-orange-400 text-xl"
                        : "text-stone-300 text-xl"
                    }
                  />
                ))}
              </div>

              <div className="w-4/5">{review.content}</div>
              <div className="w-1/5 flex  text-stone-600">
                {review.createDate}
              </div>
              <div className="flex space-x-2 w-2/5 justify-center ml-5">
                <button className="px-4 py-2 border h-10  text-stone-600 border-stone-300 hover:bg-stone-50">
                  삭제
                </button>
                <button className="px-4 py-2 bg-stone-500  h-10  text-white hover:bg-stone-400">
                  수정
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListPage;
