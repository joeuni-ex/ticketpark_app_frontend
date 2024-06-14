import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./goodsApi";

const host = `${API_SERVER_HOST}/api/reservation`;

//추가
export const postAdd = async (reservation) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.post(`${host}/`, reservation, header);

  return res.data;
};
