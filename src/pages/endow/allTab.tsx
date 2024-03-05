import React from "react";
import Images from "../../static";

const AllTab = () => {
  const ItemVoucher = () => {
    return (
      <div className="w-full rounded   bg-white px-4  mb-5 flex shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ">
        <div className="p-2    border-r-2 border-dashed border-[#C7C9D9]">
          <img
            src={Images.voucherTest}
            className="w-[100px] h-[100px] object-cover"
          />
        </div>
        <div className="flex-1 flex   flex-col justify-between  ml-3 py-2  ">
          <div className="flex justify-between">
            <p className="text-base font-semibold text-main line-clamp-1 flex-1">
              Free Ship adsf asdf ád
            </p>
            {/* <img
              src={Images.iconInfo}
              alt=""
              className="w-[20px] h-[20px] object-contain"
            /> */}
            <p className="text-base text-[#004FC4] font-medium">
              Đổi với: 10 điểm
            </p>
          </div>
          <p className="text-sm text-gray-500 line-clamp-1 text-[#8F90A6]">
            Miễn phí ship cho các đơn hàng
          </p>
          <div className="flex justify-between line-clamp-1">
            <p className="text-sm  text-[#8F90A6]">Date: 22/08/2021</p>

            <p className="bg-gradient-to-r from-[#9C1F60] to-[#F3921F] bg-clip-text text-transparent text-sm font-medium">
              Sử dụng
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full h-full px-3">
      <div className="flex items-center bg-[#0DB2A8]  w-fit p-1 gap-2 my-4 rounded-md">
        <img
          src={Images.iconTicket}
          alt=""
          className="w-[24px] h-[24px] object-contain"
        />
        <p className="text-white text-lg font-medium">Danh sách voucher</p>
      </div>
      <div>
        {Array(5)
          .fill(0)
          .map((i, e) => {
            return (
              <div key={e}>
                <ItemVoucher />
              </div>
            );
          })}
      </div>
      <div className="flex items-center bg-[#0DB2A8]  w-fit p-1 gap-2 my-4 rounded-md">
        <img
          src={Images.iconTicket}
          alt=""
          className="w-[24px] h-[24px] object-contain"
        />
        <p className="text-white text-lg font-medium">Đổi quà sản phẩm</p>
      </div>
      <div>
        {Array(5)
          .fill(0)
          .map((i, e) => {
            return (
              <div key={e}>
                <ItemVoucher />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllTab;
