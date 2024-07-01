import React from "react";
import { FaStar } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { postIncreaseLikes } from "../../api/reviewApi";
import useCustomLogin from "../../hooks/useCustomLogin";

function Review({ review, handleClickLike }) {
  const { loginState } = useCustomLogin(); //로그인 커스텀 훅

  const handleClickNonMember = () => {
    alert("로그인이 필요한 서비스입니다.");

    return;
  };
  return (
    <div className="flex flex-col w-full border rounded p-5 space-y-5">
      <div className="flex w-full justify-between">
        <div className="flex space-x-1">
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
        <div className="flex space-x-4 text-sm text-stone-500">
          <div>{review.nickname}</div>
          <div>{review.createDate}</div>
        </div>
      </div>
      <div className="text-stone-600 flex justify-between">
        <div>{review.content}</div>
        <div className="flex items-center space-x-1">
          {review.likes}{" "}
          {!loginState.email === "" ? (
            review.liked == false ? (
              <IoIosHeartEmpty
                onClick={handleClickLike}
                className="cursor-pointer hover:text-red-400"
              />
            ) : (
              <IoMdHeart
                onClick={handleClickLike}
                className="cursor-pointer  text-red-400 hover:text-red-300 font-extrabold"
              />
            )
          ) : (
            <IoIosHeartEmpty
              onClick={handleClickNonMember}
              className="cursor-pointer hover:text-red-400"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Review;
