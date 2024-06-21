import React from "react";
import { FaStar } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { postIncreaseLikes } from "../../api/reviewApi";

function Review({ review, handleClickLike }) {
  console.log(review);
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
          <IoIosHeartEmpty
            onClick={handleClickLike}
            className="cursor-pointer hover:text-red-400"
          />
        </div>
      </div>
    </div>
  );
}

export default Review;
