import React, { useEffect, useState } from "react";
import BasicLayout from "../layout/BasicLayout";
import Slider from "react-slick";

import styled from "styled-components";
import {
  concertSliderImages,
  focusImages,
  mainSliderImages,
  newImages,
} from "../images";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import YoutubeComponent from "../components/youtube/YoutubeComponent";
import CardComponent from "../components/card/CardComponent";
import useCustomMove from "../hooks/useCustomMove";
import { API_SERVER_HOST, getList } from "../api/goodsApi";

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

function MainPage() {
  const [serverData, setServerData] = useState(initState);
  const { page, size, refresh } = useCustomMove();
  const [newData, setNewData] = useState(initState);

  const [fetching, setFetching] = useState(false); //로딩 모달

  useEffect(() => {
    let genre = "all";
    setFetching(true);
    try {
      getList({ page, size, genre }).then((data) => {
        setFetching(false);
        setNewData(data);
      });
    } catch (e) {
      console.log("error : ", e);
    }
  }, [page, size, refresh]);

  console.log(newData);

  // Web Slider Settings
  const webSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <BasicLayout>
      {/* Web Slider  */}
      <div className="slider-container  ">
        <Slider {...webSettings}>
          {mainSliderImages.map((item) => (
            <div key={item.id}>
              <img src={item.src} alt={item.alt} className="h-80  md:h-auto" />
            </div>
          ))}
        </Slider>
      </div>

      {/* section 2*/}
      <div className="flex  w-full flex-col items-center justify-center py-20 space-y-10">
        <div className="text-2xl  md:text-4xl font-bold text-stone-900">
          FOCUS ON
        </div>

        <div className="flex">
          {focusImages.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden border hover:border-yellow-300 "
            >
              <img
                src={image.src}
                alt={image.alt}
                className="hover:scale-105   duration-300 ease-in-out border"
              />
            </div>
          ))}
        </div>
      </div>

      {/* section 3*/}
      <div className="flex flex-col w-full items-center  py-20 space-y-10">
        <div className="text-2xl  md:text-4xl  font-bold text-stone-900">
          WHAT'S NEW
        </div>
        {/* 최신순 정렬 */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center ">
            {/* 큰 사이즈  */}
            {newData.dtoList.length > 0 && (
              <>
                <CardComponent
                  item={newData.dtoList[0]}
                  src={newData.dtoList[0].uploadFileNames}
                  width="min-w-[120px] max-w-[100px] sm:min-w-[250px] sm:max-w-[250px] md:min-w-[300px] md:max-w-[300px] lg:min-w-[380px] lg:max-w-[400px]"
                />
                <div className="flex text-xs md:text-lg justify-center my-2 font-bold m-0 p-0">
                  {newData.dtoList[0].title}
                </div>
              </>
            )}
          </div>
          {/* 작은 사이즈  */}
          <div
            className="flex w-7/12 md:w-9/12 md:min-w-[480px] md:max-w-[480px] lg:min-w-[680px] lg:max-w-[800px]
          
          flex-wrap gap-1 md:gap-3 lg:gap-5 justify-center"
          >
            {newData.dtoList.slice(1, 7).map((item) => (
              <CardComponent
                item={item}
                width="min-w-[60px] max-w-[60px] md:min-w-[140px] md:max-w-[140px] lg:min-w-[200px] lg:max-w-[200px]"
                hight="lg:h-[230px] min-h-[60px] max-h-[230px]"
                key={item.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* section 4 */}
      <div className="flex flex-col w-full items-center py-20 space-y-10">
        <div className="text-2xl  md:text-4xl font-bold text-stone-900">
          TICKET PARK PLAY
        </div>
        {/* 유튜브 영상 */}
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <YoutubeComponent
            videoId={"t9tBts5crG8"}
            src="./main/youtube_1.gif"
            dsc="10주년 맞은 최강 뮤직 페스티벌!
                  울트라뮤직 페스티벌 코리아 2024"
          />
          <YoutubeComponent
            videoId={"oQoo3ziXu08"}
            src="./main/youtube_2.gif"
            dsc="대망의 무대! World DJ Festival 2024 스팟 영상"
          />
          <YoutubeComponent
            videoId={"qCRlGCWWsOk"}
            src="./main/youtube_3.gif"
            dsc="가슴이 두근두근! 2024 하이라이트 콘서트 'LIGHTS GO ON, AGAIN' 스팟 영상"
          />
        </div>
      </div>

      {/* section 5 */}
      <div className="flex  w-full flex-col items-center justify-center py-20 space-y-10">
        <div className="text-2xl  md:text-4xl  font-bold text-stone-900">
          CONCERT & CLASSIC
        </div>
        {/* web */}
        <div className=" space-x-5 hidden md:flex w-full justify-center items-center">
          {newImages.map((item) => (
            <CardComponent key={item.id} item={item} width="w-64" />
          ))}
        </div>
        {/* mobile */}
        <div className="gap-5 flex md:hidden w-full  justify-center items-center flex-wrap">
          {newImages.slice(0, 4).map((item) => (
            <CardComponent key={item.id} item={item} width="w-32" />
          ))}
          <button className="w-full flex justify-center mx-14 py-5 border-gray-500 border bg-gray-50 rounded-lg">
            더보기
          </button>
        </div>
      </div>
    </BasicLayout>
  );
}

export default MainPage;
