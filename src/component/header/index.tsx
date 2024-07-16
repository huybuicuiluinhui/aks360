import React from "react";
import Images from "../../static";
import { useNavigate } from "react-router-dom";

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 999 }}>
      <div className="w-full bg-gradient-to-r from-[#158f3e]   via-95% to-[#36be5d] flex items-center justify-between py-5 pr-[20px] pl-[10px] ">
        <div className="flex items-center gap-5  ">
          <div
            className="py-2 px-4 "
            onClick={() => {
              navigate(-1);
            }}
          >
            <img
              src={Images.iconArrLeft}
              alt=""
              className="w-[9px] h-[16px] object-contain"
            />
          </div>
          <p className="text-white text-lg font-medium ">{title}</p>
        </div>

        <img
          src={Images.iconHeader}
          alt=""
          className="w-[68px] h-[21px] object-contain"
        />
      </div>
    </div>
  );
};

export default Header;
