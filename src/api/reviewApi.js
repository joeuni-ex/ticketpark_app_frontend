import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./goodsApi";

const host = `${API_SERVER_HOST}/api/review`;

//추가
export const postAdd = async (review) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.post(`${host}/`, review, header);

  return res.data;
};

//조회
export const getOneReview = async (reno) => {
  const res = await jwtAxios.get(`${host}/${reno}`);

  return res.data;
};

//좋아요 추가 또는 삭제
export const postChangeLikes = async (reno) => {
  const res = await jwtAxios.post(`${host}/likes/${reno}`);

  return res.data;
};

//내가 작성한 리뷰 조회
export const getList = async (email) => {
  const res = await jwtAxios.get(`${host}/list`, {
    params: { email },
  });

  return res.data;
};

//굿즈 별 리뷰 조회
export const getGoodsList = async (gno, email) => {
  const res = await axios.get(`${host}/list/${gno}`, {
    params: { email },
  });

  return res.data;
};

//예약번호로 리뷰 작성여부 체크
export const getCheckWrittenReview = async (rno, writtenReview) => {
  const res = await jwtAxios.get(`${host}/check-review`, {
    params: { rno, writtenReview },
  });

  return res.data;
};

//수정
export const modifyOne = async (reno, review) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.put(`${host}/${reno}`, review, header);

  return res.data;
};
