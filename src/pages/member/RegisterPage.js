import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkEmail, registerPost } from "../../api/memberApi";
import FetchingModal from "../../components/common/FetchingModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import ResultModal from "../../components/common/ResultModal";
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoApi";

const initState = {
  email: "",
  pw: "",
  nickname: "",
  social: false,
  roleNames: "USER",
};
const link = getKakaoLoginLink();

function RegisterPage() {
  const { moveToLogin } = useCustomLogin(); //로그인 커스텀 훅
  const [fetching, setFetching] = useState(false); //로딩 모달
  const [result, setResult] = useState(false); // 결과가 나오면 모달창으로 결과 데이터가 보이게끔
  const [checkEmailResult, setCheckEmailResult] = useState(false);
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

    checkEmail(registerParam.email).then((result) => {
      if (result.RESULT === "DUPLICATE") {
        alert("이미 존재하는 이메일입니다.");
      }
      if (result.RESULT === "AVAILABLE") {
        alert("사용 가능한 이메일입니다.");
        setCheckEmailResult(true); //이메일 체크 완료
      }
    });

    setFetching(false);
  };

  const handleChange = (e) => {
    registerParam[e.target.name] = e.target.value;

    setRegisterParam({ ...registerParam });
  };

  //가입하기
  const handleClickRegister = () => {
    if (checkEmailResult === false) {
      alert("이메일 중복확인이 필요합니다.");
    } else if (checkEmailResult === true) {
      if (registerParam.nickname.length === 0) {
        alert("닉네임을 확인해 주세요");
        return;
      }
      if (registerParam.pw.length === 0) {
        alert("비밀번호를 확인해 주세요");
        return;
      }

      setFetching(true);
      try {
        registerPost(registerParam).then((result) => {
          if (result.RESULT === "SUCCESS") {
            setResult(result.RESULT);
            setFetching(false);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //결과 모달창 닫기
  const closeModal = () => {
    setResult(null);

    moveToLogin();
  };
  return (
    <div className="flex justify-center items-center flex-col  text-stone-700 py-10">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          callbackFn={closeModal}
          title={"정상적으로 회원가입 되었습니다."}
          content={`로그인 페이지로 이동합니다`}
        />
      ) : (
        <></>
      )}
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
            name="nickname"
            onChange={handleChange}
            className="w-full border border-stone-400 px-2 py-3"
            placeholder="닉네임"
          />
        </div>
        <div>
          <input
            type="password"
            name="pw"
            onChange={handleChange}
            className="w-full border border-stone-400 px-2 py-3"
            placeholder="비밀번호"
          />
        </div>

        <button
          className="w-full py-5 bg-amber-300"
          onClick={handleClickRegister}
        >
          회원가입
        </button>

        <div className="flex w-full">
          <div className="border-b border-stone-400 w-2/5"></div>
          <div className="w-1/5 text-center">또는</div>
          <div className="border-b border-stone-400 w-2/5"></div>
        </div>
        <div className="flex justify-center w-full">
          <Link to={link}>
            <img src="../kakao_login_medium_wide.png" alt="" className="w-96" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
