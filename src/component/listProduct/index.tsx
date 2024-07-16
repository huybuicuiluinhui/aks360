import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatNumber } from "../../utils";
import Images from "../../static";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../types/product.type";
import { API_URL_IMAGE } from "../../utils/contanst";
import { useMutation } from "@tanstack/react-query";
import productApi from "../../apis/product.apis";

interface ProductSliderProps {
  products: IProduct[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  detailProduct: IProduct | undefined;
  setDetailProduct: React.Dispatch<React.SetStateAction<IProduct | undefined>>;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  isOpen,
  setIsOpen,
  detailProduct,
  setDetailProduct,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const navigate = useNavigate();
  const detailProductMutation = useMutation({
    mutationFn: productApi.getDetailProduct,
    onSuccess: (data) => {
      setDetailProduct(data.data.data);
    },
    onError: (err) => {
      console.log("lõi", err);
    },
  });
  const handleDetail = (id: number) => {
    detailProductMutation.mutate(id);
  };
  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.id} className=" rounded-[10px]   bg-[#fbfbfb]  pb-2">
          <img
            onClick={() => {
              navigate(`/detailProduct/${product.id}`);
            }}
            src={product.image}
            alt={product.name}
            className="w-[100%] h-auto object-contain rounded-[10px]"
          />
          <p className="text-main text-sm font-medium line-clamp-2 mt-4">
            {product.name}
          </p>
          {/* <div className="flex items-center justify-between mt-1">
          
          </div> */}
          <div className="flex items-center justify-between mt-1">
            {/* <p className="text-[10px] font-normal text-main flex-1">
              {randomTwoDigitNumber()} lượt xem
            </p> */}
            <p className="text-[#097770] font-bold text-[10px]">
              {formatNumber(product.price)}đ
            </p>
            <div className="flex items-center gap-1">
              <div
                className="bg-[#198303]  p-[4px] rounded-full"
                onClick={() => {
                  setIsOpen(!isOpen);
                  handleDetail(product.id);
                }}
              >
                <img
                  src={Images.iconPlus}
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
