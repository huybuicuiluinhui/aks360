import React, { useEffect, useLayoutEffect, useState } from "react";
import Images from "../../static";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";
import BottomSheet2 from "../bottomSheet/BottomSheet2";
import { Helmet } from "react-helmet";
import BottomSheet from "../bottomSheet/BottomSheet";
interface IProps {}
const ModalFollowOA = React.forwardRef(
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
    // const loginMutation = useMutation({
    //   mutationFn: authApis.login,
    //   onSuccess: (data) => {
    //     if (data.data.status && data.data.data.access_token) {
    //       localStorage.setItem("access_token", data.data.data.access_token);
    //       setVisible(false);
    //       setIsLoggedIn(true);
    //       queryClient.invalidateQueries({
    //         predicate: (query) => query.queryKey[0] === "dataInfoFetch",
    //       });

    //     } else {
    //     }
    //   },
    //   onError: (err) => {
    //     console.log("lõi", err);
    //   },
    // });
    const handleFollow = () => {
      setVisible(false);
      //   loginMutation.mutate({
      //     phone,
      //     password,
      //   });
    };

    return (
      <BottomSheet isOpen={visible} setIsOpen={setVisible}>
        <div className="flex flex-col  gap-[10px] pb-10">
          <img
            src={Images.logoBaTot}
            className="w-[100px] h-[100px] object-contain self-center"
          />
          <p className="text-[#09121F] text-xl font-semibold text-center">
            Hãy quan tâm Zalo OA của 3 ốt để tiếp tục
          </p>
          <p className="text-center text-xs text-[#06070C] font-normal">
            Chúng tôi cần bạn quan tâm Zalo OA để thực hiện gửi các thông tin ưu
            đãi và chương trình đặc biệt của 3 Tốt
          </p>
          <iframe
            width="100%"
            height={80}
            // style={{
            //   maxWidth: 640,
            //   width: "100%",
            //   overflow: "auto",
            //   margin: 0,
            //   padding: 0,
            // }}
            src="/followHTML.html"
            className="w-full  justify-center items-center  "
          />
          <div
            className="bg-[#01A850] rounded-[15px] py-[10px] w-full self-center -mt-4"
            onClick={() => {
              setVisible(false);
            }}
          >
            <p className="text-white text-xs text-center">Đóng</p>
          </div>
        </div>
      </BottomSheet>
    );
  }
);

export default ModalFollowOA;
