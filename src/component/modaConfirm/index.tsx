import React, { useState } from "react";
import BottomSheet from "../bottomSheet/BottomSheet";
import Images from "../../static";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApis from "../../apis/auth.apis";
import { useAuth } from "../../context/authContext";
import voucherApi from "../../apis/voucher.apis";
import { toast } from "react-toastify";
interface IProps {
  id: number;
  point: number;
}
const ModalConfirm = React.forwardRef(
  (
    props: IProps,
    ref: React.Ref<{ setVisible: (visible: boolean) => void }>
  ) => {
    const [visible, setVisible] = React.useState<boolean>(false);
    React.useImperativeHandle(ref, () => {
      return {
        setVisible,
      };
    });
    const queryClient = useQueryClient();
    const exChangeVoucherMutation = useMutation({
      mutationFn: voucherApi.exChangeVoucher,
      onSuccess: (data) => {
        if (data.data.status) {
          setVisible(false);
          toast.success(data.data.message || "Đổi voucher thành công!");
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === "listVoucher",
          });
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === "listMyVoucherEndow",
          });
        } else {
        }
      },
      onError: (err) => {
        console.log("lõi", err);
      },
    });
    const handleExChange = () => {
      exChangeVoucherMutation.mutate({
        voucher_id: props.id,
      });
    };
    return (
      <BottomSheet isOpen={visible} setIsOpen={setVisible}>
        <div className="flex flex-col  gap-[10px] pb-10">
          <img
            src={Images.logoBaTot}
            className="w-[100px] h-[100px] object-contain self-center"
          />
          <p className="text-[#09121F] text-xl font-semibold text-center">
            Bạn cần xác nhận đổi voucher với: {props?.point} điểm
          </p>
          <div
            className="bg-[#01A850] rounded-[15px] py-[10px] w-[90%] self-center  mt-2"
            onClick={handleExChange}
          >
            <p className="text-white text-xs text-center">Xác nhận</p>
          </div>
        </div>
      </BottomSheet>
    );
  }
);

export default ModalConfirm;
