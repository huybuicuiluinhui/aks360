import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../static";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatNumber } from "../../utils";
interface IDataProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}
interface IDateCategory {
  image: string;
  id: number;
  title: string;
}
const Shop = () => {
  const navigate = useNavigate();
  const [dataCategory, setDataCategory] = useState<IDateCategory[]>([
    {
      id: 1,
      image: Images.iconMilk,
      title: "sữa tươi",
    },
    {
      id: 2,
      image: Images.iconMilk,
      title: "sữa tươi",
    },
    {
      id: 3,
      image: Images.iconMilk,
      title: "sữa tươi",
    },
    {
      id: 4,
      image: Images.iconMilk,
      title: "sữa tươi",
    },
    {
      id: 5,
      image: Images.iconMilk,
      title: "sữa tươi",
    },
    {
      id: 6,
      image: Images.iconMilk,
      title: "sữa tươi",
    },
  ]);
  const [dataProduct, setDataProduct] = useState<IDataProduct[]>([
    {
      id: 1,
      name: "Lineabon D3K2 có vita ma K7 số 1 tại thế giới đó ahi hiahi h haihs haishish iasdf d adsf",
      price: 20000000,
      image: Images.imgTest,
    },
    {
      id: 2,
      name: "Lineabon D3K2 có vita ma K7 số 1 tại thế giới đó ahi hiahi h haihs haishish iasdf d adsf",
      price: 20000000,
      image: Images.imgTest,
    },
    {
      id: 3,
      name: "Lineabon D3K2 có vita ma K7 số 1 tại thế giới đó ahi hiahi h haihs haishish iasdf d adsf",
      price: 20000000,
      image: Images.imgTest,
    },
    {
      id: 4,
      name: "Lineabon D3K2 có vita ma K7 số 1 tại thế giới đó ahi hiahi h haihs haishish iasdf d adsf",
      price: 20000000,
      image: Images.imgTest,
    },
    {
      id: 5,
      name: "Lineabon D3K2 có vita ma K7 số 1 tại thế giới đó ahi hiahi h haihs haishish iasdf d adsf",
      price: 20000000,
      image: Images.imgTest,
    },
    {
      id: 6,
      name: "Lineabon D3K2 có vita ma K7 số 1 tại thế giới đó ahi hiahi h haihs haishish iasdf d adsf",
      price: 20000000,
      image: Images.imgTest,
    },
    {
      id: 7,
      name: "Lineabon D3K2 có vita ma K7 số 1 tại thế giới đó ahi hiahi h haihs haishish iasdf d adsf",
      price: 20000000,
      image: Images.imgTest,
    },
    {
      id: 8,
      name: "Lineabon D3K2 có vita ma K7 số 1 tại thế giới đó ahi hiahi h haihs haishish iasdf d adsf",
      price: 20000000,
      image: Images.imgTest,
    },
  ]);
  return (
    <div className="w-full h-full bg-bg">
      <div className="w-full bg-gradient-to-r from-[#098B8B] to-[#0DB2A8] flex items-center justify-start gap-5 py-5 px-[20px]">
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <img
            src={Images.iconArrLeft}
            alt=""
            className="w-[9px] h-[16px] object-contain"
          />
        </div>
        <div className="flex bg-white rounded-[20px]  items-center pl-2">
          <img
            src={Images.iconSearch}
            alt=""
            className="w-4 h-4 object-contain"
          />
          <input
            type="text"
            name=""
            id=""
            className="flex-1 py-1 rounded-[20px] px-2"
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex whitespace-nowrap">
          {dataCategory.map((item, index) => (
            <div
              key={index}
              className=" w-fit h-auto p-1 m-2 bg-white  rounded-lg text-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            >
              <div className="py-[20px] bg-[#B2F1EE] w-[80px] rounded-xl flex items-center justify-center">
                <img
                  src={item.image}
                  alt=""
                  className=" w-[32px] h-[32px] object-contain "
                />
              </div>
              <p className="text-[#828282] text-xs font-normal my-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-between px-[20px] mb-36">
        {dataProduct.map((item, index) => {
          return (
            <div
              key={item.id}
              className=" shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-2 rounded-sm  w-[48%] my-4"
              onClick={() => {
                navigate("/detailProduct");
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[100%] h-[139px] object-cover"
              />
              <p className="text-main text-sm font-medium line-clamp-2">
                {item.name}
              </p>
              <img src="" alt="" />
              <div className="flex items-center justify-between mt-1">
                <p className="text-[#E50404] font-semibold text-[10px]">
                  {formatNumber(item.price)}đ
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
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
