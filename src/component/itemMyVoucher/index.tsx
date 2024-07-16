import React from "react";
import { IMyVoucher, IVoucher } from "../../types/voucher.type";
import { API_URL_IMAGE } from "../../utils/contanst";
import Images from "../../static";

const ItemMyVoucher = ({ i }: { i: IMyVoucher }) => {
  if (i.voucher.type === 3) {
    return <></>;
  } else {
    return (
      <div className="w-full rounded   bg-white px-4  mb-5 flex shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ">
        <div className="p-2    border-r-2 border-dashed border-[#C7C9D9]">
          <img
            src={API_URL_IMAGE + i.voucher.image}
            className="w-[100px] h-[100px] object-cover"
          />
        </div>
        <div className="flex-1 flex   flex-col justify-between  ml-3 py-2  ">
          <div className="flex justify-between items-center">
            <p className="text-base font-semibold text-main line-clamp-1 flex-1 ">
              {i.voucher.describe}
            </p>
            <img
              src={Images.iconInfo2}
              alt=""
              className="w-5 h-5 object-contain"
            />
            {/* <p className="text-base text-[#004FC4] font-medium">
              Đổi với: {i.voucher.point} điểm
            </p> */}
          </div>
          <p className="text-sm text-gray-500 line-clamp-1 text-[#8F90A6]">
            {i.voucher.note}
          </p>
          <div className="flex justify-between line-clamp-1">
            <p className="text-[13px]  text-[#8F90A6]">
              Số điểm đổi:{" "}
              <span className="text-[#0010E5] font-semibold ">
                {i.voucher.point}
              </span>{" "}
              điểm
            </p>
            <div className="bg-[#090909] px-2 py-[2px] rounded-[4px]">
              <p className="text-white text-transparent text-sm font-medium">
                Sử dụng
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ItemMyVoucher;
