import { useEffect, useState } from "react";
import useCustomMove from "../../../../hooks/useCustomMove";
import { API_SERVER_HOST, getList, modifyOne } from "../../../../api/goodsApi";
import { Link, useNavigate } from "react-router-dom";
import FetchingModal from "../../../../components/common/FetchingModal";
import ConfirmModal from "../../../../components/common/ConfirmModal";
import ResultModal from "../../../../components/common/ResultModal";
import PageComponent from "../../../../components/common/PageComponent";

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

const deleteState = {
  delFlag: true,
};

function ListPage() {
  const [serverData, setServerData] = useState(initState);
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [genre, setGenre] = useState("all");

  const [fetching, setFetching] = useState(false); //로딩 모달
  const [deleteModal, setDeleteModal] = useState(false); //삭제 모달
  const [deleteGno, setDeleteGno] = useState("");
  const [result, setResult] = useState(false); //결과 모달

  const navigate = useNavigate();

  // ==================== 삭제 ==========================
  //삭제 모달
  const handleClickDelete = async (gno) => {
    setDeleteGno(gno);
    setDeleteModal(true);
  };

  //삭제 모달 -> 확인 클릭 시
  const handleConfirmDelete = async () => {
    setDeleteModal(false);
    setFetching(true);
    try {
      const result = await modifyOne(deleteGno, deleteState).then((result) => {
        setResult(deleteGno);
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      setResult("Error deleting item");
    } finally {
      setFetching(false);
    }
  };

  //결과 모달창 닫기
  const closeModal = () => {
    setResult(null);
    navigate("/member/admin/goods/list");
  };

  //삭제 모달창 닫기
  const handleCancelDelete = () => {
    setDeleteModal(false);
    setDeleteGno(null);
  };

  useEffect(() => {
    setFetching(true);

    getList({ page, size, genre }).then((data) => {
      setFetching(false);
      setServerData(data);
    });
  }, [page, size, refresh, result, genre]);

  return (
    <div className="flex flex-col p-5">
      {fetching ? <FetchingModal /> : <></>}
      {deleteModal && (
        <ConfirmModal
          message="해당 제품을 삭제하시겠습니까?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {result && (
        <ResultModal
          callbackFn={closeModal}
          title={"Product Add Result"}
          content={`${result}번 상품 삭제 완료`}
        />
      )}
      <div className="font-bold text-stone-800 text-xl py-10 px-5 border-b-2 border-stone-600">
        상품 목록
      </div>
      <div className="w-full flex px-10 h-20 font-bold text-lg bg-stone-100 items-center  border-b border-stone-200 ">
        <div className="w-1/4"></div>
      </div>

      <div className="flex w-full justify-end px-10 py-3">
        <select
          name="genre"
          value={genre}
          className="w-32"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="concert">콘서트</option>
          <option value="musical">뮤지컬</option>
          <option value="play">연극</option>
          <option value="classic">클래식</option>
        </select>
      </div>

      <div className="flex flex-wrap mx-auto justify-center p-6 w-full ">
        {serverData.dtoList?.map((goods) => (
          <div
            key={goods.gno}
            className="flex justify-between w-full  md:min-w-[400px] p-2 mx-2 my-3 rounded shadow-md text-stone-700"
          >
            <div className="flex w-full flex-col text-sm md:text-base">
              <div className="flex justify-between w-full  p-2 ">
                <div className="font-extrabold text-base md:text-2xl">
                  {goods.gno}
                </div>
                <div className="flex space-x-2 justify-center md:ml-5">
                  <button
                    onClick={() => handleClickDelete(goods.gno)}
                    className="px-2 py-1 md:px-4 md:py-2 border h-10  text-stone-600 text-xs md:text-base border-stone-300 hover:bg-stone-50"
                  >
                    삭제
                  </button>

                  <Link to={`/member/admin/goods/modify/${goods.gno}`}>
                    <div className="flex items-center  px-2 py-1 md:px-4 md:py-2 bg-stone-500  h-10   text-xs md:text-base text-white hover:bg-stone-400">
                      수정
                    </div>
                  </Link>
                </div>
              </div>

              <div className="flex  ">
                <Link
                  to={`/goods/${goods.gno}`}
                  className="text-1xl m-1 p-2 w-2/10 font-medium"
                >
                  <img
                    src={`${host}/api/goods/view/${goods.uploadFileNames[0]}`}
                    className="w-36 md:w-56"
                    alt="image"
                  />
                </Link>
                <div className="flex  flex-col">
                  <Link
                    to={`/goods/${goods.gno}`}
                    className="text-xl md:m-1 p-2  font-extrabold"
                  >
                    {goods.title}
                  </Link>
                  <div className="text-1xl md:m-1 p-2  font-medium">
                    <span className="font-semibold">공연장소</span>{" "}
                    {goods.place}
                  </div>
                  <div className="text-1xl md:m-1 p-2  font-medium">
                    <span className="font-semibold">공연기간</span>{" "}
                    {goods.startDate} ~ {goods.endDate}
                  </div>
                  <div className="text-1xl md:m-1 p-2  font-medium">
                    <span className="font-semibold">연령제한</span>{" "}
                    {goods.age === 0 ? "전체이용가" : goods.age}세 이상
                  </div>
                  <div className="text-1xl md:m-1 p-2  font-medium">
                    <span className="font-semibold">공연시간</span>{" "}
                    {goods.runningTime}분
                  </div>
                  <div className="text-1xl md:m-1 p-2  font-medium w-4/5">
                    <span className="font-semibold">출연</span> {goods.gdesc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
}

export default ListPage;
