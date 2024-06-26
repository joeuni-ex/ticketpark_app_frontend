import React, { useRef, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import FetchingModal from "../../../../components/common/FetchingModal";
import { postAdd } from "../../../../api/goodsApi";
import ResultModal from "../../../../components/common/ResultModal";
import useCustomMove from "../../../../hooks/useCustomMove";
import { useNavigate } from "react-router-dom";

//초기값
const initState = {
  gno: 0,
  title: "",
  place: "",
  startDate: "",
  endDate: "",
  gdesc: "",
  runningTime: 0,
  age: 0,
  genre: "concert",
  exclusive: 0,
  files: [],
  times: [],
};

function AddGoodsPage() {
  const [fetching, setFetching] = useState(false); //로딩 모달
  const [result, setResult] = useState(false); // 결과가 나오면 모달창으로 결과 데이터가 보이게끔

  const [goods, setGoods] = useState(initState); //굿즈 데이터
  const [images, setImages] = useState([]); //이미지
  const [times, setTimes] = useState([]); //공연시간표

  const navigate = useNavigate();

  const uploadRef = useRef();

  //이미지 추가
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageClick = () => {
    uploadRef.current.click();
  };
  //이미지 삭제
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // 공연 시간 추가
  const handleAddTime = () => {
    if (times.length >= 2) {
      alert("최대 두 개의 시간만 추가할 수 있습니다.");
      return;
    }
    setTimes([...times, ""]);
  };

  // 공연 시간 변경
  const handleChangeTime = (index, value) => {
    const newTimes = times.map((time, i) => (i === index ? value : time));
    setTimes(newTimes);
  };

  //입력값 변경 시
  const handleChangeGoods = (e) => {
    const { name, value } = e.target;
    setGoods((prevGoods) => ({
      ...prevGoods,
      [name]: value,
    }));
  };

  //상품 추가 버튼 클릭 시
  const handleClickAdd = () => {
    if (
      goods.title.length === 0 ||
      goods.place.length === 0 ||
      goods.startDate.length === 0 ||
      goods.endDate.length === 0 ||
      goods.genre.length === 0 ||
      goods.age.length === 0 ||
      goods.runningTime === 0 ||
      goods.gdesc.length === 0
    ) {
      alert("입력되지 않은 정보가 있습니다.");
      return;
    }

    setFetching(true); //로딩 모달 출력

    const formData = new FormData(); //파일이 포함되어있으므로, formData 타입으로 만들어서 보냄

    const files = uploadRef.current.files;

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); //서버에서 받을 때 이름,순차적으로 추가
    }

    for (let i = 0; i < times.length; i++) {
      formData.append("times", times[i]);
    }

    formData.append("title", goods.title);
    formData.append("place", goods.place);
    formData.append("startDate", goods.startDate);
    formData.append("endDate", goods.endDate);
    formData.append("gdesc", goods.gdesc);
    formData.append("runningTime", goods.runningTime);
    formData.append("age", goods.age);
    formData.append("genre", goods.genre);
    formData.append("exclusive", goods.exclusive);

    postAdd(formData).then((data) => {
      setFetching(false); //모달 닫기
      setResult(data.RESULT);
    });
  };

  //결과 모달창 닫기
  const closeModal = () => {
    setResult(null);

    navigate("/member/admin/goods/list");
  };

  console.log(goods);

  return (
    <div className="flex flex-col p-5">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          callbackFn={closeModal}
          title={"Product Add Result"}
          content={`${result}번 상품 등록 완료`}
        />
      ) : (
        <></>
      )}
      <div className="font-bold text-stone-800 text-xl py-10 px-5 border-b">
        상품 등록
      </div>

      <div className="flex flex-wrap md:flex-nowrap md:space-x-10 p-10 bg-stone-100 md:space-y-0  space-y-6">
        <div className="w-full  md:w-1/2 shadow-md p-5 bg-white">
          <div className="flex justify-between">
            <div className="text-stone-600 font-semibold">이미지</div>
            <div
              className="text-blue-400 font-semibold cursor-pointer"
              onClick={handleAddImageClick}
            >
              이미지추가
            </div>
            <input
              type="file"
              ref={uploadRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex mt-8 justify-center items-center flex-wrap gap-7">
            {images.map((image, index) => (
              <div key={index} className="relative flex w-60 h-72 bg-slate-500">
                <div
                  className="absolute right-2 top-2 text-2xl text-stone-400 cursor-pointer"
                  onClick={() => handleRemoveImage(index)}
                >
                  <TiDeleteOutline />
                </div>
                <img
                  src={image}
                  alt={`uploaded-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 shadow-lg p-5 bg-white">
          <div className="flex justify-between flex-col space-y-2">
            <div className="text-stone-600 w-full space-y-2 py-2">
              <div className="font-semibold">공연명</div>
              <input
                name="title"
                value={goods.title}
                onChange={handleChangeGoods}
                type="text"
                className="border w-full outline-none h-10"
              />
            </div>
            <div className="text-stone-600 w-full space-y-2 py-2">
              <div className="font-semibold">공연장소</div>
              <input
                name="place"
                value={goods.place}
                onChange={handleChangeGoods}
                type="text"
                className="border w-full outline-none h-10"
              />
            </div>
            <div className="text-stone-600 w-full space-y-2 py-2">
              <div className="font-semibold">공연기간</div>
              <div>
                <input
                  name="startDate"
                  value={goods.startDate}
                  onChange={handleChangeGoods}
                  type="date"
                  className="border w-5/12 outline-none h-10"
                />
                <span className="mx-9">~</span>
                <input
                  name="endDate"
                  value={goods.endDate}
                  onChange={handleChangeGoods}
                  type="date"
                  className="border w-5/12 outline-none h-10"
                />
              </div>
            </div>
            <div className="text-stone-600 w-full space-y-2 py-2">
              <div className="font-semibold">공연시간표</div>
              {times?.map((time, index) => (
                <div className="flex space-x-2" key={index}>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => handleChangeTime(index, e.target.value)}
                    className="border w-full outline-none h-10"
                  />
                </div>
              ))}
              {times?.length < 2 && (
                <button
                  onClick={handleAddTime}
                  className="mt-2 text-blue-400 font-semibold"
                >
                  시간 추가
                </button>
              )}
            </div>
            <div className="text-stone-600 w-full space-y-2 py-2">
              <div className="font-semibold">카테고리</div>
              <select
                name="genre"
                value={goods.genre}
                onChange={handleChangeGoods}
                className="border w-full outline-none h-10"
              >
                <option value="concert">concert</option>
                <option value="musical">musical</option>
                <option value="play">play</option>
                <option value="classic">classic</option>
              </select>
            </div>
            <div className="text-stone-600 w-full space-y-2 py-2">
              <div className="font-semibold">
                연령제한
                <span className="text-xs text-red-600 font-semibold ml-2">
                  *전체이용가의 경우 0을 입력하시오
                </span>
              </div>
              <input
                name="age"
                value={goods.age}
                onChange={handleChangeGoods}
                type="number"
                className="border w-full outline-none h-10"
              />
            </div>
            <div className="w-full space-y-2 py-2">
              <div className="text-stone-600 w-full space-y-2 py-2">
                <div className="font-semibold">
                  공연시간
                  <span className="text-xs text-red-600 font-semibold ml-2">
                    *분 단위로 입력
                  </span>
                </div>
                <input
                  name="runningTime"
                  value={goods.runningTime}
                  onChange={handleChangeGoods}
                  type="number"
                  className="border w-full outline-none h-10"
                />
              </div>
            </div>
            <div className="w-full space-y-2 py-2">
              <div className="text-stone-600 w-full space-y-2 py-2">
                <div className="font-semibold">단독 공연 여부</div>
                <select
                  name="exclusive"
                  value={goods.exclusive}
                  onChange={handleChangeGoods}
                  className="border w-full outline-none h-10"
                >
                  <option value="0">x</option>
                  <option value="1">o</option>
                </select>
              </div>
            </div>
            <div className="text-stone-600 w-full space-y-2 py-2">
              <div className="font-semibold">상세설명</div>
              <textarea
                name="gdesc"
                value={goods.gdesc}
                onChange={handleChangeGoods}
                className="border h-60 w-full outline-none resize-none"
              />
            </div>
            <div className="flex w-full justify-end">
              <div
                onClick={handleClickAdd}
                className="flex justify-center items-center cursor-pointer border border-orange-400 text-orange-400 w-40 h-16 rounded-md hover:bg-orange-100 text-lg text-sto"
              >
                상품등록
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGoodsPage;
