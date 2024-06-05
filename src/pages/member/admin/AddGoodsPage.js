import React, { useRef, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import FetchingModal from "../../../components/common/FetchingModal";

function AddGoodsPage() {
  const [fetching, setFetching] = useState(false); //로딩 모달

  const [images, setImages] = useState([]);
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

  const handleClickRegister = () => {
    setFetching(true); //로딩 모달 출력
  };

  return (
    <div className="flex flex-col p-5">
      {fetching ? <FetchingModal /> : <></>}
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
              <input type="text" className="border w-full outline-none h-10" />
            </div>
            <div className="text-stone-600 w-full space-y-2 py-2">
              <div className="font-semibold">공연장소</div>
              <input type="text" className="border w-full outline-none h-10" />
            </div>
            <div className="text-stone-600 w-full space-y-2 py-2">
              <div className="font-semibold">카테고리</div>
              <select className="border w-full outline-none h-10">
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
              <input type="text" className="border w-full outline-none h-10" />
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
                  type="text"
                  className="border w-full outline-none h-10"
                />
              </div>
            </div>
            <div className="text-stone-600 w-full space-y-2 py-2">
              <div className="font-semibold">상세설명</div>
              <textarea className="border h-60 w-full outline-none resize-none" />
            </div>
            <div className="flex w-full justify-end">
              <div
                onClick={handleClickRegister}
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
