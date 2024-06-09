import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../slice/loginSlice";

const initState = {
  email: "",
  pw: "",
};

function LoginPage() {
  const dispatch = useDispatch();

  const [loginParam, setLoginParam] = useState({ ...initState });

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;

    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    dispatch(login(loginParam));
  };

  return (
    <div className="flex justify-center items-center flex-col  text-stone-700 py-10">
      <div className="flex text-3xl font-bold py-10">
        TicketPark <img src="/logo.png" alt="" className="w-8  h-8" />
      </div>
      <div className="w-full px-10 space-y-8 md:w-2/5  lg:w-1/5 md:px-0 pt-2 pb-8">
        <div>
          <input
            type="text"
            className="w-full border border-stone-400 px-2 py-3"
            placeholder="이메일"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="pw"
            className="w-full border border-stone-400 px-2 py-3"
            onChange={handleChange}
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
        <button className="w-full py-5 bg-amber-300" onClick={handleClickLogin}>
          카카오로그인
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
