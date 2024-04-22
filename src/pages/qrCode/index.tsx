import React from "react";
import Header from "../../component/header";
import Images from "../../static";
import { useAuth } from "../../context/authContext";
import QRCode from "react-qr-code";
import { API_URL_IMAGE } from "../../utils/contanst";

const QrCode = () => {
  const { user } = useAuth();
  return (
    <div className="w-full h-full">
      <Header title="QR code của tôi" />
      <p className="text-main text-sm font-semibold text-center my-6">
        SĐT khách hàng : {user?.phone_kiotviet}
      </p>{" "}
      <div className="relative w-full h-fit flex flex-col justify-center  ">
        {!!user?.phone_kiotviet && (
          <QRCode
            size={256}
            // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={user?.phone_kiotviet}
            className="w-[50%] h-auto  mx-auto block object-contain b"
            viewBox={`0 0 256 256`}
          />
        )}
        <img
          src={API_URL_IMAGE + user?.avavtar}
          alt=""
          className="w-[45px] h-[45px] rounded-full object-cover mx-auto absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 "
        />
      </div>
      <p className="text-[#A4A4A4] text-xs text-center mt-6">
        QR code này sử dụng cho việc nhân viên của shop quét
      </p>
    </div>
  );
};

export default QrCode;
