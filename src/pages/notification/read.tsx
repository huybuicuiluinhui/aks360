import React, { useState } from "react";
import Images from "../../static";
import { formatNumber } from "../../utils";
import notificationApis from "../../apis/notification.apis";
import { useQuery } from "@tanstack/react-query";
import { API_URL_IMAGE } from "../../utils/contanst";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const navigate = useNavigate();

  const { data: dataRead, isFetching: isFetching } = useQuery({
    queryKey: ["dataRead"],
    queryFn: () => notificationApis.getListNoti(2),
  });
  const dataList = dataRead?.data.data;
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
export default Read;
