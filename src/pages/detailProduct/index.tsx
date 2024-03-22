import React from "react";
import Header from "../../component/header";
import Images from "../../static";
import { formatNumber } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import productApi from "../../apis/product.apis";
import { useLocation, useParams } from "react-router-dom";
import { API_URL_IMAGE } from "../../utils/contanst";
const DetailProduct = () => {
  const params = useParams();
  const id = params?.id;
  const { data: dataDetailProduct, isFetching: isFetchingCate } = useQuery({
    queryKey: ["dataDetailProduct"],
    queryFn: () => productApi.getDetailProduct(Number(id)),
  });
  const detailProduct = dataDetailProduct?.data.data;
  return (
    <div className="w-full h-full bg-bg">
      <Header title="Chi tiết sản phẩm" />
      {!!detailProduct && (
        <div className="w-full h-full">
          <div className=" relative h-[410px]">
            <img
              src={API_URL_IMAGE + detailProduct?.image}
              alt=""
              className="w-full h-[410px] object-cover "
            />
            <div className=" bg-[#A9D6D4] rounded-[10px] p-2 absolute top-3 left-3 flex flex-col items-center">
              <p className="text-[#FF1F00] text-[22px] font-semibold">Sale</p>
              <p className="text-xs text-[#09121F] font-light">Đang giảm giá</p>
            </div>
          </div>

          <div className="bg-[#E8FDFF] w-full  px-[12px] py-3">
            <div className=" flex gap-1 items-center">
              <img
                src={Images.iconForDot}
                alt=""
                className="w-6 h-6 object-contain "
              />
              <p className="text-lg text-main uppercase font-medium">
                {detailProduct.name}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#0CA49E] text-[17px] font-semibold">
                  {formatNumber(detailProduct.price_promotional)}đ/lọ
                </p>
                <p className="text-[#000] text-[10px] font-semibold line-through">
                  {formatNumber(detailProduct.price)} đ
                </p>
              </div>
              <p className="text-main text-xs font-normal">86 lượt xem</p>
            </div>
          </div>
          <div className=" w-full  px-[12px] py-3">
            <p className="text-lg text-main  font-bold">Mô tả sản phẩm</p>
            <div
              className="text-[#000] font-normal text-[15px]  mb-2 mt-1"
              dangerouslySetInnerHTML={{ __html: detailProduct.note }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
