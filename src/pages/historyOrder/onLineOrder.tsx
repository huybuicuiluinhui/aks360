import React, { useEffect, useRef, useState } from "react";
import Images from "../../static";
import { formatNumber } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import orderApis from "../../apis/order.apis";
import moment from "moment";
import { IOrderOnline } from "../../types/order.type";

const OnLineOrder = () => {
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [listData, setListData] = useState<IOrderOnline[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery({
    queryKey: ["listOrderOnl"],
    queryFn: async () => {
      try {
        const response = await orderApis.getOrderOnline(1);
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
        const response = await orderApis.getOrderOnline(nextPage);
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
    <div className="w-full h-full">
      <div className="flex justify-between items-center px-3 mt-3">
        <div className="flex gap-2 items-center">
          <p className="text-xs text-[#828282] font-light">Sắp xếp</p>
          <img
            src={Images.iconShowmore}
            alt=""
            className="w-[16px] h-[16px] object-contain"
          />
        </div>
        <img
          src={Images.iconFilter}
          alt=""
          className="w-[17px] h-[16px] object-contain"
        />
      </div>
      {!!listData &&
        !!listData.length &&
        listData.map((i, e) => {
          return (
            <div className="px-3 w-full mt-3" key={e}>
              <div className="flex gap-1 w-full ">
                <img
                  src={Images.iconOrder}
                  alt=""
                  className="w-[13px] h-[16px] object-contain"
                />
                <div className="w-full mr-[10%] gap-2">
                  <p className="text-sm text-[#666666] font-normal">
                    Đơn hàng : {i.code}
                  </p>
                  <p className="text-sm text-[#FF5E3A] font-semibold">
                    (đ) {formatNumber(i.total_money)}
                  </p>
                  <p className="text-sm text-[#666666] font-light mb-2">
                    {moment(i.created_at).format("hh:mm DD/MM/YYYY")}
                  </p>
                  {i.list_product.map((item, index) => {
                    return (
                      <div
                        className="flex border-dashed border rounded-md border-[#F9A671] p-1 pr-2 mb-2"
                        key={index}
                      >
                        {item?.img_product && (
                          <img
                            src={item?.img_product}
                            alt=""
                            className="w-[62px] h-[65px] object-cover rounded-[10px]"
                          />
                        )}
                        <div className="ml-2 w-full flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <p className="text-[#373943] text-[10px] font-medium">
                              {item?.name_product}{" "}
                            </p>
                            <p className="text-[#EE0D79] text-xs font-semibold">
                              {formatNumber(item?.money)} đ
                            </p>
                          </div>
                          {/* <p className="text-[10px] text-[#828BAC] font-normal ">
                            SKU : {item?.description_product}
                          </p> */}
                          <p className="text-[10px] text-[#828BAC]  font-normal">
                            Số lượng : {item?.quantity} sản phẩm
                          </p>
                          <p className="text-[10px] text-[#45579A] font-normal">
                            Tổng tiền :{" "}
                            <span className="text-[#EE0D79] font-normal">
                              {formatNumber(item.total_money)} đ
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      <div ref={elementRef} className="text-center">
        {loadMore && <div className="text-center">Loading...</div>}
      </div>
    </div>
  );
};

export default OnLineOrder;
