import React, { useState } from "react";
import Images from "../../static";
import { useQuery } from "@tanstack/react-query";
import voucherApi from "../../apis/voucher.apis";
import { API_URL_IMAGE } from "../../utils/contanst";
import { IMyVoucher } from "../../types/voucher.type";
import { useNavigate } from "react-router-dom";
import Modal from "../rate/modal";
import ModalChooseVoucher from "../../component/modalChooseVoucher";
import ModalRequest from "../../component/modalRequest";
import orderApis from "../../apis/order.apis";

const ForMe = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedBranch, setSelectedBranch] = React.useState<number>(0);
  const [code, setCode] = React.useState("");
  const [id, setId] = React.useState<number>(0);
  const { data: listMyVoucher, isFetching } = useQuery({
    queryKey: ["listMyVoucherEndow"],
    queryFn: () => voucherApi.getListMyVoucher(),
  });
  const data = listMyVoucher?.data.data;
  const handleSelectedBranhd = (event: any) => {
    setSelectedBranch(event?.target?.value);
  };
  const { data: listBranch } = useQuery({
    queryKey: ["listBrandFetch2"],
    queryFn: () => orderApis.getListBranch(),
  });
  const dataBranch = listBranch?.data.data;
  console.log(isModalOpen2);
  const ItemVoucher = ({ i }: { i: IMyVoucher }) => {
    console.log("iiiii", i);
    return (
      <div className="w-full rounded   bg-white pr-1  mb-5 flex shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ">
        <div className="p-2    border-r-2 border-dashed border-[#C7C9D9]">
          <img
            src={API_URL_IMAGE + i.voucher.image}
            className="w-[100px] h-[100px] object-cover"
          />
        </div>
        <div className="flex-1 flex   flex-col justify-between  ml-3 py-2  ">
          <div className="flex justify-between items-center">
            <p className="text-base font-semibold text-main line-clamp-1 flex-1">
              {i.voucher.describe}
            </p>
            {/* <p className="text-base text-[#004FC4] font-medium">
                Đổi với: {i.voucher.point} điểm
              </p> */}
            <img
              src={Images.iconInfo}
              alt=""
              className="w-5 h-5 object-contain"
            />
          </div>
          <p className="text-sm text-gray-500 line-clamp-1 text-[#8F90A6]">
            {i.voucher.note}
          </p>
          <div className="flex justify-between line-clamp-1 items-center">
            <p className="text-sm  text-[#8F90A6]">
              Date: {i.voucher.time_end}
            </p>
            <div
              className="border rounded-[4px]  border-[#F3921F] px-2 py-1 "
              onClick={() => {
                if (i.type_voucher === 0) {
                  // navigate("/cart");
                  setCode(i.voucher.voucher_code);
                  setIsModalOpen(true);
                }
                if (i.type_voucher === 3) {
                  setId(i.id);
                  setIsModalOpen2(true);
                }
              }}
            >
              <p className="bg-gradient-to-r from-[#9C1F60] to-[#F3921F] bg-clip-text text-transparent text-sm font-medium">
                {i.type_voucher === 3
                  ? "Nhận quà"
                  : i.type_voucher === 0
                  ? "Sử dụng ngay"
                  : "Đã sử dụng"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full h-full px-3">
      <div className="mt-4">
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
      <ModalChooseVoucher
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          "Bạn muốn sử dụng voucher tại Cửa hàng hay sử dụng mua Online trên App?"
        }
        code={code}
      />
      <ModalRequest
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        setSelectedBranch={setSelectedBranch}
        selectedBranch={selectedBranch}
        dataBranch={dataBranch as any}
        id={id}
      />
    </div>
  );
};

export default ForMe;
