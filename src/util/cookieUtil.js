import { Cookies } from "react-cookie";

const cookies = new Cookies();

//로그인 시 정보 저장 이름/값/유효시간
export const setCookie = (name, value, days = 1) => {
  // 날짜 처리
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days); //보관 기간

  //경로는 하위 경로에서 다 사용할거라서 '/'
  return cookies.set(name, value, { expires: expires, path: "/" });
};

//쿠키 조회
export const getCookie = (name) => {
  return cookies.get(name);
};

//쿠키 삭제 -> 로그아웃 시
export const removeCookie = (name, path = "/") => {
  cookies.remove(name, { path: path }); //삭제할 쿠키 경로 설정
};
