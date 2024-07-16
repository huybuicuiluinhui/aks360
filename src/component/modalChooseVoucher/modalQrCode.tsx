import React, { useState } from "react";
import Images from "../../static";
import QRCode from "qrcode.react";
import { useAuth } from "../../context/authContext";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  code: string;
}

const ModalQrCode: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  code,
}) => {
  const { user } = useAuth();
  console.log(user);
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
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative">
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
        <div className="flex justify-center mb-4">
          <img
            src={Images.logoBaTot}
            alt="Logo"
            className="w-[119px] h-auto object-contain"
          />
        </div>
        <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
        <p className="text-center mb-4 text-base">{content}</p>
        <QRCode
          size={240}
          // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={user?.phone_kiotviet + "___" + code}
          className="w-[50%] h-auto  mx-auto block object-contain "
          viewBox={`0 0 256 256`}
        />
        <p className="text-lg font-medium text-center">
          Code: {user?.phone_kiotviet}___{code}
        </p>
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
    </div>
  );
};

export default ModalQrCode;
