import React from "react";
import Header from "../../component/header";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <Header title="Cài đặt địa chỉ" />

      <div className="w-full px-3 ">
        {Array(3)
          .fill(0)
          .map((item, index) => {
            return (
              <div
                className="py-3 pl-3 border-b-4 border-b-[#e8e8e8]"
                key={item.id}
              >
                <div className="flex items-start">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path
                      d="M8.49984 9.91667C10.0624 9.91667 11.3332 8.64592 11.3332 7.08333C11.3332 5.52075 10.0624 4.25 8.49984 4.25C6.93725 4.25 5.6665 5.52075 5.6665 7.08333C5.6665 8.64592 6.93725 9.91667 8.49984 9.91667ZM8.49984 5.66667C9.28113 5.66667 9.9165 6.30204 9.9165 7.08333C9.9165 7.86462 9.28113 8.5 8.49984 8.5C7.71855 8.5 7.08317 7.86462 7.08317 7.08333C7.08317 6.30204 7.71855 5.66667 8.49984 5.66667Z"
                      fill="#263238"
                    />
                    <path
                      d="M8.08939 15.4516C8.20928 15.5372 8.35291 15.5832 8.50023 15.5832C8.64754 15.5832 8.79118 15.5372 8.91106 15.4516C9.12639 15.2993 14.1874 11.645 14.1669 7.08335C14.1669 3.9589 11.6247 1.41669 8.50023 1.41669C5.37577 1.41669 2.83356 3.9589 2.83356 7.07981C2.81302 11.645 7.87406 15.2993 8.08939 15.4516ZM8.50023 2.83335C10.8441 2.83335 12.7502 4.73948 12.7502 7.0869C12.7651 10.2305 9.64206 13.0532 8.50023 13.979C7.3591 13.0525 4.23535 10.2291 4.25023 7.08335C4.25023 4.73948 6.15635 2.83335 8.50023 2.83335Z"
                      fill="#263238"
                    />
                  </svg>
                  <p className="text-sm  ml-1 flex-1 text-[#263238]">
                    21 3123 1231 2312 3123 12312 3123 12
                  </p>
                  <div
                    className="text-sm  px-3 text-[#01B2FF]"
                    //   onClick={() =>
                    //     navigate(path.addAdress, {
                    //       state: {
                    //         item: item,
                    //         type: 2,
                    //       },
                    //     })
                    //   }
                  >
                    Sửa
                  </div>
                </div>
                <div className="flex items-center justify-between my-2 pl-5">
                  <p className="text-sm  text-[#828282] w-full line-clamp-1">
                    đây là têm
                  </p>
                  <div
                    className="text-sm  px-3 text-[#ff3c3c]"
                    //   onClick={() => {
                    //     setItemChoose(item);
                    //     setShowModalDelete(true);
                    //   }}
                  >
                    Xoá
                  </div>
                </div>
                <div className="flex items-center justify-between pl-5 pr-3">
                  <p className="text-sm   text-[#828282]">0987654321</p>
                  {index % 2 === 0 ? (
                    <div
                      className="flex items-center justify-center py-1 px-3 rounded-lg"
                      style={{ backgroundColor: "#01B2FF" }}
                    >
                      <p className="text-xs  text-white ">Mặc định</p>
                    </div>
                  ) : (
                    <div
                      className="bg-[#0DAEA5] flex items-center justify-center py-1 px-3 rounded-lg"
                      //   onClick={() => handleSetDefault(item)}
                    >
                      <p className="text-xs  text-white ">Thiết lập mặc định</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <div className="h-[12%]"></div>
      <div className="fixed bottom-[0%] w-full flex flex-col bg-white h-[10%] items-center justify-center">
        <div
          className="bg-[#0DADA4]   w-fit px-20 py-2 rounded-md"
          onClick={() => {
            navigate("/addAdr");
          }}
        >
          <p className="text-sm text-white font-normal">Thêm mới</p>
        </div>
      </div>
    </div>
  );
};

export default Address;
