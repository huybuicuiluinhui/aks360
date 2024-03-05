import React from "react";
import Images from "../../static";

const OffLineOrder = () => {
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
      {Array(4)
        .fill(0)
        .map((i, e) => {
          return (
            <div className="px-3 w-full mt-3" key={e}>
              <div className="flex gap-1 w-full ">
                <img
                  src={Images.iconOrder}
                  alt=""
                  className="w-[13px] h-[16px] object-contain"
                />
                <div className="w-full mr-[10%]">
                  <p className="text-sm text-[#666666] font-normal">
                    Đơn hàng : 098123786781263
                  </p>
                  <p className="text-sm text-[#FF5E3A] font-semibold">
                    (đ) 899.000
                  </p>
                  <p className="text-sm text-[#666666] font-light">
                    20:00 - 23/12/2023
                  </p>
                  {Array(3)
                    .fill(0)
                    .map((item, index) => {
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
                          <div className="ml-2 w-full">
                            <div className="flex items-center justify-between">
                              <p className="text-[#45579A] text-[10px] font-medium">
                                Lineabon D3K2{" "}
                              </p>
                              <p className="text-[#EE0D79] text-xs font-semibold">
                                295.000 đ
                              </p>
                            </div>
                            <p className="text-[10px] text-[#828BAC] font-normal ">
                              SKU : 232323
                            </p>
                            <p className="text-[10px] text-[#828BAC]  font-normal">
                              Số lượng : 2 sản phẩm
                            </p>
                            <p className="text-[10px] text-[#45579A] font-normal">
                              Tổng tiền :{" "}
                              <span className="text-[#EE0D79] font-normal">
                                590.000 đ
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
