import React, { useEffect, useState } from "react";
import Images from "../../static";
import SliderHome from "../../component/sliderHome/SliderHome";
import ProductSlider from "../../component/listProduct";
import { Link, useNavigate } from "react-router-dom";
import BottomSheet from "../../component/bottomSheet/BottomSheet";
import { useMutation, useQuery } from "@tanstack/react-query";
import productApi from "../../apis/product.apis";
import { IProduct } from "../../types/product.type";
import notificationApis from "../../apis/notification.apis";
import { API_URL_IMAGE } from "../../utils/contanst";
import moment from "moment";
import { useAuth } from "../../context/authContext";
import authApis from "../../apis/auth.apis";
import { toast } from "react-toastify";
import userApis from "../../apis/user.apis";
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
  oldPrice: number;
  image: string;
}
const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();
  console.log(user);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dataMenu: IDataMenu[] = [
    { id: 1, name: "Tích điểm", img: Images.iconStar, screen: "/qrCode" },
    { id: 2, name: "Mua sắm", img: Images.iconLockPassword, screen: "/shop" },
    { id: 3, name: "Khuyến mãi", img: Images.iconGift, screen: "/endow" },
    {
      id: 4,
      name: "Quyền lợi \n thành viên",
      img: Images.iconCrown,
      screen: "/shop",
    },
  ];
  const dataTitle: IDataMenu[] = [
    {
      id: 1,
      name: "Lịch sử \n Mua hàng",
      img: Images.icon24h,
      screen: "/historyOrder",
    },
    { id: 2, name: "Liên hệ", img: Images.iconHeadphone },
    {
      id: 3,
      name: `Lịch sử \n tích điểm`,
      img: Images.iconCopy,
      screen: "/historyPoint",
    },
    {
      id: 4,
      name: `Nhắn tin \n cho Shop`,
      img: Images.iconMes,
      screen: "",
    },
  ];
  const loginMutation = useMutation({
    mutationFn: authApis.login,
    onSuccess: (data) => {
      if (data.data.status && data.data.data.access_token) {
        console.log(data.data);
        localStorage.setItem("access_token", data.data.data.access_token);
        setIsOpenLogin(false);
        setIsLoggedIn(true);
        window.location.reload();
      } else {
      }
    },
    onError: (err) => {
      console.log("lõi", err);
    },
  });
  const { data: dataWithType1, isFetching: isFetchingWithType1 } = useQuery({
    queryKey: ["dataProductWithType1"],
    queryFn: () => productApi.getListProductWithType(1),
  });
  const { data: dataWithType2, isFetching: isFetchingWithType2 } = useQuery({
    queryKey: ["dataProductWithType2"],
    queryFn: () => productApi.getListProductWithType(2),
  });
  const { data: dataNoti, isFetching: isFetchNoti } = useQuery({
    queryKey: ["dataNotiHome"],
    queryFn: () => notificationApis.getListNotiHome(),
  });
  const {
    data: dataInfo,
    isFetching: isFetchInfo,
    isError,
    error,
  } = useQuery({
    queryKey: ["dataInfo"],
    queryFn: () => userApis.getInfoUser(),
  });
  useEffect(() => {
    if (isError && !!dataInfo && dataInfo.data.code === 400) {
      localStorage.removeItem("access_token");
      setIsOpenLogin(true);
    }
  }, [isError, dataInfo]);

  const listDataType1 = dataWithType1?.data.data;
  const listDataType2 = dataWithType2?.data.data;
  const listDataNotiHome = dataNoti?.data.data;
  const dataUser = dataInfo?.data.data;
  useEffect(() => {
    if (!!dataUser) {
      setUser(dataUser[0]);
    }
  }, [dataUser]);

  const handleClick = () => {
    const phoneNumber = "0388343864";
    window.open(`tel:${phoneNumber}`);
  };

  const handleLogin = () => {
    loginMutation.mutate({
      phone,
      password,
    });
  };
  return (
    <div className="w-full h-full  bg-bg  ">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#50B152]   via-95% to-[#61E35E] px-4  pt-[32px] pb-20 relative">
        {isLoggedIn && dataUser ? (
          <div className="flex gap-3 items-center">
            <img
              src={Images.iconAvatar}
              alt=""
              className="w-[60px] h-[60px] object-contain rounded-full"
            />
            <div className="flex flex-col h-[60px] justify-around">
              <div className="flex gap-2 items-center">
                <p className="text-[#E8FDFF] text-xl font-medium">
                  {dataUser[0]?.name}
                </p>
                <img
                  src={Images.iconStar2}
                  className="w-[19px] h-[19px] object-contain"
                />
              </div>
              <p className="text-white text-[13px] font-normal">
                Xin chào đến với 3 Tốt
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col  gap-3 ">
            <div
              className="bg-[#0CA29C] flex justify-between self-start px-3 rounded-sm py-1 "
              onClick={() => {
                setIsOpenLogin(true);
              }}
            >
              <p className="text-white font-semibold text-[15px]">Đăng nhập</p>
            </div>
            <p className="text-white text-[13px] font-normal">
              Xin chào đến với 3 Tốt
            </p>{" "}
          </div>
        )}
        <div className="flex items-center gap-3 ">
          <div
            className=" relative "
            onClick={() => {
              navigate("/notification");
            }}
          >
            <img
              src={Images.iconNoti}
              alt=""
              className="w-[20px] h-[20px] object-contain "
            />
            <div className="bg-[#FFC120] rounded-full  absolute -top-[40%] -right-[30%] w-[18px] h-[18px] justify-center items-center flex">
              <p className="text-[8px] text-black font-medium">1</p>
            </div>
          </div>
          <div
            className=" "
            onClick={() => {
              navigate("/cart");
            }}
          >
            <img
              src={Images.iconCart}
              alt=""
              className="w-[20px] h-[20px] object-contain"
            />
          </div>
        </div>

        <div className="bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-[14px]   absolute top-[70%] w-[90%] left-[5%]">
          <div className="flex items-center justify-between py-4 border-b-2 border-b-[#F0F0F0] mb-3 px-3">
            <p className="text-main text-sm font-semibold">Tổng điểm tích</p>
            {isLoggedIn ? (
              <div className="flex gap-1 items-center ">
                <img
                  src={Images.iconDiamond}
                  alt=""
                  className="w-[20px] h-[20px] object-contain "
                />
                <p className="text-main text-sm font-medium ">
                  {!!user && user.rewardPoint}
                </p>
                <img
                  src={Images.iconArrRight}
                  alt=""
                  className="w-[10px] h-[16px] object-contain "
                />
              </div>
            ) : (
              <div
                className="flex gap-1 items-center "
                onClick={() => {
                  setIsOpenLogin(true);
                }}
              >
                <img
                  src={Images.iconDiamond}
                  alt=""
                  className="w-[20px] h-[20px] object-contain "
                />
                <p className="text-main text-sm font-medium ">?</p>
                <img
                  src={Images.iconArrRight}
                  alt=""
                  className="w-[10px] h-[16px] object-contain "
                />
              </div>
            )}
          </div>
          <div className="w-full flex  justify-between pb-3">
            {dataMenu.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    if (item.screen && !!isLoggedIn) {
                      navigate(item?.screen);
                    } else {
                      setIsOpenLogin(true);
                    }
                  }}
                  key={index}
                  className=" w-[25%] flex flex-col  items-center  "
                >
                  <img
                    src={item.img}
                    alt=""
                    className="w-[50px] h-[50px] object-contain 0"
                  />
                  <p
                    className="line-clamp-2 text-center text-main text-xs font-normal  "
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full pt-[35%] px-[20px] ">
        <div className="flex justify-around mb-5 px-[10px]">
          {dataTitle.map((item, index) => {
            return (
              <div
                className="w-[18%]  flex flex-col items-center gap-1"
                key={index}
                onClick={() => {
                  if (item?.screen && !!isLoggedIn) {
                    navigate(item.screen ? item.screen : "");
                  } else if (!isLoggedIn && item.screen) {
                    setIsOpenLogin(true);
                  } else {
                    handleClick();
                  }
                }}
              >
                <img
                  src={item.img}
                  alt=""
                  className="w-[25px] h-[25px] object-contain"
                />
                <p
                  className="line-clamp-2 text-center text-main text-xs font-normal "
                  style={{ whiteSpace: "pre-line" }}
                >
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
        {/* <div className="flex items-center justify-between py-2 ">
          <p className="text-lg font-semibold text-main">Sự kiện vòng quay</p>
          <img
            src={Images.iconShare}
            alt=""
            className="w-[28px] h-[24px] object-contain"
          />
        </div> */}
        <SliderHome />
        {/* Sản phẩm nổi bật */}
        {!!listDataType1 && (
          <>
            <div className="w-full flex justify-between items-center mb-2 mt-3">
              <p className="text-base font-semibold text-main">
                Sản phẩm nổi bật
              </p>
              <p className="text-[#57C556] font-normal text-sm italic">
                {" "}
                Tất cả
              </p>
            </div>
            <ProductSlider
              products={listDataType1}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </>
        )}
        {!!listDataType2 && (
          <>
            <div className="w-full flex justify-between items-center mb-2 mt-3">
              <p className="text-lg font-semibold text-main">
                Sản phẩm bán chạy
              </p>
              <p className="text-[#57C556] font-normal text-sm italic">
                {" "}
                Tất cả
              </p>
            </div>
            <ProductSlider
              products={listDataType2}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />{" "}
          </>
        )}
        {/* Sản phẩm bán chạy */}

        <div className="">
          <div className="w-full flex justify-between items-center mb-2 mt-3">
            <p className="text-lg font-semibold text-main">Thông báo shop</p>
            <p className="text-[#57C556] font-normal text-sm italic"> Tất cả</p>
          </div>
          <div>
            {!!listDataNotiHome &&
              !!listDataNotiHome.length &&
              listDataNotiHome.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/detailNotification/${item.id}`);
                    }}
                    className="border rounded  border-[#0B9C97] bg-white px-[15px] py-[7px] flex w-full gap-[20px] mt-4 justify-between"
                    key={index}
                  >
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-[#06070C] font-semibold line-clamp-3">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#06070C] font-normal line-clamp-1">
                        {item.description}
                      </p>
                      <p className="text-[#838589] text-xs ">
                        {moment(item.time).format("YYYY-MM-DD")}
                      </p>
                    </div>
                    <img
                      src={API_URL_IMAGE + item.imgage_home}
                      alt=""
                      className="w-[80px] h-[80px] object-cover rounded-[10px]"
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <img
          src={Images.bannerFooter}
          alt=""
          className="w-[60%] h-auto object-contain mt-20 mb-40 mx-auto"
        />
      </div>
      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <img
              src={Images.imgTest}
              alt=""
              className="w-[68px] h-[68px] object-cover"
            />
            <div className="gap-2">
              <p className="text-sm text-[#28293D] font-medium">
                Thực phẩm chức năng D3K2 100% tinh khiết với Vitamin MK7
              </p>
              <p className="text-[#F10000] text-[19px] font-semibold">
                295.000đ{" "}
              </p>
            </div>
          </div>
          <div className="w-full h-[2px] bg-[#EAEAEA] my-2" />
          <p className="text-[#B7B7B7] text-xs font-medium mb-2">
            Chọn option ( 1 option )
          </p>
          <div className="border-[#D9D9D9] border px-3 py-2  self-start">
            <p className="text-black text-xs font-normal">Loại 300ml</p>
          </div>
          <div className=" flex justify-between mt-2">
            <p className="text-[#B7B7B7] text-xs font-medium">Số lượng</p>
            <div className="flex  border border-[#0CA29C]">
              <div className="bg-[#C7FFFD] w-[50px] h-[36px] flex justify-center items-center">
                -
              </div>
              <div className="bg-[#fff] w-[60px] h-[36px] flex justify-center items-center border-l border-r border-l-[#0CA29C] border-r-[#0CA29C]">
                1
              </div>
              <div className="bg-[#C7FFFD] w-[50px] h-[36px] flex justify-center items-center">
                +
              </div>
            </div>
          </div>
          <div className="flex justify-around mt-5 mb-[80px]">
            <div className="w-[46%] border border-[#0CA29C] rounded-[3px] flex justify-center items-center">
              <p className="py-2 text-sm font-medium text-[#0CA29C]">
                Thêm vào giỏ hàng
              </p>
            </div>
            <div className="w-[46%] bg-[#0CA29C] border border-[#0CA29C] rounded-[3px] flex justify-center items-center">
              <p className="py-2 text-sm font-medium text-[#fff]">Mua ngay</p>
            </div>
          </div>
        </div>
      </BottomSheet>
      <BottomSheet isOpen={isOpenLogin} setIsOpen={setIsOpenLogin}>
        <div className="flex flex-col mb-[80px] gap-4">
          <img
            src={Images.logoBaTot}
            className="w-[100px] h-[100px] object-contain self-center"
          />
          <p className="text-[#09121F] text-xl font-semibold text-center">
            Tính năng cần kích hoạt tài khoản
          </p>
          <p className="text-center text-xs text-[#06070C] font-normal">
            Cho phép Hệ thống sữa 3 Tốt xác minh số điện thoại để có thể sử dụng
            đầy đủ tính năng của app. Điều này giúp tăng trải nghiệm của quý
            khách hàng
          </p>
          <input
            type="text"
            placeholder="Nhập số điện thoại..."
            value={phone}
            onChange={(e: any) => setPhone(e?.target?.value)}
            className="rounded-[5px] border  border-[#dedede] px-2 py-[4px] w-[90%] self-center placeholder:text-[#333] text-[#333] text-[15px] font-medium"
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e: any) => setPassword(e?.target?.value)}
            className="rounded-[5px] border  border-[#dedede] px-2 py-[4px] w-[90%] self-center placeholder:text-[#333] text-[#333] text-[15px] font-medium"
          />
          <div
            className="bg-[#01A850] rounded-[15px] py-[10px] w-[90%] self-center"
            onClick={handleLogin}
          >
            <p className="text-white text-xs text-center">ĐĂNG NHẬP</p>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Home;
