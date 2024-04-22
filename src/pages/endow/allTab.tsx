import React, { useState } from "react";
import Images from "../../static";
import { useQuery } from "@tanstack/react-query";
import voucherApi from "../../apis/voucher.apis";
import ItemVoucher from "../../component/itemVoucher";

const AllTab = () => {
  const { data: listVoucher, isFetching } = useQuery({
    queryKey: ["listVoucher"],
    queryFn: () => voucherApi.getListVoucher(),
  });
  const data = listVoucher?.data.data;

  return (
    <div className="w-full h-full px-3">
      <div className="flex items-center bg-[#198303]  w-fit p-1 gap-2 my-4 rounded-md">
        <img
          src={Images.iconTicket}
          alt=""
          className="w-[24px] h-[24px] object-contain"
        />
        <p className="text-white text-lg font-medium">Danh sách voucher</p>
      </div>
      <div>
        {!!data &&
          !!data.length &&
          data.map((i, e) => {
            return (
              <div key={e}>
                <ItemVoucher i={i} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllTab;
