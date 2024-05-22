import React from "react";
import BasicLayout from "../layout/BasicLayout";
import Slider from "react-slick";

import styled from "styled-components";
import { sliderImages, focusImages, newImages } from "../images";
import { Link } from "react-router-dom";

function MainPage() {
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
    <BasicLayout>
      {/* Web Slider  */}
      <div className="slider-container my-6 hidden md:block">
        <SlideContainer>
          <Slider {...webSettings}>
            {sliderImages.map((item) => (
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
          {sliderImages.map((item) => (
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

      {/* section 2*/}
      <div className="flex  w-full flex-col items-center justify-center py-20 space-y-10">
        <div className="  text-4xl  font-bold text-stone-900">FOCUS ON</div>

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
      <div className="flex flex-col w-full items-center py-10 space-y-10">
        <div className="  text-4xl font-bold text-stone-900">WHAT'S NEW</div>
        {/* 최신순 정렬 */}
        <div className="flex space-x-5">
          {newImages.map((item) => (
            <div className="relative overflow-hidden w-64" key={item.id}>
              <Link>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="transition-opacity duration-500 ease-in-out hover:opacity-60"
                />
                <div className="absolute space-y-3 flex-col top-0 left-0 w-full h-full flex justify-center items-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-500 ease-in-out ">
                  <di v className="text-white text-xl font-semibold ">
                    영화 제목
                  </di>
                  <div className="text-white text-lg font-semibold">설명</div>
                  <div className="text-orange-600 text-lg font-semibold">
                    상세보기
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </BasicLayout>
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

export default MainPage;
