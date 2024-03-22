import React, { useState } from "react";
import Header from "../../component/header";
import Images from "../../static";

const HistoryPoint = () => {
  const [data, setData] = useState([
    {
      id: 1,
      code: "098123786781263",
      type: 1,
      price: 899.0,
      date: "20:00 - 23/12/2023",
    },
    {
      id: 2,
      code: "035744337534432",
      type: 2,
      price: 569.0,
      date: "19:10 - 11/12/2023",
    },
    {
      id: 3,
      code: "098123786781263",
      type: 1,
      price: 199.0,
      date: "22:00 - 02/12/2023",
    },
  ]);

  return (
    <div className="w-full h-screen bg-bg">
      <Header title="Lịch sử tích điểm" />
      <div className="flex justify-between items-center px-3 mt-3 ">
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
      <div className="w-full px-3">
        {data.map((item, index) => {
          return (
            <div
              className="px-3 w-full mt-3 border-[2px] border-[#C7C7C7] rounded-[10px] py-2 "
              key={index}
            >
              <div className="flex gap-1 w-full ">
                <img
                  src={Images.iconOrder}
                  alt=""
                  className="w-[13px] h-[16px] object-contain"
                />
                <div className="w-full ">
                  <div className="w-full flex justify-between ">
                    <p className="text-sm text-[#666666] font-normal">
                      Đơn hàng : {item.code}
                    </p>
                    {item?.type === 1 ? (
                      <p className="text-[#0B9895] text-xs  font-medium">
                        Đơn Online
                      </p>
                    ) : (
                      <p className="text-[#0B4CCA] text-xs  font-medium">
                        Đơn Offline
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-[#FF5E3A] font-semibold">
                    (đ) 899.000
                  </p>
                  <div className="w-full flex justify-between ">
                    <p className="text-sm text-[#666666] font-light">
                      20:00 - 23/12/2023
                    </p>

                    <p className="text-sm text-[#D60013] font-medium">
                      + 12 điểm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPoint;
