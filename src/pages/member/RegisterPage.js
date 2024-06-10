import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerPost } from "../../api/memberApi";

const initState = {
  email: "",
  pw: "",
  nickname: "",
  social: false,
  roleNames: "USER",
};

function RegisterPage() {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false); //로딩 모달
  const [result, setResult] = useState(false); // 결과가 나오면 모달창으로 결과 데이터가 보이게끔
  const [registerParam, setRegisterParam] = useState({ ...initState });

  const handleClickEmailCheck = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //이메일 형식

    if (registerParam.email.length === 0) {
      alert("이메일을 작성해 주세요");
      return;
    } else if (!emailPattern.test(registerParam.email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    setFetching(true);

    registerPost(registerParam.email).then((result) => {
      if (result.RESULT === "DUPLICATE") {
        alert("이미 존재하는 이메일입니다.");
      }
      if (result.RESULT === "AVAILABLE") {
        alert("사용 가능한 이메일입니다.");
      }
    });

    setFetching(false);
  };

  const handleChange = (e) => {
    registerParam[e.target.name] = e.target.value;

    setRegisterParam({ ...registerParam });
  };

  return (
    <div className="flex justify-center items-center flex-col  text-stone-700 py-10">
      <div className="flex text-3xl font-bold py-10">
        TicketPark <img src="/logo.png" alt="" className="w-8  h-8" />
      </div>
      <div className="w-full px-10 space-y-8 md:w-2/5  lg:w-96 md:px-0 pt-2 pb-8">
        <div className="flex">
          <input
            type="email"
            name="email"
            className="w-9/12 border border-stone-400 px-2 py-3 mr-2"
            placeholder="이메일"
            onChange={handleChange}
            disabled={fetching}
          />
          <button
            onClick={handleClickEmailCheck}
            className="px-4 py-3 bg-amber-300 w-4/12 hover:bg-amber-200 disabled:bg-gray-400"
            disabled={fetching}
          >
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
