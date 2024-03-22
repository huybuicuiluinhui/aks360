import React, { useState } from "react";
import Images from "../../static";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import QRCode from "react-qr-code";
interface IITemSetting {
  id: number;
  name: string;
  img: string;
  title?: string;
  screen?: string;
}
const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [dataSetting, setDataSetting] = useState<IITemSetting[]>([
    {
      id: 1,
      name: " Chỉnh sửa thông tin",
      img: Images.iconSetting,
      screen: "/individual",
    },
    {
      id: 2,
      name: " Đơn hàng",
      img: Images.iconOrder2,
      title: "Tất cả đơn",
      screen: "/order",
    },
    {
      id: 3,
      name: " Cài đặt địa chỉ",
      img: Images.iconAdr,
      screen: "/address",
    },
    {
      id: 4,
      name: " Nhắn tin hỗ trợ",
      img: Images.iconComment,
      screen: "",
    },
  ]);
  return (
    <div className="w-full h-full  bg-bg  ">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#16A244] via-30% to-[#2BE318] px-3  pt-[32px] pb-20 relative">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <img
              src={Images.iconAvatar}
              alt=""
              className="w-[60px] h-[60px] object-contain rounded-full"
            />
            <div className="flex flex-col h-[60px] justify-around">
              <p className="text-white text-xl font-normal">Xin chào,</p>
              <p className="text-white text-2xl font-semibold">{user?.name}</p>
            </div>
          </div>
          <img
            src={Images.iconHeader}
            alt=""
            className="w-[68px] h-[21px] object-contain"
          />
        </div>
        {/* menu */}
        <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[14px]   absolute top-[70%] w-[90%] left-[5%]">
          <div className="flex items-center justify-between py-4 border-b-2 border-b-[#F0F0F0] mb-3 px-2">
            <p className="text-main text-sm font-semibold ml-3">
              Tổng điểm tích
            </p>
            <div className="flex gap-1 items-center ">
              <img
                src={Images.iconDiamond}
                alt=""
                className="w-[20px] h-[20px] object-contain  "
              />
              <p className="text-main text-sm font-medium">
                {!!user && user.rewardPoint}
              </p>
              <img
                src={Images.iconArrRight}
                alt=""
                className="w-[10px] h-[16px] object-contain "
              />
            </div>
          </div>
          <div
            className="w-full flex  justify-between pb-3 px-2"
            onClick={() => {
              navigate("/endow");
            }}
          >
            <div className="  flex   items-center gap-3 pl-3 ">
              {/* <div className=" bg-[#B2F1EE] rounded-full p-[12px] flex flex-col items-center   w-fit "> */}
              <img
                src={Images.iconGift}
                alt=""
                className="w-[38px] h-[38px] object-contain 0"
              />
              {/* </div> */}
              <p className="line-clamp-2 text-center text-main text-sm font-medium ">
                Ưu đãi
              </p>
            </div>
            <img
              src={Images.iconArrRight2}
              className="w-[9px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
      {/* List item */}
      <div className="w-full pt-[25%] px-[40px]">
        {!!dataSetting &&
          !!dataSetting.length &&
          dataSetting.map((item, index) => {
            return (
              <div
                onClick={() => {
                  navigate(item?.screen ? item?.screen : "");
                }}
                className="flex items-center justify-between  py-3 border-b-[1px] border-[#F0F0F0]"
                key={index}
              >
                <div className="flex gap-5">
                  <img
                    src={item.img}
                    alt=""
                    className="w-[25px] h-[25px] object-contain"
                  />
                  <p>{item.name}</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-[12px] text-[#A6A6A6] font-normal">
                    {item?.title}
                  </p>

                  <img
                    src={Images.iconArrRight2}
                    alt=""
                    className="w-[9px] h-auto object-contain"
                  />
                </div>
              </div>
            );
          })}
      </div>
      {/*Qr code */}
      <p className="text-center text-xs font-normal text-[#A4A4A4] mt-4 ">
        QR code này sử dụng cho việc nhân viên của shop quét
      </p>
      <img
        src={Images.iconAvatar}
        alt=""
        className="w-[60px] h-[60px] rounded-full object-cover mx-auto my-5"
      />
      <p className="text-main text-sm font-medium text-center mb-5">
        SĐT khách hàng: {user?.contactNumber}
      </p>
      <div className="relative w-full h-fit flex flex-col justify-center  ">
        {/* <img
          src={Images.qrcode}
          alt=""
          className="w-[50%] h-auto  mx-auto block object-contain"
        /> */}
        {!!user?.contactNumber && (
          <QRCode
            size={256}
            // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={user?.contactNumber}
            className="w-[50%] h-auto  mx-auto block object-contain b"
            viewBox={`0 0 256 256`}
          />
        )}

        <img
          src={Images.iconAvatar}
          alt=""
          className="w-[45px] h-[45px] rounded-full object-cover mx-auto absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 "
        />
      </div>
      <div className="flex mt-4 justify-around">
        <div className="flex items-center gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-[50px] px-[20px] py-3">
          <img
            src={Images.iconDownLoad}
            alt=""
            className="w-[24px] h-[24px] object-contain"
          />
          <p className="text-[#8F8C8C] text-xs font-normal">
            Tải xuống QR Code
          </p>
        </div>
        <div className="flex items-center gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-[50px] px-[20px] py-3">
          <img
            src={Images.iconShare2}
            alt=""
            className="w-[24px] h-[24px] object-contain"
          />
          <p className="text-[#8F8C8C] text-xs font-normal">
            Chia sẻ QR của bạn
          </p>
        </div>
      </div>
      <p className="text-xs font-light text-[#A4A4A4] text-center my-28  ">
        Sản phẩm được pháp triển bởi ASK360
      </p>
    </div>
  );
};

export default Profile;
