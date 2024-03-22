import React from "react";
import Header from "../../component/header";
import Images from "../../static";

const Individual = () => {
  return (
    <div className="w-full h-screen bg-[#fbfbfb]">
      <Header title="Cá nhân" />
      <div className="w-full h-full">
        <div className="flex items-center gap-2 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-3 my-2 py-2 px-2">
          <img
            src={Images.imgTest}
            alt=""
            className="w-12 h-12 object-cover rounded-md"
          />
          <div className="flex flex-col justify-between h-12">
            <p className="text-[#333333] text-xs font-bold">Lê Hồng Linh</p>
            <p className="text-[#45579A] text-[10px] font-light">
              S8JF - S203,Vinhome Ocenpack,Gia Lâm, HN
            </p>
            <p className="text-[#009F9D] text-[10px] font-light">
              14 ĐƠN HÀNG HOÀN THÀNH
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-6">
          <input
            type="text"
            placeholder="Họ và Tên"
            className="border border-[#D9D9D9D9] rounded-[5px] placeholder-[#333333] w-[95%] text-[#333333]   px-2 py-1 mb-3"
          />
        </div>
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="Số điện thoại"
            className="border border-[#D9D9D9D9] rounded-[5px] placeholder-[#333333] w-[95%] text-[#333333]   px-2 py-1 mb-3"
          />
        </div>
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="Email ( Nếu có )"
            className="border border-[#D9D9D9D9] rounded-[5px] placeholder-[#333333] w-[95%] text-[#333333]   px-2 py-1 mb-3"
          />
        </div>
        <div className="flex flex-col ">
          <div className=" bg-[#0DADA4] mx-auto self-center px-10 py-1 rounded-md">
            <p className="text-white font-medium text-[15px]">Cập nhật</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
