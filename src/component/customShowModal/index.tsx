import React, { useState } from "react";
import BottomSheet from "../bottomSheet/BottomSheet";
import Images from "../../static";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApis from "../../apis/auth.apis";
import { useAuth } from "../../context/authContext";
import ModalFollowOA from "../modalFollowOA";
interface IRefModalMarket {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IProps {
  followOA: React.RefObject<IRefModalMarket>;
}
const ModalLogin = React.forwardRef(
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
    const { setIsLoggedIn } = useAuth();
    const queryClient = useQueryClient();
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const loginMutation = useMutation({
      mutationFn: authApis.login,
      onSuccess: (data) => {
        if (data.data.status && data.data.data.access_token) {
          localStorage.setItem("access_token", data.data.data.access_token);
          setVisible(false);
          props.followOA.current?.setVisible(true);
          setIsLoggedIn(true);
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === "dataInfoFetch",
          });

          // window.location.reload();
        } else {
        }
      },
      onError: (err) => {
        console.log("lõi", err);
      },
    });
    const handleLogin = () => {
      loginMutation.mutate({
        phone,
        password,
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
            Tính năng cần kích hoạt tài khoản
          </p>
          <p className="text-center text-xs text-[#06070C] font-normal">
            Cho phép Hệ thống sữa 3 Tốt xác minh số điện thoại để có thể sử dụng
            đầy đủ tính năng của app. Điều này giúp tăng trải nghiệm của quý
            khách hàng
          </p>
          <input
            type="text"
            placeholder="Nhập số điện thoại..."
            value={phone}
            onChange={(e: any) => setPhone(e?.target?.value)}
            className="rounded-[5px] border  border-[#dedede] px-2 py-[4px] w-[90%] self-center placeholder:text-[#333] text-[#333] text-[15px] font-medium"
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e: any) => setPassword(e?.target?.value)}
            className="rounded-[5px] border  border-[#dedede] px-2 py-[4px] w-[90%] self-center placeholder:text-[#333] text-[#333] text-[15px] font-medium"
          />
          <div
            className="bg-[#01A850] rounded-[15px] py-[10px] w-[90%] self-center  mt-2"
            onClick={handleLogin}
          >
            <p className="text-white text-xs text-center">ĐĂNG NHẬP</p>
          </div>
        </div>
      </BottomSheet>
    );
  }
);

export default ModalLogin;
