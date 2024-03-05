import React, { useState } from "react";
import Images from "../../static";
import SliderHome from "../../component/sliderHome/SliderHome";
import ProductSlider from "../../component/listProduct";
import { useNavigate } from "react-router-dom";
interface IDataMenu {
  name: string;
  img: string;
  id: number;
  screen?: string;
}
interface IDataProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}
const Home = () => {
  const navigate = useNavigate();
  const dataMenu: IDataMenu[] = [
    { id: 1, name: "Tích điểm", img: Images.iconStar },
    { id: 1, name: "Mua sắm", img: Images.iconLockPassword },
    { id: 1, name: "Khuyến mãi", img: Images.iconGift },
    { id: 1, name: "Quyền lợi  thành viên", img: Images.iconCrown },
  ];
  const dataTitle: IDataMenu[] = [
    {
      id: 1,
      name: "Lịch sử  Mua hàng",
      img: Images.icon24h,
      screen: "/historyOrder",
    },
    { id: 1, name: "Liên hệ", img: Images.iconHeadphone },
    { id: 1, name: `Lịch sử  tích điểm`, img: Images.iconCopy },
  ];
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
  ]);
  return (
    <div className="w-full h-full  bg-bg  ">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#098B8B] to-[#0DB2A8] px-3  pt-[32px] pb-20 relative">
        <div className="flex gap-3 items-center">
          <img
            src={Images.iconAvatar}
            alt=""
            className="w-[60px] h-[60px] object-contain rounded-full"
          />
          <div className="flex flex-col h-[60px] justify-around">
            <p className="text-white text-xl font-normal">Xin chào</p>
            <p className="text-white text-2xl font-semibold">Bé Đậu</p>
          </div>
        </div>
        <div
          className="p-3 bg-white rounded-full"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <img
            src={Images.iconCart}
            alt=""
            className="w-[26px] h-[26px] object-contain"
          />
        </div>

        <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[14px]   absolute top-[70%] w-[90%] left-[5%]">
          <div className="flex items-center justify-between py-4 border-b-2 border-b-[#F0F0F0] mb-3 px-3">
            <p className="text-main text-sm font-semibold">Tổng điểm tích</p>
            <div className="flex gap-1 items-center ">
              <img
                src={Images.iconDiamond}
                alt=""
                className="w-[20px] h-[20px] object-contain "
              />
              <p className="text-main text-sm font-medium">0</p>
              <img
                src={Images.iconArrRight}
                alt=""
                className="w-[10px] h-[16px] object-contain"
              />
            </div>
          </div>
          <div className="w-full flex  justify-between pb-3">
            {dataMenu.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    if (index === 0) {
                      navigate("/qrCode");
                    }
                  }}
                  key={index}
                  className=" w-[25%] flex flex-col  items-center  "
                >
                  <div className=" bg-[#B2F1EE] rounded-full p-[12px] flex flex-col items-center   w-fit ">
                    <img
                      src={item.img}
                      alt=""
                      className="w-[42px] h-[42px] object-contain 0"
                    />
                  </div>
                  <p className="line-clamp-2 text-center text-main text-xs font-normal w-[82px] ">
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full pt-[35%] px-[20px]">
        <div className="flex gap-5 ">
          {dataTitle.map((item, index) => {
            return (
              <div
                className="w-[18%]  flex flex-col items-center"
                key={index}
                onClick={() => {
                  navigate(item.screen ? item.screen : "");
                }}
              >
                <img
                  src={item.img}
                  alt=""
                  className="w-[40px] h-[40px] object-contain"
                />
                <p className="line-clamp-2 text-center text-main text-xs font-normal w-[70px]">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between py-2 ">
          <p>Sự kiện vòng quay</p>
          <img
            src={Images.iconShare}
            alt=""
            className="w-[28px] h-[24px] object-contain"
          />
        </div>
        <SliderHome />
        {/* Sản phẩm nổi bật */}
        <div className="w-full flex justify-between items-center mb-2 mt-3">
          <p className="text-lg font-semibold text-main">Sản phẩm nổi bật</p>
          <p className="text-gray font-normal text-lg"> Tất cả</p>
        </div>
        <ProductSlider products={dataProduct} />
        {/* Sản phẩm bán chạy */}
        <div className="w-full flex justify-between items-center mb-2 mt-3">
          <p className="text-lg font-semibold text-main">Sản phẩm bán chạy</p>
          <p className="text-gray font-normal text-lg"> Tất cả</p>
        </div>
        <ProductSlider products={dataProduct} />

        <img
          src={Images.bannerFooter}
          alt=""
          className="w-[60%] h-auto object-contain mt-20 mb-32 mx-auto"
        />
      </div>
    </div>
  );
};

export default Home;
