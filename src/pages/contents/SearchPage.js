import React, { useEffect, useState } from "react";
import { API_SERVER_HOST, getSearchList } from "../../api/goodsApi";
import useCustomMove from "../../hooks/useCustomMove";
import { Link, useParams, useSearchParams } from "react-router-dom";
const host = API_SERVER_HOST;

//초기값 설정-> 서버에서 출력되는 값
const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};
function SearchPage() {
  const [serverData, setServerData] = useState(initState);

  const { page, size, refresh } = useCustomMove();

  const [fetching, setFetching] = useState(false); //로딩 모달

  const searchParam = useParams();

  useEffect(() => {
    setFetching(true);

    let search = searchParam.search;

    console.log(search);
    try {
      getSearchList({ page, size }, search).then((data) => {
        setFetching(false);
        setServerData(data);

        console.log(data);
      });
    } catch (e) {
      console.log("error : ", e);
    }
  }, [page, size, refresh, searchParam]);

  return (
    <div className="flex flex-col">
      {/* contents List */}
      <div className="flex flex-col justify-center items-center space-y-10 py-20">
        <div className="text-3xl font-bold">
          {`"${searchParam.search}"`} 검색결과
        </div>
        <div className="flex flex-wrap w-9/12 gap-7 justify-center">
          {/* 1 */}
          {serverData.dtoList.map((goods) => (
            <Link
              to={`/goods/${goods.gno}`}
              className="w-56 overflow-hidden space-y-2 "
              key={goods.gno}
            >
              <img
                src={`${host}/api/goods/view/${goods.uploadFileNames[0]}`}
                className="w-full "
                alt="list image"
              />
              <div className="space-y-2">
                <p className="font-bold text-lg">{goods.title}</p>
                <p>{goods.gdesc}</p>
              </div>
              {goods.exclusive && (
                <div className="border rounded border-purple-500 w-20 text-sm p-1 flex items-center justify-center font-semibold text-purple-700">
                  단독판매
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
