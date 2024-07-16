import React, { useState } from "react";
import Images from "../../../static";
import { IBranch } from "../../../types/order.type";

interface ModalOrderProps {
  isOpen: boolean;
  onClose: () => void;
  dataBranch: IBranch[] | undefined;
  handleRatingOrder: any;
  note: string;
  setNote: any;
  rating: number;
  setRating: any;
  setHover: any;
  hover: number;
  selectedBranch: number;
  setSelectedBranch: any;
}

const ModalOrder: React.FC<ModalOrderProps> = ({
  isOpen,
  onClose,
  dataBranch,
  handleRatingOrder,
  note,
  setNote,
  rating,
  setRating,
  setHover,
  hover,
  selectedBranch,
  setSelectedBranch,
}) => {
  const starImages = {
    active: Images.starActive,
    inactive: Images.starNon,
  };

  const handleSelectedBranch = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedBranch(Number(event.target.value));
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

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
            className="w-[50px] h-[50px] object-contain "
          />
        </button>
        <div className="flex items-center mb-4 justify-center">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index} className="cursor-pointer">
                <input
                  type="radio"
                  style={{ display: "none" }}
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <img
                  src={
                    ratingValue <= (hover || rating)
                      ? starImages.active
                      : starImages.inactive
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  alt={`Star ${ratingValue}`}
                  className="w-8 h-8 mr-1"
                />
              </label>
            );
          })}
        </div>
        <div className="h-fit relative">
          <p className="absolute z-10 -top-[10%] bg-white ml-3 text-[#636D79] text-sm font-normal">
            Hãy nói vấn đề bạn gặp phải
          </p>
          <textarea
            placeholder=""
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-24 p-2 border border-blue-500 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          className="w-full border border-gray-200 rounded-md mt-3 py-2 px-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          onChange={handleSelectedBranch}
          value={selectedBranch}
        >
          {/* <option className="text-sm text-gray-700 font-normal">
            Chọn chi nhánh
          </option> */}
          {!!dataBranch &&
            dataBranch.length > 0 &&
            dataBranch.map((item, index) => (
              <option
                value={item.branch_kiotviet_id}
                className="text-sm text-gray-700 font-normal"
                key={index}
              >
                {item.address}
              </option>
            ))}
        </select>
        <div
          className=" w-[95%] bg-[#22BD2B] flex items-center justify-center mx-auto rounded-lg py-1 my-4"
          onClick={() => {
            handleRatingOrder();
          }}
        >
          <p className="text-white text-lg font-semibold">Gửi đánh giá</p>
        </div>
        <p className="text-center text-sm text-gray mt-4">
          Bộ phận chăm sóc khách hàng{" "}
          <span className="font-semibold text-black">3 Tốt</span>
          <br />
          <span className="font-semibold text-black">Kiểm duyệt</span> và{" "}
          <span className="font-semibold text-black">Xử lý đánh giá.</span>
        </p>
      </div>
    </div>
  );
};

export default ModalOrder;
