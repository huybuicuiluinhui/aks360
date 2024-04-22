import React, { useEffect, useRef } from "react";
import Header from "../../component/header";
import ListOrder from "./listOrder";
import orderApis from "../../apis/order.apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import ListOrder2 from "./listOrder2";
import ListOrder3 from "./listOrder3";
import ListOrder4 from "./listOrder4";

const Order = () => {
  const tabs = [
    { id: 1, title: "Chưa xác nhận" },
    {
      id: 2,
      title: "Đã xác nhận",
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

  // const { data: dataTab2 } = useQuery({
  //   queryKey: ["dataTab2"],
  //   queryFn: () => orderApis.getFollowOrder(1),
  // });

  // const { data: dataTab3 } = useQuery({
  //   queryKey: ["dataTab3"],
  //   queryFn: () => orderApis.getFollowOrder(2),
  // });

  // const { data: dataTab4 } = useQuery({
  //   queryKey: ["dataTab4"],
  //   queryFn: () => orderApis.getFollowOrder(3),
  // });
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
          <ListOrder2 />
        </div>
        <div
          className="no-scrollbar h-full "
          style={{
            flex: `0 0 ${WIDTH_WINDOW}px`,
          }}
        >
          <ListOrder3 />
        </div>
        <div
          className="no-scrollbar h-full "
          style={{
            flex: `0 0 ${WIDTH_WINDOW}px`,
          }}
        >
          <ListOrder4 />
        </div>
      </div>
    </div>
  );
};

export default Order;
