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

function ListPage() {
  const genreParam = useParams();

  const [genre, setGenre] = useState("콘서트"); //컨텐츠 종류

  const [sliderImages, setSliderImages] = useState(null);

  useEffect(() => {
    if (genreParam.genre == "musical") {
      setGenre("뮤지컬");
      setSliderImages(musicalSliderImages);
    } else if (genreParam.genre == "concert") {
      setGenre("콘서트");
      setSliderImages(concertSliderImages);
    } else if (genreParam.genre == "play") {
      setGenre("연극");
      setSliderImages(playSliderImages);
    } else if (genreParam.genre == "classic") {
      setGenre("클래식");
      setSliderImages(classicSliderImages);
    }
  }, [genreParam]);

  console.log(sliderImages);

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
    <div className="flex flex-col">
      {/* Web Slider  */}
      <div className="slider-container my-6 hidden md:block">
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
        <div className="text-3xl font-bold">{`${genre}`} 둘러보기</div>
        <div className="flex flex-wrap w-9/12 gap-7 justify-center">
          {/* 1 */}

          <Link to={"/goods/1"} className="w-56 overflow-hidden space-y-2 ">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
            <div className="border rounded border-purple-500 w-20 text-sm p-1 flex items-center justify-center font-semibold text-purple-700">
              단독판매
            </div>
          </Link>
          {/* 2 */}
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
            <div className="border rounded border-purple-500 w-20 text-sm p-1 flex items-center justify-center font-semibold text-purple-700">
              단독판매
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
          <div className="w-56 overflow-hidden space-y-2">
            <img src="/main/new_1.jpg" className="w-full " alt="" />
            <div className="space-y-2">
              <p className="font-bold text-lg">제목</p>
              <p>설명</p>
            </div>
          </div>
        </div>
      </div>
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
