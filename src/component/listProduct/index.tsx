import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatNumber } from "../../utils";
import Images from "../../static";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../types/product.type";
import { API_URL_IMAGE } from "../../utils/contanst";

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   oldPrice: number;
// }

interface ProductSliderProps {
  products: IProduct[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  isOpen,
  setIsOpen,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  function randomTwoDigitNumber() {
    return Math.floor(Math.random() * 90) + 10; // Tạo số ngẫu nhiên từ 10 đến 99
  }
  const navigate = useNavigate();
  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 rounded-[10px]   bg-white  shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]"
        >
          <img
            onClick={() => {
              navigate(`/detailProduct/${product.id}`);
            }}
            src={API_URL_IMAGE + product.image}
            alt={product.name}
            className="w-[100%] h-[119px] object-contain rounded-[4px]"
          />
          <p className="text-main text-sm font-medium line-clamp-2 mt-4">
            {product.name}
          </p>
          <img src="" alt="" />
          <div className="flex items-center justify-between mt-1">
            <p className="text-[#E50404] font-bold text-[10px]">
              {formatNumber(product.price_promotional)}đ
            </p>
            <p className="text-black font-normal text-[10px] line-through">
              {formatNumber(product.price)}đ
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-[10px] font-normal text-main flex-1">
              {randomTwoDigitNumber()} lượt xem
            </p>
            <div className="flex items-center gap-1">
              <div
                className="bg-[#198303]  p-[4px] rounded-full"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <img
                  src={Images.iconPlus}
                  alt=""
                  className="w-3 h-3 object-contain"
                />
              </div>
              <div className="">
                <img
                  src={Images.iconMore}
                  alt=""
                  className="w-3 h-3 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProductSlider;
