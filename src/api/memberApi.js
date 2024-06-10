import axios from "axios";
import { API_SERVER_HOST } from "./goodsApi";

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

//이메일 중복 확인
export const checkEmail = async (email) => {
  const res = await axios.get(`${host}/check-email`, {
    params: { email },
  });

  return res.data;
};

//가입하기
export const registerPost = async (registerParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("email", registerParam.email);
  form.append("pw", registerParam.pw);
  form.append("nickname", registerParam.nickname);
  form.append("social", registerParam.social);
  form.append("roleNames", registerParam.roleNames);

  const res = await axios.post(`${host}/`, form, header);

  return res.data;
};
