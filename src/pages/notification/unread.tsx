import React, { useState } from "react";
import Images from "../../static";
import { formatNumber } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import notificationApis from "../../apis/notification.apis";
import { API_URL_IMAGE } from "../../utils/contanst";
import moment from "moment";

const Unread = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 1,
      code: "09876543323272",
      price: 890000,
      date: "20:00 - 23/12/2023",
      product: [
        {
          name: "Lineabon D3K2",
          sku: "23323",
          amount: 2,
          priceProduct: 295000,
          img: Images.imgTest,
        },
        {
          name: "Bestical Sinh học",
          sku: "32555",
          amount: 1,
          priceProduct: 195000,
          img: Images.iconBestical,
        },
      ],
    },
    {
      id: 2,
      code: "099988664426423",
      price: 790000,
      date: "20:00 - 23/12/2023",
      product: [
        {
          name: "Lineabon D3K2",
          sku: "23323",
          amount: 1,
          priceProduct: 295000,
          img: Images.imgTest,
        },
        {
          name: "Bestical Sinh học",
          sku: "32555",
          amount: 2,
          priceProduct: 195000,
          img: Images.iconBestical,
        },
      ],
    },
  ]);
  const { data: dataUnred, isFetching: isFetching } = useQuery({
    queryKey: ["dataUnred"],
    queryFn: () => notificationApis.getListNoti(1),
  });
  const dataList = dataUnred?.data.data;
  return (
    <div className="w-full h-full  ">
      {!!dataList &&
        !!dataList.length &&
        dataList.map((i, e) => {
          return (
            <div
              className="border rounded  border-[#0B9C97] bg-white px-[15px] py-[7px] flex  gap-[20px] mt-4 mx-3 justify-between "
              key={e}
              onClick={() => {
                navigate(`/detailNotification/${i.id}`);
              }}
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm text-[#06070C] font-semibold line-clamp-3">
                  {i.title}
                </p>
                <p className="text-xs text-[#06070C] font-normal line-clamp-1">
                  {i.description}
                </p>
                <p className="text-[#838589] text-xs ">
                  {moment(i.created_at).format("YYYY-MM-DD")}
                </p>
              </div>
              <img
                src={API_URL_IMAGE + i.imgage_home}
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-[10px]"
              />
            </div>
          );
        })}
    </div>
  );
};

export default Unread;
