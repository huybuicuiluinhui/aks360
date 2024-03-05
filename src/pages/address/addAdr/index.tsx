import React, { useEffect, useState } from "react";
import Header from "../../../component/header";
import Images from "../../../static";

const AddAdr = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  return (
    <div className="w-screen h-full">
      <Header title="Thêm mới địa chỉ" />
      <div className="w-full">
        <div className="border border-[#D9D9D9D9] rounded-md mt-3 mx-3 py-2 px-4 flex items-center justify-between">
          <p className="text-sm text-[#333333] font-normal">Chọn Tỉnh, TP</p>
          <img
            src={Images.iconArrBottom}
            alt=""
            className="w-[7px] -[10px] object-contain"
          />
        </div>
        <div className="border border-[#D9D9D9D9] rounded-md mt-3 mx-3 py-2 px-4 flex items-center justify-between">
          <p className="text-sm text-[#333333] font-normal">Chọn Quận, Huyện</p>
          <img
            src={Images.iconArrBottom}
            alt=""
            className="w-[7px] -[10px] object-contain"
          />
        </div>
        <div className="border border-[#D9D9D9D9] rounded-md mt-3 mx-3 py-2 px-4 flex items-center justify-between">
          <p className="text-sm text-[#333333] font-normal">Chọn Phường, Xã</p>
          <img
            src={Images.iconArrBottom}
            alt=""
            className="w-[7px] -[10px] object-contain"
          />
        </div>
        <textarea
          cols={Math.floor(windowWidth / 10)}
          rows={5} // Số hàng
          placeholder="Địa chỉ cụ thể"
          className={`border text-sm text-[#333333] font-normal border-[#D9D9D9D9] rounded-md mt-3 mx-3 py-2 px-4 w-[94%]`}
        />
        <div className="flex flex-row  items-center gap-4 float-right mr-5">
          <p className="text-[15px] font-medium text-[#333333]">
            Đặt làm mặc định{" "}
          </p>
          <img
            src={Images.iconSwitch}
            alt=""
            className="w-[31px] h-auto object-contain "
          />
        </div>
      </div>
      <div className="h-[12%]"></div>
      <div className="fixed bottom-[0%] w-full flex flex-col bg-white h-[10%] items-center justify-center">
        <div className="bg-[#0DADA4]   w-fit px-20 py-2 rounded-md">
          <p className="text-sm text-white font-normal">Lưu</p>
        </div>
      </div>
    </div>
  );
};

export default AddAdr;
