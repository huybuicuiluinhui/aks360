import React, { useState } from "react";
import Images from "../../static";
import { formatNumber } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import orderApis from "../../apis/order.apis";
import moment from "moment";

const OffLineOrder = () => {
  const { data: listOrderOFf } = useQuery({
    queryKey: ["listOrderOFf"],
    queryFn: () => orderApis.getOrderOff(),
  });
  const dataOrderOff = listOrderOFf?.data.data;
  return (
    <div className="w-full h-full bg-bg ">
      <div className="flex justify-between items-center px-3 mt-3">
        <div className="flex gap-2 items-center">
          <p className="text-xs text-[#828282] font-light">Sắp xếp</p>
          <img
            src={Images.iconShowmore}
            alt=""
            className="w-[16px] h-[16px] object-contain"
          />
        </div>
        <img
          src={Images.iconFilter}
          alt=""
          className="w-[17px] h-[16px] object-contain"
        />
      </div>
      {!!dataOrderOff &&
        !!dataOrderOff.length &&
        dataOrderOff.map((i, e) => {
          return (
            <div className="px-3 w-full mt-3" key={e}>
              <div className="flex gap-1 w-full ">
                <img
                  src={Images.iconOrder}
                  alt=""
                  className="w-[13px] h-[16px] object-contain"
                />
                <div className="w-full mr-[10%] gap-2">
                  <p className="text-sm text-[#666666] font-normal">
                    Đơn hàng : {i.code}
                  </p>
                  <p className="text-sm text-[#FF5E3A] font-semibold">
                    (đ) {formatNumber(i.totalPayment)}
                  </p>
                  <p className="text-sm text-[#666666] font-light mb-2">
                    {moment(i.createdDate).format("hh:mm:ss DD/MM/YYYY")}
                  </p>
                  {i.invoiceDetails.map((item, index) => {
                    return (
                      <div
                        className="flex border-dashed border rounded-md border-[#F9A671] p-1 pr-2 mb-2"
                        key={index}
                      >
                        <img
                          src={Images.imgTest}
                          alt=""
                          className="w-[62px] h-[65px] object-cover rounded-[10px]"
                        />
                        <div className="ml-2 w-full flex flex-col gap-[1px]">
                          <div className="flex items-center justify-between">
                            <p className="text-[#373943] text-[10px] font-medium line-clamp-1 flex-1">
                              {item?.productName}{" "}
                            </p>
                            <p className="text-[#EE0D79] text-xs font-semibold ml-2">
                              {formatNumber(item?.price)} đ
                            </p>
                          </div>
                          <p className="text-[10px] text-[#828BAC] font-normal ">
                            SKU : {item?.tradeMarkId}
                          </p>
                          <p className="text-[10px] text-[#828BAC]  font-normal">
                            Số lượng : {item?.quantity} sản phẩm
                          </p>
                          <p className="text-[10px] text-[#373943] font-medium">
                            Tổng tiền :{" "}
                            <span className="text-[#EE0D79] font-normal">
                              {formatNumber(item.subTotal)} đ
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OffLineOrder;
