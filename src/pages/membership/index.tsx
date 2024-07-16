import React from "react";
import Header from "../../component/header";
import ItemMyVoucher from "../../component/itemMyVoucher";
import voucherApi from "../../apis/voucher.apis";
import { useQuery } from "@tanstack/react-query";
import Images from "../../static";

const Membership = () => {
  const { data: listMyVoucher } = useQuery({
    queryKey: ["listMyVoucherMemberFetch"],
    queryFn: () => voucherApi.getListMyVoucher(),
  });
  const dataMyVoucher = listMyVoucher?.data.data;
  return (
    <div className="w-full h-full ">
      <Header title="Hạng thành viên" />

      <div className="w-full px-2 pt-2 flex flex-col">
        <img
          src={Images.cardVip}
          alt=""
          className="w-[95%] h-auto object-contain self-center "
        />
        <p className="text-base text-black font-medium my-2 ">
          Voucher dành riêng cho bạn
        </p>
        <div className="w-full">
          {!!dataMyVoucher &&
            !!dataMyVoucher.length &&
            dataMyVoucher.map((item, index) => {
              return <ItemMyVoucher i={item} key={index} />;
            })}
        </div>
        <p className="text-base text-black font-medium mb-2 ">
          Đặc quyền dành riêng cho thẻ VIP
        </p>
        <p className="text-xs text-black font-normal">
          Đối với những khách hàng thuộc hạng thành viên VIP sẽ được ưu tiên cho
          tất cả các sự kiện trọng điểm trong năm của LÊ UYÊN
        </p>
        <p className="text-xs text-black font-normal">
          ● Được ưu tiên các sự kiện Offline đăng ký
        </p>
        <p className="text-xs text-black font-normal">
          ● Được hưởng các ưu đãi riêng của voucher Hạng
        </p>
        <p className="text-xs text-black font-normal">
          ● Được nhận các chương trình riêng theo hạng thẻ
        </p>
        <p className="text-xs text-black font-normal">
          ● Nhận quà tặng đặc biệt theo các sự kiện Mini Game
        </p>
        <p className="text-xs text-black font-normal">
          Khách hàng mua sắp sẽ được tích điểm theo giá trị đơn hàng, giá trị
          đơn hàng sẽ tăng lượng điểm đã tích và số điểm tích sẽ được cộng nâng
          hàng đặc quyền thẻ cho thành viên
        </p>
      </div>
    </div>
  );
};

export default Membership;
