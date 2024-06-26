import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import {
  classicSliderImages,
  concertSliderImages,
  musicalSliderImages,
  playSliderImages,
} from "../../images";
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST, getList } from "../../api/goodsApi";
import FetchingModal from "../../components/common/FetchingModal";
import PageComponent from "../../components/common/PageComponent";

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

function ListPage() {
  const [serverData, setServerData] = useState(initState);
  const { page, size, refresh, moveToList } = useCustomMove();
  const [genre, setGenre] = useState("all");
  const [genreTitle, setGenreTitle] = useState(null);

  const [fetching, setFetching] = useState(false); //로딩 모달
  const genreParam = useParams();
  const [sliderImages, setSliderImages] = useState(null);

  useEffect(() => {
    setFetching(true);

    setGenre(genreParam.genre);

    if (genreParam.genre == "musical") {
      setGenreTitle("뮤지컬");
      setSliderImages(musicalSliderImages);
    } else if (genreParam.genre == "concert") {
      setGenreTitle("콘서트");
      setSliderImages(concertSliderImages);
    } else if (genreParam.genre == "play") {
      setGenreTitle("연극");
      setSliderImages(playSliderImages);
    } else if (genreParam.genre == "classic") {
      setGenreTitle("클래식");
      setSliderImages(classicSliderImages);
    }

    try {
      getList({ page, size, genre }).then((data) => {
        setFetching(false);
        setServerData(data);
      });
    } catch (e) {
      console.log("error : ", e);
    }
  }, [page, size, refresh, genre, genreParam]);

  // Web Slider Settings
  const webSettings = {
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    centerPadding: "60px",
    // cssEase: "linear",
  };

  // Mobile Slider Settings
  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
  };

  return (
    <div className="flex flex-col w-full">
      {fetching ? <FetchingModal /> : <></>}
      {/* Web Slider  */}
      <div className="slider-container my-6 hidden md:block ">
        <SlideContainer>
          <Slider {...webSettings}>
            {sliderImages?.map((item) => (
              <div key={item.id}>
                <SlidePage>
                  <MultiItem>
                    <img src={item.src} alt={item.alt} />
                  </MultiItem>
                </SlidePage>
              </div>
            ))}
          </Slider>
        </SlideContainer>
      </div>

      {/* Mobile Slider */}
      <div className="slider-container  md:hidden">
        <Slider {...mobileSettings}>
          {sliderImages?.map((item) => (
            <div key={item.id}>
              <SlidePage>
                <MultiItem>
                  <img src={item.src} alt={item.alt} />
                </MultiItem>
              </SlidePage>
            </div>
          ))}
        </Slider>
      </div>

      {/* contents List */}
      <div className="flex flex-col justify-center items-center space-y-10 py-20">
        <div className="text-3xl font-bold">{`${genreTitle}`} 둘러보기</div>
        <div className="flex flex-wrap w-9/12 gap-7 justify-center max-w-[1300px] ">
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
                <p>
                  {goods.gdesc.length > 10
                    ? goods.gdesc.substring(0, 21) + "..."
                    : goods.gdesc}
                </p>
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
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
}

// 슬라이더 React-Slick 라이브러리 관련  CSS
export const MultiItem = styled.div`
  opacity: 1;
  transform: scale(1.04);
`;

export const SlideContainer = styled.div`
  padding: 0 20px;

  /* width 옵션으로 전체 width 값을 지정할 수 있음 */
  /* width: 500px; */

  .center .slick-center ${MultiItem} {
    /* center 모드일때 center에게 강조할 경우 사용 */
    color: #e67e22;
    opacity: 1;
    transform: scale(1.08);
  }

  .center ${MultiItem} {
    /* center 모드일때 center 외 속성에게 사용 */
    opacity: 0.7;
    transition: all 300ms ease;
    transform: scale(0.99);
  }
`;

export const SlidePage = styled.div`
  text-align: center;

  padding: ${(props) => props.padding};

  ${MultiItem} {
    /* center 옵션의 경우 MultiTem 속성을 추가로 사용해서 내부 옵션을 추가로 줘야함 */

    color: #fff;
    font-size: 36px;
    line-height: 100px;
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
  }
`;

export default ListPage;
