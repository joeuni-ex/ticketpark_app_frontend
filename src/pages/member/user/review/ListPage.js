import React, { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../../../api/goodsApi";
import FetchingModal from "../../../../components/common/FetchingModal";
import ResultModal from "../../../../components/common/ResultModal";
import useCustomLogin from "../../../../hooks/useCustomLogin";
import { getMyList, modifyOne } from "../../../../api/reviewApi";
import { FaStar } from "react-icons/fa";
import ConfirmModal from "../../../../components/common/ConfirmModal";
import ModifyReviewModal from "../../../../components/common/ModifyReviewModal";

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

  const [reviewDeleteModal, setReviewDeleteModal] = useState(false); //리뷰 삭제 모달
  const [deleteReno, setDeleteReno] = useState(""); //리뷰 삭제할 번호

  const [reviewModifyModal, setReviewModifyModal] = useState(false); //리뷰 수정 모달
  const [selectedReview, setSelectedReview] = useState({}); //리뷰 수정할 번호

  const { loginState } = useCustomLogin();

  //결과 모달창 닫기
  const closeModal = () => {
    setResult(null);
    setReviewDeleteModal(false);
    setDeleteReno(null);
    setReviewModifyModal(false);
  };

  //리뷰 삭제 모달
  const handleClickDelete = async (reno) => {
    setDeleteReno(reno);
    setReviewDeleteModal(true);
  };

  //삭제 모달 -> 확인 클릭 시
  const handleConfirmDelete = async () => {
    setReviewDeleteModal(false);
    try {
      const formData = new FormData();

      formData.append("email", loginState.email);
      formData.append("deleteFlag", true);

      modifyOne(deleteReno, formData).then((result) => {
        setResult("Delete");
        setFetching(false);
      });
    } catch (error) {
      console.error("Error cancel item:", error);
      setResult("Error cancel item");
    } finally {
      setFetching(false);
    }
  };

  //리뷰 수정 모달
  const handleClickModify = async (review) => {
    setSelectedReview(review);
    setReviewModifyModal(true);
  };

  //리뷰 수정 모달 -> 수정 클릭 시
  const handleConfirmModify = async (modifyReview) => {
    setReviewModifyModal(false);
    try {
      const formData = new FormData();

      formData.append("email", loginState.email);
      formData.append("content", modifyReview.content);
      formData.append("grade", modifyReview.grade);

      modifyOne(selectedReview.reno, formData).then((result) => {
        setResult("Modify");
        setFetching(false);
      });
    } catch (error) {
      console.error("Error Modify item:", error);
      setResult("Error Modify item");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    setFetching(true);
    getMyList(loginState.email).then((data) => {
      setServerData(data);
      setFetching(false);
    });
  }, [loginState, result]);

  return (
    <div className="flex flex-col p-5">
      {fetching && <FetchingModal />}
      {result === "Delete" ? (
        <ResultModal
          callbackFn={closeModal}
          title={"Review deleted"}
          content={`정상적으로 리뷰가 삭제 처리 되었습니다.`}
        />
      ) : result === "Modify" ? (
        <ResultModal
          callbackFn={closeModal}
          title={"Review Modified"}
          content={`정상적으로 리뷰가 수정 처리 되었습니다.`}
        />
      ) : (
        <></>
      )}
      {reviewDeleteModal && (
        <ConfirmModal
          message="해당 리뷰를 삭제하시겠습니까?"
          onConfirm={handleConfirmDelete}
          onCancel={closeModal}
        />
      )}
      {reviewModifyModal && (
        <ModifyReviewModal
          selectedReview={selectedReview}
          onCancel={closeModal}
          modifyReview={handleConfirmModify}
        />
      )}

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
                <button
                  onClick={() => handleClickDelete(review.reno)}
                  className="px-4 py-2 border h-10  text-stone-600 border-stone-300 hover:bg-stone-50"
                >
                  삭제
                </button>
                <button
                  onClick={() => handleClickModify(review)}
                  className="px-4 py-2 bg-stone-500  h-10  text-white hover:bg-stone-400"
                >
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
