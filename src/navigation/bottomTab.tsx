// import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Images from "../static";
import { useAuth } from "../context/authContext";
import ModalLogin from "../component/customShowModal";
interface IRefModalMarket {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const tabs = {
  "/": {
    label: "Trang chủ",
    icon: Images.iconHomeNotChoose,
    activeIcon: Images.iconHome,
  },
  "/shop": {
    label: "Mua sắm",
    icon: Images.iconShop,
    activeIcon: Images.iconShopActive,
  },
  "/profile": {
    label: "Tài khoản",
    icon: Images.iconProfile,
    activeIcon: Images.iconProfileChoose,
  },
};
export type TabKeys = keyof typeof tabs;
export const BOTTOM_NAVIGATION_PAGES = ["/", "/shop", "/profile"];

export const CustomNavigationBotom: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKeys | string>("/");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const BottomNav = React.useMemo(() => {
    setActiveTab(location.pathname);
    return BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);
  const refModalLogin = React.useRef<IRefModalMarket>(null);
  if (BottomNav) {
    return (
      <div
        className={"fixed w-full flex"}
        style={{
          top: "100%",
          left: 0,
          zIndex: "100",
        }}
      >
        <div className="flex justify-center w-full">
          <div
            className={
              "flex items-center bg-white pt-3 pb-1 absolute bottom-0 w-full max-w-[455px]  "
            }
          >
            {/*@ts-ignore*/}
            {Object.keys(tabs).map((path: TabKeys, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 justify-center"
                onClick={() => {
                  console.log(isLoggedIn);
                  if (
                    tabs[path].label !== "Trang chủ" &&
                    isLoggedIn === false
                  ) {
                    refModalLogin.current?.setVisible(true);
                  } else {
                    setActiveTab(path);
                    navigate(path);
                  }
                }}
              >
                {tabs[path].label === "Tư vấn" ? (
                  <div className="w-6 h-6" />
                ) : path === activeTab ? (
                  <img
                    src={tabs[path].activeIcon}
                    alt=""
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <img
                    src={tabs[path].icon}
                    alt=""
                    className="w-6 h-6 object-contain"
                  />
                )}
                <span
                  className={`text-align text-[12px]  ${
                    path === activeTab
                      ? "font-bold text-[#3669C9]"
                      : "font-normal text-[#0C1A30]"
                  }`}
                >
                  {tabs[path].label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <ModalLogin ref={refModalLogin} />
      </div>
    );
  }
  return <></>;
};
