import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/goodsApi";

const jwtAxios = axios.create();

//토큰 갱신
const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;

  const header = { headers: { Authorization: `Bearer ${accessToken}` } };

  const res = await axios.get(
    `${host}/api/member/refresh?refreshToken=${refreshToken}`,
    header
  );

  console.log(res.data);

  return res.data;
};

//before Request
const beforeReq = (config) => {
  console.log("before request.........");

  const memberInfo = getCookie("member"); //쿠키에서 member 값 가져오기

  if (!memberInfo) {
    //memberInfo가 없으면
    console.log("Member NOT FOUND");

    return Promise.reject({
      response: {
        data: { error: "REQUIRE_LOGIN" },
      },
    });
  }

  const { accessToken } = memberInfo;

  console.log("---------------------------------" + accessToken);

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

//fail Request
const requestFail = (err) => {
  console.log("request error............");

  return Promise.reject(err);
};

//before return response
const beforeRes = async (res) => {
  console.log("before return response.....");

  //토큰 만료
  const data = res.data;
  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const memberCookieValue = getCookie("member");

    const result = await refreshJWT(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken
    );

    //새로운 accessToken, refreshToken

    memberCookieValue.accessToken = result.accessToken;
    memberCookieValue.refreshToken = result.refreshToken;

    //쿠키에 새로운 토큰 갱신
    setCookie("member", JSON.stringify(memberCookieValue), 1);

    //새로 발급 받은 토큰으로 재 호출을 하여 에러 방지
    const originalRequest = res.config;

    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

    //리프레쉬가 된 다음 한번 더 호출
    return await axios(originalRequest);
  }

  return res;
};

//fail Response
const responseFail = (err) => {
  console.log("response fail error........");

  return Promise.reject(err);
};

//요청 보내기 전에 할 것
jwtAxios.interceptors.request.use(beforeReq, requestFail);

//응답을 받기 전에 할 것
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
