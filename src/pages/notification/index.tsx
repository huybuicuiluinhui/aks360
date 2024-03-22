import React, { useRef } from "react";
import Header from "../../component/header";
import AllTab from "../endow/allTab";
import Unread from "./unread";
import Read from "./read";
// import OnLineOrder from "./onLineOrder";
// import OffLineOrder from "./offLineOrder";

const Notification = () => {
  const tabs = [
    { id: 1, title: "Chưa đọc" },
    {
      id: 2,
      title: "Đã đọc",
    },
  ];
  const refScroll = useRef(null);
  const [choose, setChoose] = React.useState(0);
  const WIDTH_WINDOW = window.innerWidth;
  const handleTabClick = (index: any) => {
    const tabPosition = WIDTH_WINDOW * index;
    // @ts-ignore
    refScroll.current?.scrollTo({
      left: tabPosition,
      behavior: "smooth",
    });
    setChoose(index);
  };
  return (
    <div className="w-full h-full bg-bg">
      <Header title="Thông báo Shop" />
      <div className="w-full h-full">
        <div className="w-full flex  ">
          {!!tabs &&
            tabs.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="w-[50%] h-full  flex flex-col items-center justify-center pt-2  border-b-2 pb-1"
                  onClick={() => {
                    handleTabClick(index);
                  }}
                  style={{
                    borderColor: index === choose ? "#0CA8A1" : "#fff",
                  }}
                >
                  <p className=" text-[17px]  text-[#198303] font-semibold ">
                    {item.title}
                  </p>
                </div>
              );
            })}
        </div>
        <div
          ref={refScroll}
          className="no-scrollbar h-full w-full "
          style={{
            overflowX: "hidden",
            display: "flex",
            scrollBehavior: "smooth",
          }}
        >
          <div
            className=" no-scrollbar h-full "
            style={{
              flex: `0 0 ${WIDTH_WINDOW}px`,
            }}
          >
            <Unread />
          </div>
          <div
            className="no-scrollbar h-full "
            style={{
              flex: `0 0 ${WIDTH_WINDOW}px`,
            }}
          >
            <Read />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
