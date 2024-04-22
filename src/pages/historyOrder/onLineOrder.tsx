import React, { useState } from "react";
import Images from "../../static";
import { formatNumber } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import orderApis from "../../apis/order.apis";
import moment from "moment";

const OnLineOrder = () => {
  const { data: lisrOrderOnl } = useQuery({
    queryKey: ["listOrderOnl"],
    queryFn: () => orderApis.getOrderOnline(),
  });
  const dataOrderOnline = lisrOrderOnl?.data.data?.data;
  return (
    <div className="w-full h-full">
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
      {!!dataOrderOnline &&
        !!dataOrderOnline.length &&
        dataOrderOnline.map((i, e) => {
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
                    (đ) {formatNumber(i.total_money)}
                  </p>
                  <p className="text-sm text-[#666666] font-light mb-2">
                    {moment(i.created_at).format("hh:mm DD/MM/YYYY")}
                  </p>
                  {/* {i.product.map((item, index) => {
                    return (
                      <div
                        className="flex border-dashed border rounded-md border-[#F9A671] p-1 pr-2 mb-2"
                        key={index}
                      >
                        <img
                          src={item?.img}
                          alt=""
                          className="w-[62px] h-[65px] object-cover rounded-[10px]"
                        />
                        <div className="ml-2 w-full">
                          <div className="flex items-center justify-between">
                            <p className="text-[#373943] text-[10px] font-medium">
                              {item?.name}{" "}
                            </p>
                            <p className="text-[#EE0D79] text-xs font-semibold">
                              {formatNumber(item?.priceProduct)} đ
                            </p>
                          </div>
                          <p className="text-[10px] text-[#828BAC] font-normal ">
                            SKU : {item?.sku}
                          </p>
                          <p className="text-[10px] text-[#828BAC]  font-normal">
                            Số lượng : {item?.amount} sản phẩm
                          </p>
                          <p className="text-[10px] text-[#45579A] font-normal">
                            Tổng tiền :{" "}
                            <span className="text-[#EE0D79] font-normal">
                              {formatNumber(item.priceProduct * item?.amount)} đ
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })} */}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OnLineOrder;
