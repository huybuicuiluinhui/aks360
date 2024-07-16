import React, { useState } from "react";
import Images from "../../static";
import orderApis from "../../apis/order.apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IBranch } from "../../types/order.type";
import voucherApi from "../../apis/voucher.apis";
import { toast } from "react-toastify";

interface ModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  setSelectedBranch: React.Dispatch<React.SetStateAction<number>>;
  selectedBranch: number;
  dataBranch: IBranch[];
}

const ModalRequest = ({
  id,
  isOpen,
  onClose,
  setSelectedBranch,
  dataBranch,
  selectedBranch,
}: ModalProps) => {
  const { data, refetch } = useQuery({
    queryKey: ["checkVoucherFetch", id],
    queryFn: () => voucherApi.checkVoucher(id),
  });
  const check = data?.data.code;
  const rendeemMutaion = useMutation({
    mutationFn: voucherApi.rendeem,
    onSuccess: (data) => {
      refetch();
      toast.success(data?.data?.mesage);
      onClose();
    },
    onError: (err) => {
      console.log("lõi", err);
    },
  });
  const checkDoneMutation = useMutation({
    mutationFn: voucherApi.checkDone,
    onSuccess: (data) => {
      console.log("res", data.data);
      refetch();
      onClose();

      toast.success(data?.data?.mesage);
    },
    onError: (err) => {
      console.log("lõi", err);
    },
  });
  if (!isOpen) return null;
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const handleSelectedBranhd = (event: any) => {
    setSelectedBranch(event.target.value);
  };
  const handleSend = () => {
    rendeemMutaion.mutate({
      id_branch: String(selectedBranch),
      id_voucher_cus: String(id),
    });
  };
  const handleConfirm = () => {
    checkDoneMutation.mutate(id);
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative flex flex-col">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <img
            src={Images.iconCloseBg}
            alt=""
            className="w-[50px] h-[50px] object-contain"
          />
        </button>
        <div className="flex justify-center mb-1">
          <img
            src={Images.logoBaTot}
            alt="Logo"
            className="w-[119px] h-auto object-contain"
          />
        </div>
        <h2 className="text-lg font-bold text-center mb-2">
          Cảm ơn vì đã đồng hành cùng 3 Tốt,
        </h2>
        <p className="text-[20px] text-black text-center  mb-2">
          HÃY CHỌN CHI NHÁNH ĐỂ NHẬN QUÀ
        </p>
        <select
          className=" w-[100%] border border-[#D9D9D9D9] rounded-md mt-3  py-2 px-4  items-center justify-between pe-9 block  border-gray-200  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none outline-none  "
          onChange={handleSelectedBranhd} // Sự kiện khi giá trị được chọn thay đổi
          value={selectedBranch}
        >
          <option className="text-sm text-[#333333] font-normal">
            Chọn chi nhánh
          </option>
          {!!dataBranch &&
            dataBranch.length &&
            dataBranch?.map((item, index) => {
              return (
                <option
                  value={item.branch_kiotviet_id}
                  className="text-sm text-[#333333] font-normal"
                  key={index}
                >
                  {item.address}
                </option>
              );
            })}
        </select>
        {!!check && check === 200 ? (
          <div
            className="flex item-center justify-center gap-2 bg-[#22BD2B] px-2 py-2 rounded-lg w-[90%] mx-auto mt-3 "
            onClick={() => {
              handleSend();
            }}
          >
            <p className="text-white font-semibold tex-base">
              Gửi yêu cầu nhận quà
            </p>
          </div>
        ) : (
          <div
            className="flex item-center justify-center gap-2 bg-[#224DBD] px-2 py-2 rounded-lg w-[90%] mx-auto mt-3 "
            onClick={() => {
              handleConfirm();
            }}
          >
            <p className="text-white font-semibold tex-base">
              Tôi đã nhận được quà
            </p>
          </div>
        )}

        <p className="text-gray text-base text-center mt-4">
          Bộ phận chăm sóc khách hàng{" "}
          <span className="text-black font-bold">3 Tốt, Kiểm duyệt</span> và{" "}
          <span className="text-black font-bold">
            Xử lý điều chuyển quà tặng theo cơ sở bạn đã đăng ký Vui lòng đợi.
          </span>
        </p>
        <div className="flex justify-center mt-4 gap-1">
          <img
            src={Images.logoBaTot}
            alt=""
            className=" w-6 h-6 object-contain"
          />
          <p className="flex items-center text-sm text-gray-600 font-bold  ">
            Trạng thái:
            <span className="text-[#97A405] text-base">
              {!!check && check === 200 ? "ĐANG XỬ LÝ" : "CHỜ NHẬN QUÀ"}{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalRequest;
