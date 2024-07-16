import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../static";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatNumber } from "../../utils";
import BottomSheet from "../../component/bottomSheet/BottomSheet";
import { useMutation, useQuery } from "@tanstack/react-query";
import productApi from "../../apis/product.apis";
import { API_URL_IMAGE } from "../../utils/contanst";
import { IProduct } from "../../types/product.type";
import cartApis from "../../apis/cart.apis";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import ModalLogin from "../../component/customShowModal";
import ModalFollowOA from "../../component/modalFollowOA";
interface IDataProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  oldPrice: number;
}
interface IRefModalMarket {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const Search = () => {
  const { isLoggedIn } = useAuth();
  const refModalLogin = React.useRef<IRefModalMarket>(null);
  const refModalFollowOA = React.useRef<IRefModalMarket>(null);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [keySearch, setKeySearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [listData, setListData] = useState<IProduct[]>([]);
  const [detailProduct, setDetailProduct] = useState<IProduct>();
  const [amount, setAmount] = useState<number>(1);
  const elementRef = useRef<HTMLDivElement>(null);
  const { data: dataList, refetch } = useQuery({
    queryKey: ["dataSearch", keySearch],
    queryFn: async () => {
      try {
        const response = await productApi.getListProductWithSearch(
          keySearch,
          1
        );
        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.list_product
        ) {
          const responseData = response.data.data.list_product;
          if (
            Array.isArray(responseData.data) &&
            responseData.data.length > 0
          ) {
            setListData(responseData.data);
            setLastPage(responseData.last_page);
            return responseData;
          } else {
            throw new Error("No data found in response");
          }
        } else {
          throw new Error("Invalid response data");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  function randomTwoDigitNumber() {
    return Math.floor(Math.random() * 90) + 10; // Tạo số ngẫu nhiên từ 10 đến 99
  }
  const loadMorePage = async () => {
    if (page >= lastPage) {
      return;
    } else {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadMore(true);
      try {
        const response = await productApi.getListProductWithSearch(
          keySearch,
          nextPage
        );
        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.list_product
        ) {
          const responseData = response.data.data.list_product;
          if (
            Array.isArray(responseData.data) &&
            responseData.data.length > 0
          ) {
            setListData((prevData) => [...prevData, ...responseData.data]);
            setLastPage(responseData.last_page);
          } else {
            throw new Error("No data found in response");
          }
        } else {
          throw new Error("Invalid response data");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadMore(false);
      }
    }
  };
  const detailProductMutation = useMutation({
    mutationFn: productApi.getDetailProduct,
    onSuccess: (data) => {
      setDetailProduct(data.data.data);
      console.log(data);
    },
    onError: (err) => {
      console.log("lõi", err);
    },
  });
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
  const handleDetail = (id: number) => {
    detailProductMutation.mutate(id);
  };
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
    }
  };
  const handleSearch = (e: any) => {
    setKeySearch(e.target.value);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < lastPage) {
          loadMorePage();
        }
      },
      {
        threshold: 1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [page, lastPage]);

  useEffect(() => {
    if (isOpen === false) {
      setAmount(1);
    }
  }, [isOpen]);

  return (
    <div className="w-full h-full min-h-screen bg-bg">
      <div className="w-full bg-gradient-to-r from-[#158f3e]   via-95% to-[#36be5d]  flex items-center  py-5 px-[20px] justify-between">
        <div className="flex  gap-5  items-center flex-1">
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
          <div className="flex bg-white rounded-[20px]  items-center pl-2 flex-[0.8]">
            <img
              src={Images.iconSearch}
              alt=""
              className="w-4 h-4 object-contain"
            />
            <input
              type="text"
              name=""
              id=""
              value={keySearch}
              onChange={handleSearch}
              className="flex-1 py-1 rounded-[20px] px-2 text-[#8F90A6] outline-none"
              placeholder="Tìm kiếm sản phẩm"
            />
          </div>
        </div>
        <img
          src={Images.iconHeader}
          alt=""
          className="w-[68px] h-[21px] object-contain"
        />
      </div>

      <div className="flex flex-wrap justify-between px-[20px] mb-36">
        {listData.map((item, index) => {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();

                navigate(`/detailProduct/${item.id}`);
              }}
              key={index}
              className="w-[48%] my-4 rounded-[10px]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[100%] h-auto object-cover rounded-[10px]"
              />
              <p className="text-main text-sm font-medium line-clamp-2 mt-4">
                {item.name}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[#097770] font-bold text-xs">
                  {formatNumber(item.price_promotional)} đ
                </p>
                <div className="flex items-center gap-1">
                  <div
                    className="bg-[#198303]  py-[3px] rounded-full flex items-center gap-1 px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDetail(item.id);
                      setIsOpen(!isOpen);
                    }}
                  >
                    <p className="text-white text-xs">Mua</p>

                    <img
                      src={Images.iconPlus}
                      alt=""
                      className="w-3 h-3 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={elementRef} className="text-center">
        {loadMore && <div className="text-center">Loading...</div>}
      </div>
      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col">
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
          {/* <div className="w-full h-[2px] bg-[#EAEAEA] my-2" />
          <p className="text-[#B7B7B7] text-xs font-medium mb-2">
            Chọn option ( 1 option )
          </p>
          <div className="border-[#D9D9D9] border px-3 py-2  self-start">
            <p className="text-black text-xs font-normal">Loại 300ml</p>
          </div> */}
          <div className=" flex justify-between mt-3 items-center">
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

export default Search;
