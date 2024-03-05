import React from "react";
import Images from "../../static";
import { useNavigate } from "react-router-dom";

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 999 }}>
      <div className="w-full bg-gradient-to-r from-[#098B8B] to-[#0DB2A8] flex items-center justify-start gap-5 py-5 px-[20px] ">
        <div
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
    </div>
  );
};

export default Header;
