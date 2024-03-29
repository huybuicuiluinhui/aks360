import React, { useRef, useState } from "react";
import Header from "../../component/header";
import AllTab from "./allTab";
import ForMe from "./forMe";
import Images from "../../static";

const Endow = () => {
  const tabs = [
    { id: 1, title: "Tất cả" },
    {
      id: 2,
      title: "Của tôi",
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
      <Header title="Ưu đãi" />

      <div className="w-full flex  ">
        {!!tabs &&
          tabs.map((item, index) => {
            return (
              <div
                key={item.id}
                className="w-[50%] h-full  flex flex-col items-center justify-center pt-2  border-b-4 pb-1"
                onClick={() => {
                  handleTabClick(index);
                }}
                style={{
                  borderColor: index === choose ? "#198303" : "#fff",
                }}
              >
                <p
                  className=" text-[17px]   font-semibold "
                  style={{
                    color: index === choose ? "#198303" : "#0CA8A1",
                  }}
                >
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
          <AllTab />
        </div>
        <div
          className="no-scrollbar h-full "
          style={{
            flex: `0 0 ${WIDTH_WINDOW}px`,
          }}
        >
          <ForMe />
        </div>
      </div>
    </div>
  );
};

export default Endow;
