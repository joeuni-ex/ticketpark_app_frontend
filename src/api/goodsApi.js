import axios from "axios";

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/goods`;

//추가
export const postAdd = async (goods) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.post(`${prefix}/`, goods, header);

  return res.data;
};

//조회
export const getOne = async (gno) => {
  const res = await axios.get(`${prefix}/${gno}`);

  return res.data;
};

//리스트 조회
export const getList = async (pageParams) => {
  const { page, size, genre } = pageParams;

  //쿼리 스트링은 option => params로 가져옴
  const res = await axios.get(`${prefix}/list`, {
    params: { page, size, genre },
  });

  return res.data;
};

//수정
export const modifyOne = async (gno, goods) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.put(`${prefix}/${gno}`, goods, header);

  return res.data;
};
