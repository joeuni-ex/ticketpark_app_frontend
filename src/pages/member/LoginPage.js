import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="flex justify-center items-center flex-col  text-stone-700 py-10">
      <div className="flex text-3xl font-bold py-10">
        TicketPark <img src="/logo.png" alt="" className="w-8  h-8" />
      </div>
      <div className="space-y-8 w-1/5 pt-2 pb-8">
        <div>
          <input
            type="text"
            className="w-full border border-stone-400 px-2 py-3"
            placeholder="이메일"
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full border border-stone-400 px-2 py-3"
            placeholder="비밀번호"
          />
        </div>
        <button className="w-full py-5 bg-amber-300">로그인</button>
        <div className="text-center space-x-3">
          계정이 없으신가요?{" "}
          <Link
            to={"/member/register"}
            className="font-semibold text-sky-500 cursor-pointer border-b-2 border-sky-500 hover:text-sky-400"
          >
            가입하기
          </Link>
        </div>
        <div className="flex w-full">
          <div className="border-b border-stone-400 w-2/5"></div>
          <div className="w-1/5 text-center">또는</div>
          <div className="border-b border-stone-400 w-2/5"></div>
        </div>
        <button className="w-full py-5 bg-amber-300">카카오로그인</button>
      </div>
    </div>
  );
}

export default LoginPage;
