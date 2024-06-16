import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./goodsApi";

const host = `${API_SERVER_HOST}/api/reservation`;

//추가
export const postAdd = async (reservation) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.post(`${host}/`, reservation, header);

  return res.data;
};

//리스트 조회
export const getList = async (pageParams) => {
  const { page, size, genre } = pageParams;

  //쿼리 스트링은 option => params로 가져옴
  const res = await jwtAxios.get(`${host}/list`, {
    params: { page, size, genre },
  });

  return res.data;
};
