import React, { useEffect, useState } from "react";
import Images from "../../static";
import SliderHome from "../../component/sliderHome/SliderHome";
import ProductSlider from "../../component/listProduct";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../../component/bottomSheet/BottomSheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import productApi from "../../apis/product.apis";
import { IProduct } from "../../types/product.type";
import notificationApis from "../../apis/notification.apis";
import { API_URL_IMAGE } from "../../utils/contanst";
import moment from "moment";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import userApis from "../../apis/user.apis";
import cartApis from "../../apis/cart.apis";
import { formatNumber } from "../../utils";
import ModalLogin from "../../component/customShowModal";
import ModalFollowOA from "../../component/modalFollowOA";
interface IDataMenu {
  name: string;
  img: string;
  id: number;
  screen?: string;
}
interface IRefModalMarket {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<IProduct>();
  const [amount, setAmount] = useState<number>(1);
  const refModalLogin = React.useRef<IRefModalMarket>(null);
  const refModalFollowOA = React.useRef<IRefModalMarket>(null);
  const dataMenu: IDataMenu[] = [
    { id: 1, name: "Tích điểm", img: Images.iconStar, screen: "/qrCode" },
    { id: 2, name: "Mua sắm", img: Images.iconLockPassword, screen: "/shop" },
    { id: 3, name: "Khuyến mãi", img: Images.iconGift, screen: "/endow" },
    {
      id: 4,
      name: "Quyền lợi \n thành viên",
      img: Images.iconCrown,
      screen: "/phattrien",
      // screen: "/membership",
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
      name: `Cố vấn AI`,
      img: Images.iconMes,
      screen: "/chatBot",
    },
  ];

  const { data: dataWithType1 } = useQuery({
    queryKey: ["dataProductWithType1"],
    queryFn: () => productApi.getListProductWithType(1),
  });
  const { data: dataWithType2 } = useQuery({
    queryKey: ["dataProductWithType2"],
    queryFn: () => productApi.getListProductWithType(2),
  });
  const { data: dataNoti } = useQuery({
    queryKey: ["dataNotiHome"],
    queryFn: () => notificationApis.getListNotiHome(),
  });
  const { data: dataInfo, isError } = useQuery({
    queryKey: ["dataInfoFetch"],
    queryFn: () => userApis.getInfoUser(),
  });
  useEffect(() => {
    if (isError && !!dataInfo && dataInfo.data.code === 400) {
      localStorage.removeItem("access_token");
      refModalLogin.current?.setVisible(true);
    }
  }, [isError, dataInfo]);
  const listDataType1 = dataWithType1?.data.data;
  const listDataType2 = dataWithType2?.data.data;
  const listDataNotiHome = dataNoti?.data.data;
  const dataUser = dataInfo?.data.data;
  useEffect(() => {
    if (!!dataUser) {
      setUser(dataUser);
    }
  }, [dataUser]);
  const handleClick = () => {
    const phoneNumber = "0388343864";
    window.open(`tel:${phoneNumber}`);
  };
  const updateCartMutation = useMutation({
    mutationFn: cartApis.updateCart,
    onSuccess: (data) => {
      toast.success(data.data.message);
      setIsOpen(false);
    },
    onError: (err) => {
      console.log("lõi", err);
    },
  });

  const handleReduce = () => {
    setAmount((amount) => {
      if (amount > 1) {
        return amount - 1;
      } else {
        return amount;
      }
    });
  };
  const handleIncrease = () => {
    setAmount((amount) => {
      if (amount >= Number(detailProduct?.quantity)) {
        return amount;
      } else {
        return amount + 1;
      }
    });
  };
  const handleAddToCart = () => {
    if (!!isLoggedIn) {
      updateCartMutation.mutate({
        product_id: Number(detailProduct?.id),
        quantity: amount,
        type: 1,
      });
    } else {
      refModalLogin.current?.setVisible(true);
      // navigate("/");
    }
  };
  const handleBuyNow = () => {
    if (!!isLoggedIn) {
      updateCartMutation.mutate(
        {
          product_id: Number(detailProduct?.id),
          quantity: amount,
          type: 1,
        },
        {
          onSuccess: () => {
            navigate("/cart");
          },
        }
      );
    } else {
      refModalLogin.current?.setVisible(true);
      // toast.warning("Bạn cần đăng nhập để tiếp tục mua hàng");
      // navigate("/");
    }
  };
  return (
    <div className="w-full h-full  bg-bg  overflow-x-hidden relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between bg-gradient-to-r from-[#158f3e]   via-95% to-[#36be5d] px-4  pt-[32px] pb-20 relative">
        {isLoggedIn && dataUser ? (
          <div className="flex gap-3 items-center">
            <img
              src={API_URL_IMAGE + dataUser.avavtar}
              alt=""
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
            <div className="flex flex-col h-[50px] justify-around">
              <div className="flex gap-2 items-center">
                <p className="text-[#E8FDFF] text-lg font-medium">
                  {dataUser?.name}
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
                refModalLogin.current?.setVisible(true);
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
              if (!!isLoggedIn) {
                navigate("/notification");
              } else {
                refModalLogin.current?.setVisible(true);
              }
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
              if (!!isLoggedIn) {
                navigate("/cart");
              } else {
                refModalLogin.current?.setVisible(true);
              }
            }}
          >
            <img
              src={Images.iconCart}
              alt=""
              className="w-[20px] h-[20px] object-contain"
            />
          </div>
        </div>

        <div className="bg-white shadow-[0px_2px_3px_-1px_rgba(185,234,196,1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-[14px]   absolute top-[70%] w-[90%] left-[5%]">
          <div
            className="flex items-center justify-between py-4 border-b-2 border-b-[#F0F0F0] mb-3 px-3"
            onClick={() => {
              navigate("/endow");
            }}
          >
            <p className="text-main text-sm font-semibold">Tổng điểm tích</p>
            {isLoggedIn ? (
              <div className="flex gap-1 items-center ">
                <img
                  src={Images.iconDiamond}
                  alt=""
                  className="w-[20px] h-[20px] object-contain "
                />
                <p className="text-main text-sm font-medium ">
                  {!!user && user.point}
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
                  refModalLogin.current?.setVisible(true);
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
                    if (
                      item.screen &&
                      !!isLoggedIn &&
                      item.screen !== "/phattrien"
                    ) {
                      navigate(item?.screen);
                    } else if (item.screen === "/phattrien") {
                      toast.warning("Tính năng đang được phát triển");
                    } else {
                      refModalLogin.current?.setVisible(true);
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
                    refModalLogin.current?.setVisible(true);
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

        <SliderHome />
        {/* đánh giá */}
        <img
          src={Images.rateBg}
          className="w-full h-auto object-contain mb-5"
          onClick={() => {
            navigate("/rate");
          }}
        />
        {/* Sản phẩm nổi bật */}
        {!!listDataType1 && (
          <>
            <div className="w-full flex justify-between items-center mb-2 mt-3">
              <p className="text-base font-semibold text-main">
                Sản phẩm nổi bật
              </p>
              <p
                className="text-[#097770] font-normal text-sm "
                onClick={() => {
                  navigate("/listProductWithType1");
                }}
              >
                Tất cả
              </p>
            </div>
            <ProductSlider
              products={listDataType1}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              detailProduct={detailProduct}
              setDetailProduct={setDetailProduct}
            />
          </>
        )}
        {!!listDataType2 && (
          <>
            <div className="w-full flex justify-between items-center mb-2 mt-3">
              <p className="text-base font-semibold text-main">
                Sản phẩm bán chạy
              </p>
              <p
                className="text-[#097770] font-normal text-sm "
                onClick={() => {
                  navigate("/listProductWithType2");
                }}
              >
                Tất cả
              </p>
            </div>
            <ProductSlider
              products={listDataType2}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              detailProduct={detailProduct}
              setDetailProduct={setDetailProduct}
            />{" "}
          </>
        )}
        {/* Sản phẩm bán chạy */}

        <div className="">
          <div className="w-full flex justify-between items-center mb-2 mt-3">
            <p className="text-base font-semibold text-main">Thông báo shop</p>
            <p
              className="text-[#097770] font-normal text-sm "
              onClick={() => {
                navigate("/notification");
              }}
            >
              {" "}
              Tất cả
            </p>
          </div>
          <div>
            {/*   */}

            {!!listDataNotiHome &&
              !!listDataNotiHome.length &&
              listDataNotiHome.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/detailNotification/${item.id}`);
                    }}
                    className="border rounded  border-[#0B9C97] bg-white px-[15px] py-[7px] flex w-full gap-[20px] mt-4 justify-between items-start"
                    key={index}
                  >
                    <div className="flex flex-col gap-2 justify-between">
                      <p className="text-sm text-[#06070C] font-semibold line-clamp-2">
                        {item.title}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                        className="text-xs text-[#06070C] font-normal line-clamp-2"
                      />
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
          src={Images.logoBaTot}
          alt=""
          className="w-[60%] h-auto object-contain mt-10  mx-auto"
        />
        <p className="text-center text-base font-semibold text-black mt-2 top-2 ">
          Mini website Sữa Ba Tốt
        </p>
        <p className="text-center text-sm font-normal text-[#A4A4A4] mt-2 mx-8 ">
          Mini website này dùng cho quý khách hàng của chuỗi cửa hàng Sữa Ba Tốt
          trên toàn quốc
        </p>
        <div className="h-40"></div>
      </div>

      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col w-full overflow-hidden">
          <div className="flex items-center gap-3">
            <img
              src={detailProduct?.image}
              alt=""
              className="w-[68px] h-[68px] object-cover"
            />
            <div className="gap-2">
              <p className="text-sm text-[#28293D] font-medium">
                {detailProduct?.name}
              </p>
              <p className="text-[#F10000] text-[19px] font-semibold">
                {formatNumber(Number(detailProduct?.price))} đ
              </p>
            </div>
          </div>
          <div className="w-full h-[2px] bg-[#EAEAEA] my-2" />
          <div className=" flex justify-between mt-2">
            <p className="text-[#B7B7B7] text-xs font-medium">Số lượng</p>
            <div className="flex  border border-[#0CA29C]">
              <div
                className="bg-[#C7FFFD] w-[50px] h-[36px] flex justify-center items-center"
                onClick={handleReduce}
              >
                -
              </div>
              <div className="bg-[#fff] w-[60px] h-[36px] flex justify-center items-center border-l border-r border-l-[#0CA29C] border-r-[#0CA29C]">
                {amount}
              </div>
              <div
                className="bg-[#C7FFFD] w-[50px] h-[36px] flex justify-center items-center"
                onClick={handleIncrease}
              >
                +
              </div>
            </div>
          </div>
          <div className="flex justify-around mt-5 mb-[80px]">
            <div
              className="w-[46%] border border-[#0CA29C] rounded-[3px] flex justify-center items-center"
              onClick={() => {
                handleAddToCart();
              }}
            >
              <p className="py-2 text-sm font-medium text-[#0CA29C]">
                Thêm vào giỏ hàng
              </p>
            </div>
            <div
              className="w-[46%] bg-[#0CA29C] border border-[#0CA29C] rounded-[3px] flex justify-center items-center"
              onClick={() => {
                handleBuyNow();
              }}
            >
              <p className="py-2 text-sm font-medium text-[#fff]">Mua ngay</p>
            </div>
          </div>
        </div>
      </BottomSheet>

      <ModalLogin ref={refModalLogin} followOA={refModalFollowOA} />
      <ModalFollowOA ref={refModalFollowOA} />
    </div>
  );
};

export default Home;
