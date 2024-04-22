import React, { useEffect, useRef, useState } from "react";
import Header from "../../component/header";
import productApi from "../../apis/product.apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IItemProduct, IProduct } from "../../types/product.type";
import { useNavigate } from "react-router-dom";
import { API_URL_IMAGE } from "../../utils/contanst";
import { formatNumber } from "../../utils";
import BottomSheet from "../../component/bottomSheet/BottomSheet";
import Images from "../../static";
import { useAuth } from "../../context/authContext";
import cartApis from "../../apis/cart.apis";
import { toast } from "react-toastify";
import ModalLogin from "../../component/customShowModal";
interface IRefModalMarket {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ListProductWithType1 = () => {
  const { isLoggedIn } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [amount, setAmount] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [listData, setListData] = useState<IItemProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<IProduct>();
  const elementRef = useRef<HTMLDivElement>(null);
  const refModalLogin = React.useRef<IRefModalMarket>(null);
  function randomTwoDigitNumber() {
    return Math.floor(Math.random() * 90) + 10;
  }
  console.log("lastPage", listData);
  const navigate = useNavigate();
  const { data: dataProductType1 } = useQuery({
    queryKey: ["dataProductType1"],
    queryFn: async () => {
      try {
        const response = await productApi.getListProductWithTypeAll(1, 1);
        if (response && response.data && response.data.data) {
          const responseData = response.data.data;
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
  const loadMorePage = async () => {
    if (page >= lastPage) {
      return;
    } else {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadMore(true);
      try {
        const response = await productApi.getListProductWithCate(1, nextPage);
        if (response && response.data && response.data.data) {
          const responseData = response.data.data;
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

  return (
    <div className="">
      <Header title="Sản phẩm nổi bật" />
      <div className="flex flex-wrap justify-between px-[20px] mb-36 ">
        {listData.map((item, index) => {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();

                navigate(`/detailProduct/${item.id}`);
              }}
              key={index}
              className=" shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-2 rounded-sm  w-[48%] my-4 border-[#F6F4F4] border-2"
            >
              <img
                src={API_URL_IMAGE + item.image}
                alt={item.name}
                className="w-[100%] h-[119px] object-contain rounded-[4px]"
              />
              <p className="text-main text-sm font-medium line-clamp-2 mt-4">
                {item.name}
              </p>
              <img src="" alt="" />
              <div className="flex items-center justify-between mt-1">
                <p className="text-[#E50404] font-bold text-[10px]">
                  {formatNumber(item.price_promotional)}đ
                </p>
                <p className="text-black font-normal text-[10px] line-through">
                  {formatNumber(item.price)}đ
                </p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[10px] font-normal text-main">
                  {randomTwoDigitNumber()} lượt xem
                </p>
                <div className="flex items-center gap-1">
                  <div
                    className="bg-[#198303]  p-[4px] rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDetail(item.id);
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
              src={API_URL_IMAGE + detailProduct?.image}
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
      <ModalLogin ref={refModalLogin} />
    </div>
  );
};

export default ListProductWithType1;
