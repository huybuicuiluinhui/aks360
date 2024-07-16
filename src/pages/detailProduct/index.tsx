import React, { useEffect, useState } from "react";
import Header from "../../component/header";
import Images from "../../static";
import { formatNumber } from "../../utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import productApi from "../../apis/product.apis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URL_IMAGE } from "../../utils/contanst";
import ProductSlider from "../../component/listProduct";
import BottomSheet from "../../component/bottomSheet/BottomSheet";
import { IProduct } from "../../types/product.type";
import { useAuth } from "../../context/authContext";
import cartApis from "../../apis/cart.apis";
import { toast } from "react-toastify";
import ModalLogin from "../../component/customShowModal";
import ModalFollowOA from "../../component/modalFollowOA";
interface IRefModalMarket {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const DetailProduct = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const refModalLogin = React.useRef<IRefModalMarket>(null);
  const refModalFollowOA = React.useRef<IRefModalMarket>(null);
  const params = useParams();
  const [amount, setAmount] = useState<number>(1);
  const id = params?.id;
  const [isOpen, setIsOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState<IProduct>();
  const { data: dataDetailProduct, isFetching: isFetchingCate } = useQuery({
    queryKey: ["dataDetailProduct"],
    queryFn: () => productApi.getDetailProduct(Number(id)),
  });
  const { data: dataView } = useQuery({
    queryKey: ["dataView"],
    queryFn: () => productApi.getViewProduct(Number(id)),
  });
  const view = dataView?.data.data;
  const addViewMutation = useMutation({
    mutationFn: productApi.addViewProduct,
    onSuccess: (data) => {},
    onError: (err) => {
      console.log("lõi", err);
    },
  });
  useEffect(() => {
    if (id) {
      addViewMutation.mutate({
        id_product: Number(id),
      });
    }
  }, [id]);
  const { data: dataWithType1 } = useQuery({
    queryKey: ["dataProductWithType1"],
    queryFn: () => productApi.getListProductWithType(1),
  });
  const listDataType1 = dataWithType1?.data.data;
  const detailProduct = dataDetailProduct?.data.data;
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
  console.log("detailProduct", detailProduct);
  return (
    <div className="w-full h-full bg-bg">
      <Header title="Chi tiết sản phẩm" />
      {!!detailProduct && (
        <div className="w-full h-full">
          <div className=" relative h-[410px]">
            <img
              src={detailProduct?.image}
              alt=""
              className="w-full h-[410px] object-cover "
            />
          </div>
          <div className=" py-3  px-3 flex items-center justify-between">
            <p className="text-[#0C1A30] text-sm font-normal">
              Thương hiệu:{" "}
              <span className="font-bold">{detailProduct.full_name}</span>
            </p>
            <p className="text-[#0C1A30] text-sm font-normal">
              Mã SKU:{" "}
              <span className="font-bold">
                {detailProduct.code_product_kiotviet}
              </span>
            </p>
          </div>
          <p className="text-lg text-[#0D7840]  font-bold mx-3  mb-3">
            {detailProduct.name}
          </p>
          <div className="bg-[#F5F7FD]   mx-[12px] py-[6px]  rounded-md px-3 flex items-center justify-between ">
            <p className="text-[#097770] text-[28px] font-semibold ">
              {formatNumber(detailProduct.price_promotional)} đ
            </p>
            <div
              className=" border-[#048145] rounded-[5px] border-[2px] px-4  "
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <p className="text-[#048145] font-semibold text-[13px]">
                Thêm vào
              </p>
              <p className="text-[#048145] font-semibold text-[13px]">
                Giỏ hàng
              </p>
            </div>
          </div>
          <div className=" bg-[#F5F7FD]    mx-[12px] py-[6px]  rounded-md  px-[12px] mt-3 ">
            <p className="text-lg text-main  font-bold">Mô tả sản phẩm</p>
            <div
              className="text-[#000] font-normal text-[15px]  mb-2 mt-1"
              dangerouslySetInnerHTML={{ __html: detailProduct.note }}
            ></div>
          </div>
          {/* sản phẩm đã xem */}
          {!!listDataType1 && (
            <div className="bg-[#F5F7FD]    mx-[12px] py-[6px]  rounded-md mt-3">
              <div className="w-full flex justify-between items-center mb-2 mt-3">
                <p className="text-base font-bold text-[#09121F] px-3 ">
                  Sản phẩm nổi bật
                </p>
              </div>
              <div className="w-full overflow-hidden">
                <ProductSlider
                  products={listDataType1}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  detailProduct={dataDetail}
                  setDetailProduct={setDataDetail}
                />
              </div>
            </div>
          )}
        </div>
      )}
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

export default DetailProduct;
