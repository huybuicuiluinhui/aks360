import React, { useState } from "react";
import Images from "../../../static";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
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
        <p className="text-center mb-4 text-xl">{content}</p>
        <p className="text-center text-sm text-gray mt-4">
          Bộ phận chăm sóc khách hàng{" "}
          <span className="font-semibold text-black">3 Tốt</span>
          <br />
          <span className="font-semibold text-black">Kiểm duyệt</span> và{" "}
          <span className="font-semibold text-black">Xử lý đánh giá.</span>
        </p>
        <div className="flex justify-center mt-4 gap-3">
          <img
            src={Images.logoBaTot}
            alt=""
            className=" w-6 h-6 object-contain"
          />
          <span className="flex items-center text-sm text-gray-600">
            Thông báo đánh giá
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
