import React from "react";
import Header from "../../component/header";
import Images from "../../static";

const QrCode = () => {
  return (
    <div className="w-full h-full">
      <Header title="QR code của tôi" />
      <p className="text-main text-sm font-semibold text-center my-6">
        SĐT khách hàng : 0363.283.111
      </p>
      <img
        src={Images.qrcode}
        alt=""
        className="w-[45%] mx-auto h-auto object-contain "
      />
      <p className="text-[#A4A4A4] text-xs text-center mt-6">
        QR code này sử dụng cho việc nhân viên của shop quét
      </p>
    </div>
  );
};

export default QrCode;
