import React from "react";
import BasicLayout from "../layout/BasicLayout";
import Slider from "react-slick";
import SliderImages from "../sliderImages";
import styled from "styled-components";

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
            {SliderImages.map((item) => (
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
          {SliderImages.map((item) => (
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
    </BasicLayout>
  );
}
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
