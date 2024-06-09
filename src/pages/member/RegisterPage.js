import React from "react";

function RegisterPage() {
  return (
    <div className="flex justify-center items-center flex-col  text-stone-700 py-10">
      <div className="flex text-3xl font-bold py-10">
        TicketPark <img src="/logo.png" alt="" className="w-8  h-8" />
      </div>
      <div className="space-y-8 w-1/5 pt-2 pb-8">
        <div className="flex">
          <input
            type="email"
            className="w-9/12 border border-stone-400 px-2 py-3 mr-2 "
            placeholder="이메일"
          />
          <button className="bg-amber-300 w-3/12 hover:bg-amber-200">
            중복확인
          </button>
        </div>
        <div>
          <input
            type="text"
            className="w-full border border-stone-400 px-2 py-3"
            placeholder="닉네임"
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full border border-stone-400 px-2 py-3"
            placeholder="비밀번호"
          />
        </div>

        <button className="w-full py-5 bg-amber-300">회원가입</button>

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

export default RegisterPage;
