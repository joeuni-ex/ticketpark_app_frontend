import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  //만약 param이 없으면, defaultValue로 리턴한다.
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  //파라미터 값
  const [queryParams] = useSearchParams();

  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);

  //page=3&size=10
  const queryDefault = createSearchParams({ page, size }).toString(); //새로 추가

  const moveToList = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      //moveToList 함수에 파라미터 값이 있을 경우
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      //moveToList 함수에 파라미터 값이 있을 경우
      queryStr = queryDefault;
    }
    navigate({ pathname: "", search: queryStr });
  };

  return { moveToList, page, size, refresh };
};

export default useCustomMove;
