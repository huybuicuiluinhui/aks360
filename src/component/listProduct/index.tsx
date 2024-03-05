import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatNumber } from "../../utils";
import Images from "../../static";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const navigate = useNavigate();
  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div
          key={product.id}
          className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 rounded-sm "
          onClick={() => {
            navigate("/detailProduct");
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-[100%] h-[139px] object-cover"
          />
          <p className="text-main text-sm font-medium line-clamp-2">
            {product.name}
          </p>
          <img src="" alt="" />
          <div className="flex items-center justify-between mt-1">
            <p className="text-[#E50404] font-semibold text-[10px]">
              {formatNumber(product.price)}đ
            </p>
            <div className="bg-gray  p-[4px] rounded-full">
              <img
                src={Images.iconPlus}
                alt=""
                className="w-3 h-3 object-contain"
              />
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProductSlider;
