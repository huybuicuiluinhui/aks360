import React, { useEffect, useRef, useState } from "react";
import ItemCart from "../cart/itemCart";
import Images from "../../static";
import { formatNumber } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import orderApis from "../../apis/order.apis";
import { IOrderFollow } from "../../types/order.type";

const ListOrder = () => {
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [listData, setListData] = useState<IOrderFollow[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery({
    queryKey: ["dataTab1"],
    queryFn: async () => {
      try {
        const response = await orderApis.getFollowOrder(0, 1);
        if (response && response.data && response.data.data) {
          const responseData = response.data.data;
          if (
            Array.isArray(responseData.data) &&
            responseData.data.length > 0
          ) {
            setListData(responseData.data);
            setLastPage(responseData.last_page);
            return responseData;
          } else {
            throw new Error("No data found in response");
          }
        } else {
          throw new Error("Invalid response data");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
  const loadMorePage = async () => {
    if (page >= lastPage) {
      return;
    } else {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadMore(true);
      try {
        const response = await orderApis.getFollowOrder(0, nextPage);
        if (response && response.data && response.data.data) {
          const responseData = response.data.data;
          if (
            Array.isArray(responseData.data) &&
            responseData.data.length > 0
          ) {
            setListData((prevData) => [...prevData, ...responseData.data]);
            setLastPage(responseData.last_page);
          } else {
            throw new Error("No data found in response");
          }
        } else {
          throw new Error("Invalid response data");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadMore(false);
      }
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < lastPage) {
          loadMorePage();
        }
      },
      {
        threshold: 1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [page, lastPage]);

  return (
    <div>
      <div className="">
        {!!listData &&
          !!listData.length &&
          listData.map((item, index) => {
            return (
              <div className="mt-4 px-3" key={index}>
                <p className="text-[#0A9391] text-[13px] mb-2">MÃ ĐƠN HÀNG</p>
                <div className="flex gap-2 items-center mb-2">
                  <img
                    src={Images.iconQr}
                    alt=""
                    className="w-6 h-6 object-contain"
                  />
                  <p className="text-[15px] text-[#333333]">{item?.code}</p>
                </div>
                {/* {item?.product.map((i, e) => {
                return (
                  <div
                    className="flex border-b-2 py-2 border-b-[#EBEBEB] pl-2"
                    key={e}
                    style={{
                      backgroundColor: "#fff",
                    }}
                  >
                    <div className="bg-[#f8f8fb] flex flex-col justify-center h-[117px] w-[117px] items-center rounded-lg">
                      <img
                        src={i.img}
                        className="h-20 w-20 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between pl-3">
                      <p className=" text-sm font-medium text-[#333333] line-clamp-2 pr-3">
                        {i.title}
                      </p>
                      <p className=" text-xs  font-bold my-1 text-[#d60013]">
                        {formatNumber(i.price)}
                      </p>
                      <p className=" text-[8px]  text-[#828282] line-through">
                        {formatNumber(i.price2)}
                      </p>
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
                          <svg
                            width="19"
                            height="18"
                            viewBox="0 0 19 18"
                            fill="none"
                          >
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
              })} */}
                {index < listData.length - 1 && (
                  <div className="w-full h-[1px] bg-[#0CA29C] mt-5" />
                )}
              </div>
            );
          })}
      </div>
      <div ref={elementRef} className="text-center">
        {loadMore && <div className="text-center">Loading...</div>}
      </div>
    </div>
  );
};

export default ListOrder;
