import React, { useState } from "react";
import Images from "../../static";
import ModalQrCode from "./modalQrCode";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code?: string;
}

const ModalChooseVoucher: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  code,
}) => {
  const navigate = useNavigate();
  const [showQr, setShowQr] = React.useState<boolean>(false);

  if (!isOpen) return null;
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative flex flex-col">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <img
            src={Images.iconCloseBg}
            alt=""
            className="w-[50px] h-[50px] object-contain"
          />
        </button>
        <div className="flex justify-center mb-1">
          <img
            src={Images.logoBaTot}
            alt="Logo"
            className="w-[119px] h-auto object-contain"
          />
        </div>
        <h2 className="text-lg font-bold text-center mb-5">{title}</h2>
        <div className="flex items-center justify-between w-full  ">
          <div
            className="flex item-center gap-2 bg-[#22BD2B] px-2 py-2 rounded-lg"
            onClick={() => {
              setShowQr(true);
            }}
          >
            <img
              src={Images.iconBuyNow}
              alt=""
              className="w-5 h-5 object-contain"
            />
            <p className="text-white font-semibold tex-base">Mua trực tiếp</p>
          </div>
          <div
            className="flex item-center gap-2 bg-[#22BD2B] px-2 py-2 rounded-lg"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <img
              src={Images.iconPhone}
              alt=""
              className="w-5 h-5 object-contain"
            />
            <p className="text-white font-semibold tex-base">Mua trên App</p>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-3">
          <img
            src={Images.logoBaTot}
            alt=""
            className=" w-6 h-6 object-contain"
          />
          <span className="flex items-center text-sm text-gray-600 font-bold italic ">
            Điều khoản sử dụng Voucher
          </span>
        </div>
      </div>
      <ModalQrCode
        isOpen={showQr}
        title="QR Code Voucher"
        content="Bạn hãy đưa màn hình QR code này để nhân viên thao quét và ghi nhận Voucher của bạn."
        onClose={() => {
          setShowQr(false);
        }}
        code={code ? code : "Không tìm thấy mã code "}
      />
    </div>
  );
};

export default ModalChooseVoucher;
