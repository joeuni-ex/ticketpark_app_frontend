import React from "react";

function Review({ review }) {
  return (
    <div className="flex flex-col w-full border rounded p-5 space-y-5">
      <div className="flex w-full justify-between">
        <div>⭐⭐⭐⭐⭐</div>
        <div className="flex space-x-4 text-sm text-stone-500">
          <div>{review.nickname}</div>
          <div>{review.date}</div>
          <div>{review.heart}</div>
        </div>
      </div>
      <div className="font-bold text-lg">{review.title}</div>
      <div className="text-stone-600">{review.des}</div>
    </div>
  );
}

export default Review;
