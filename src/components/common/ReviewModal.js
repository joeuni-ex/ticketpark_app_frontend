import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const initState = {
  grade: "",
  content: "",
};

function ReviewModal({ onCancel, addReview }) {
  const [review, setReview] = useState(initState);
  const [hover, setHover] = useState(0); // 마우스 호버 상태

  const handleChangeReview = (e) => {
    setReview({ ...review, content: e.target.value });
  };

  const handleGradeChange = (starValue) => {
    setReview({ ...review, grade: starValue });
  };

  const handleClickAddReview = () => {
    console.log(review);
    addReview(review);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-[1055] flex h-full w-full justify-center items-center bg-black bg-opacity-20`}
    >
      <div className="absolute bg-white shadow opacity-100 w-full md:w-1/4 rounded mt-10 mb-10 px-6  md:min-w-[750px] text-stone-700">
        <div className="items-center flex bg-stone-50 mt-6 mb-6 text-xl border-b-2 border-b-orange-400 border-t-orange-400 font-semibold h-16">
          리뷰 작성
        </div>
        <div className="flex flex-col pt-4 pb-4 space-y-7">
          <div className="flex w-full h-16 text-lg">
            <div className="w-1/5">별점</div>
            <div className="flex flex-col w-full space-y-4">
              <div className="text-sm">* 별을 클릭하여 만족도를 알려주세요</div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <FaStar
                      key={index}
                      className={`text-3xl cursor-pointer ${
                        starValue <= (hover || review.grade)
                          ? "text-orange-400"
                          : "text-stone-300"
                      }`}
                      onClick={() => handleGradeChange(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex w-full text-lg">
            <div className="w-1/5">후기</div>
            <div className="flex flex-col space-y-4 w-full">
              <div className="text-sm">
                * 욕설, 비방, 명예훼손 등 오해의 소지가 있는 내용은 통보 없이
                삭제될 수 있습니다.
              </div>
              <textarea
                onChange={handleChangeReview}
                maxLength={200}
                name="content"
                className="w-full h-52 border resize-none border-stone-400"
              />
              <div className="text-right text-sm text-stone-500">{`(${review.content.length}/200)`}</div>
            </div>
          </div>
        </div>
        <div className="justify-end flex space-x-2">
          <button
            onClick={onCancel}
            className="rounded bg-stone-300 w-32 mt-4 mb-4 px-6 pt-4 pb-4 text-lg hover:bg-stone-200 text-stone-600"
          >
            취소
          </button>
          <button
            onClick={handleClickAddReview}
            className="rounded bg-amber-400 w-32 mt-4 mb-4 px-6 pt-4 pb-4 text-lg hover:bg-amber-300 text-white"
          >
            리뷰 저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
