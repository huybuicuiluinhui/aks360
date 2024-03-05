import React from "react";
import Images from "../../static";

const ItemCart = () => {
  return (
    <div
      className="flex border-b-2 py-2 border-b-[#EBEBEB] pl-2"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <div className="bg-[#f8f8fb] flex flex-col justify-center h-[117px] w-[117px] items-center rounded-lg">
        <img src={Images.imgTest} className="h-20 w-20 object-cover rounded" />
      </div>
      <div className="flex-1 flex flex-col justify-between pl-3">
        <p className=" text-sm font-medium text-[#333333] line-clamp-2 pr-3">
          Xe chòi chân hươu gật gù có nhạc
        </p>
        <p className=" text-xs  font-bold my-1 text-[#d60013]">650.000</p>
        <p className=" text-[8px]  text-[#828282] line-through">650.000</p>
        <div className="flex items-center justify-between">
          <div className="flex">
            <div
              //   onClick={() => pressConfirm(0)}
              className="border-solid border-[#ebebeb] bg-white flex justify-center w-7 h-7 rounded-full items-center border"
            >
              <p className=" text-sm  text-[#333333]">-</p>
            </div>
            <div className="border-solid border-[#ebebeb] bg-white flex flex-col mx-2 h-7 items-center justify-center px-3 border rounded">
              <p className=" text-sm   text-[#333333]">2</p>
            </div>
            <div
              //   onClick={() => pressConfirm(1)}
              className="border-solid border-main bg-white flex justify-center w-7 h-7 rounded-full items-center border"
            >
              <p className=" text-sm  text-[#333333]">+</p>
            </div>
          </div>
          <div
            className="px-3 py-2"
            // onClick={() => handleDeleteCart.mutate()}
          >
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none">
              <path
                d="M4.0918 15C4.0918 15.3978 4.24983 15.7794 4.53114 16.0607C4.81244 16.342 5.19397 16.5 5.5918 16.5H13.0918C13.4896 16.5 13.8712 16.342 14.1525 16.0607C14.4338 15.7794 14.5918 15.3978 14.5918 15V6H16.0918V4.5H13.0918V3C13.0918 2.60218 12.9338 2.22064 12.6525 1.93934C12.3712 1.65804 11.9896 1.5 11.5918 1.5H7.0918C6.69397 1.5 6.31244 1.65804 6.03114 1.93934C5.74983 2.22064 5.5918 2.60218 5.5918 3V4.5H2.5918V6H4.0918V15ZM7.0918 3H11.5918V4.5H7.0918V3ZM6.3418 6H13.0918V15H5.5918V6H6.3418Z"
                fill="#828282"
              />
              <path
                d="M7.0918 7.5H8.5918V13.5H7.0918V7.5ZM10.0918 7.5H11.5918V13.5H10.0918V7.5Z"
                fill="#828282"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
