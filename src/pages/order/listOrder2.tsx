import React, { useEffect, useRef, useState } from "react";
import ItemCart from "../cart/itemCart";
import Images from "../../static";
import { formatNumber } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import orderApis from "../../apis/order.apis";
import { IOrderFollow } from "../../types/order.type";
import { API_URL_IMAGE } from "../../utils/contanst";

const ListOrder2 = () => {
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [listData, setListData] = useState<IOrderFollow[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery({
    queryKey: ["dataTab2"],
    queryFn: async () => {
      try {
        const response = await orderApis.getFollowOrder(1, 1);
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
        const response = await orderApis.getFollowOrder(1, nextPage);
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
                {item?.list_product.map((i, e) => {
                  return (
                    <div
                      className="flex border-b-2 py-2 border-b-[#EBEBEB] px-2"
                      key={e}
                      style={{
                        backgroundColor: "#fff",
                      }}
                    >
                      <div className="bg-[#f8f8fb] flex flex-col justify-center h-[117px] w-[117px] items-center rounded-lg">
                        <img
                          src={i.img_product}
                          className="h-full w-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 flex flex-col  gap-1 pl-3">
                        <p className=" text-sm font-medium text-[#333333] line-clamp-2 pr-3">
                          {i.name_product}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className=" text-xs  font-bold my-1 text-[#d60013]">
                            {formatNumber(i.money)} đ
                          </p>
                          <p className="text-xs font-semibold">
                            Số lượng: {i.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

export default ListOrder2;
