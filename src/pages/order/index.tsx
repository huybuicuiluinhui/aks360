import React, { useRef } from "react";
import Header from "../../component/header";
import ListOrder from "./listOrder";

const Order = () => {
  const tabs = [
    { id: 1, title: "Đã xác nhận" },
    {
      id: 2,
      title: "Chưa xác nhận",
    },
    {
      id: 3,
      title: "Đang giao hàng",
    },
    {
      id: 4,
      title: "Hoàn thành",
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
    <div className="w-full bg-bg">
      <Header title="Đơn hàng" />

      <div className=" flex w-full justify-between px-3  ">
        {!!tabs &&
          tabs.map((item, index) => {
            return (
              <div
                key={item.id}
                className="  flex flex-col items-center justify-center pt-2  border-b-2 pb-1 "
                onClick={() => {
                  handleTabClick(index);
                }}
                style={{
                  borderColor: index === choose ? "#0A9391" : "#fff",
                }}
              >
                <p className=" text-[12px]  text-[#0A9391] font-semibold ">
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
          <ListOrder />
        </div>
        <div
          className="no-scrollbar h-full "
          style={{
            flex: `0 0 ${WIDTH_WINDOW}px`,
          }}
        >
          <ListOrder />
        </div>
        <div
          className="no-scrollbar h-full "
          style={{
            flex: `0 0 ${WIDTH_WINDOW}px`,
          }}
        >
          <ListOrder />
        </div>
        <div
          className="no-scrollbar h-full "
          style={{
            flex: `0 0 ${WIDTH_WINDOW}px`,
          }}
        >
          <ListOrder />
        </div>
      </div>
    </div>
  );
};

export default Order;
