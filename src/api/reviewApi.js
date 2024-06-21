import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./goodsApi";

const host = `${API_SERVER_HOST}/api/review`;

//추가
export const postAdd = async (review) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.post(`${host}/`, review, header);

  return res.data;
};

//좋아요 추가
export const postIncreaseLikes = async (reno) => {
  const res = await jwtAxios.post(`${host}/increase-likes/${reno}`);

  return res.data;
};

//내가 작성한 리뷰 조회
export const getMyList = async () => {
  const res = await jwtAxios.get(`${host}/list`);

  return res.data;
};

//굿즈 별 리뷰 조회
export const getGoodsList = async (gno) => {
  const res = await jwtAxios.get(`${host}/list/${gno}`);

  return res.data;
};

//수정
export const modifyOne = async (reno, review) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.put(`${host}/${reno}`, review, header);

  return res.data;
};
