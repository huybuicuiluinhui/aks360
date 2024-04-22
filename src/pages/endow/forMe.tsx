import React, { useState } from "react";
import Images from "../../static";
import { useQuery } from "@tanstack/react-query";
import voucherApi from "../../apis/voucher.apis";
import { API_URL_IMAGE } from "../../utils/contanst";
import { IMyVoucher } from "../../types/voucher.type";

const ForMe = () => {
  const { data: listMyVoucher, isFetching } = useQuery({
    queryKey: ["listMyVoucher"],
    queryFn: () => voucherApi.getListMyVoucher(),
  });
  const data = listMyVoucher?.data.data;
  const ItemVoucher = ({ i }: { i: IMyVoucher }) => {
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
            <div className="flex justify-between">
              <p className="text-base font-semibold text-main line-clamp-1 flex-1">
                {i.voucher.describe}
              </p>
              <p className="text-base text-[#004FC4] font-medium">
                Đổi với: {i.voucher.point} điểm
              </p>
            </div>
            <p className="text-sm text-gray-500 line-clamp-1 text-[#8F90A6]">
              {i.voucher.note}
            </p>
            <div className="flex justify-between line-clamp-1">
              <p className="text-sm  text-[#8F90A6]">
                Date: {i.voucher.time_end}
              </p>
              <p className="bg-gradient-to-r from-[#9C1F60] to-[#F3921F] bg-clip-text text-transparent text-sm font-medium">
                Sử dụng
              </p>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="w-full h-full px-3">
      <div className="mt-4">
        {!!data &&
          !!data.length &&
          data.map((i, e) => {
            return (
              <div key={e}>
                <ItemVoucher i={i} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ForMe;
