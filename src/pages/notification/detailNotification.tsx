import React from "react";
import Header from "../../component/header";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import notificationApis from "../../apis/notification.apis";
import { API_URL_IMAGE } from "../../utils/contanst";
import moment from "moment";

const DetailNotification = () => {
  const params = useParams();
  const id = params?.id;
  console.log("id", id);
  const { data: dataDetailNoti, isFetching: isFetchingCate } = useQuery({
    queryKey: ["dataDetailNoti"],
    queryFn: () => notificationApis.getNotiDetail(Number(id)),
  });
  const item = dataDetailNoti?.data.data;
  return (
    <div className="w-full h-full flex flex-col">
      <Header title="Chi tiết thông báo" />
      <div className="flex items-center gap-3">
        <img
          src={API_URL_IMAGE + item?.imgage_home}
          className="w-[40px] h-[40px] object-contain rounded-full"
        />
        <p className="text-[#06070C] text-sm font-medium my-3">{item?.title}</p>
      </div>
      <div className="flex flex-col items-center  mx-3">
        <img
          src={API_URL_IMAGE + item?.banner}
          alt=""
          className="w-full h-auto object-contain rounded-[20px] "
        />
      </div>

      <div className=" flex items-center justify-between mx-3">
        <p>Thời gian:</p>
        <p>{moment(item?.created_at).format("DD/MM/YYYY")}</p>
      </div>
      {!!item?.note && (
        <div
          className="text-[#000] font-normal text-[15px]  mb-2 mt-1 mx-3 "
          dangerouslySetInnerHTML={{ __html: item?.note }}
        ></div>
      )}
      <div className="bg-[#01A850] rounded-[15px] py-[10px] w-[90%] self-center flex items-center justify-center mb-32 mt-6">
        <p className="text-white text-xs font-semibold">Tham gia</p>
      </div>
    </div>
  );
};

export default DetailNotification;
