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

  const [fetching, setFetching] = useState(false); //로딩 모달
  const [deleteModal, setDeleteModal] = useState(false); //삭제 모달
  const [deleteGno, setDeleteGno] = useState("");
  const [result, setResult] = useState(false); //결과 모달

  const navigate = useNavigate();

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

    getList({ page, size }).then((data) => {
      setFetching(false);
      setServerData(data);
    });
  }, [page, size, refresh, result]);

  return (
    <div className=" mt-10 mr-2 ml-2">
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

      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.map((goods) => (
          <div
            key={goods.gno}
            className="flex justify-between w-full min-w-[400px] p-2 m-2 rounded shadow-md text-stone-700"
          >
            <div className="flex w-full">
              <div className="flex ">
                <div className="font-extrabold text-2xl p-2 w-1/12">
                  {goods.gno}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  <img
                    src={`${host}/api/goods/view/s_${goods.uploadFileNames[0]}`}
                    alt="image"
                  />
                </div>
                <div className="flex w-96 flex-col">
                  <div className="text-1xl m-1 p-2  font-extrabold">
                    {goods.title}
                  </div>
                  <div className="text-1xl m-1 p-2  font-medium">
                    <span className="font-semibold">공연장소</span>{" "}
                    {goods.place}
                  </div>
                  <div className="text-1xl m-1 p-2  font-medium">
                    <span className="font-semibold">공연기간</span>{" "}
                    {goods.startDate} ~ {goods.endDate}
                  </div>
                  <div className="text-1xl m-1 p-2  font-medium">
                    <span className="font-semibold">연령제한</span>{" "}
                    {goods.age === 0 ? "전체이용가" : goods.age}세 이상
                  </div>
                  <div className="text-1xl m-1 p-2  font-medium">
                    <span className="font-semibold">공연시간</span> {goods.time}
                    분
                  </div>
                </div>
              </div>
            </div>
            <div className="text-1xl m-1 p-2 w-48 font-medium">
              <Link to={`member/admin/goods/modify/${goods.gno}`}>수정</Link> /{" "}
              <span
                className="cursor-pointer"
                onClick={() => handleClickDelete(goods.gno)}
              >
                삭제
              </span>
            </div>
          </div>
        ))}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
}

export default ListPage;
