import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Images from "../../static";

const SliderHome = () => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  const listBanner = [
    Images.bannerTest,
    Images.bannerTest,
    Images.bannerTest,
    Images.bannerTest,
    Images.bannerTest,
    Images.bannerTest,
  ];
  return (
    <div className="w-full flex ">
      <div className="w-full ">
        <Slider {...settings}>
          {listBanner.map((item, index) => {
            return (
              <div
                className="flex flex-col w-full items-center justify-center "
                key={index}
              >
                <img src={item} className="w-full  object-cover mx-auto" />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
export default SliderHome;
