import React from "react";
import Header from "../../component/header";
import Images from "../../static";
import { formatNumber } from "../../utils";

const DetailProduct = () => {
  return (
    <div className="w-full h-full bg-bg">
      <Header title="Chi tiết sản phẩm" />
      <div className="w-full h-full">
        <img
          src={Images.imgTest}
          alt=""
          className="w-full h-auto object-contain"
        />
        <div className="bg-[#E8FDFF] w-full  px-[12px] py-3">
          <p className="text-lg text-main uppercase font-medium">
            THỰC PHẨM CHỨC NĂNG LINEABON
          </p>
          <p className="text-[#0CA49E] text-[17px] font-semibold">
            {" "}
            {formatNumber(20000000)}/lọ
          </p>
        </div>
        <div className=" w-full  px-[12px] py-3">
          <p className="text-lg text-main  font-bold">Mô tả sản phẩm</p>
          <div
            className="text-[#828282] font-bold text-[11px] text-center mb-2 mt-1"
            // dangerouslySetInnerHTML={{ __html: item.title }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
