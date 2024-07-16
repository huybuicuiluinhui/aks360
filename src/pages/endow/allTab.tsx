import React, { useState } from "react";
import Images from "../../static";
import { useQuery } from "@tanstack/react-query";
import voucherApi from "../../apis/voucher.apis";
import ItemVoucher from "../../component/itemVoucher";
import ModalConfirm from "../../component/modaConfirm";
interface IRefModalMarket {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const AllTab = () => {
  const refModalLogin = React.useRef<IRefModalMarket>(null);
  const { data: listVoucher, isFetching } = useQuery({
    queryKey: ["listVoucher"],
    queryFn: () => voucherApi.getListVoucher(),
  });
  const data = listVoucher?.data.data;
  const [idChoose, setIdChoose] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);

  return (
    <div className="w-full h-full px-3">
      <div className="flex items-center justify-between">
        <img
          src={Images.iconBatot}
          alt=""
          className="w-[97px] h-[27px] object-contain"
        />
        <div className="flex items-center   w-fit p-1 gap-2 my-4 rounded-md">
          <img
            src={Images.iconTicket}
            alt=""
            className="w-[24px] h-[24px] object-contain"
          />
          <p className="text-[#00A950] text-lg font-medium">
            Danh sách voucher
          </p>
        </div>
      </div>
      <div>
        {!!data &&
          !!data.length &&
          data.map((i, e) => {
            if (i.type === 3) {
              return;
            } else {
              return (
                <div key={e}>
                  <ItemVoucher
                    i={i}
                    setPoint={setPoint}
                    setIdChoose={setIdChoose}
                    refModalLogin={refModalLogin}
                  />
                </div>
              );
            }
          })}
      </div>
      <div className="flex items-center justify-between">
        <img
          src={Images.iconBatot}
          alt=""
          className="w-[97px] h-[27px] object-contain"
        />
        <div className="flex items-center   w-fit p-1 gap-2 my-4 rounded-md">
          <img
            src={Images.iconTicket}
            alt=""
            className="w-[24px] h-[24px] object-contain"
          />
          <p className="text-[#00A950] text-lg font-medium">Danh sách quà</p>
        </div>
      </div>
      <div>
        {!!data &&
          !!data.length &&
          data.map((i, e) => {
            return (
              <div key={e}>
                {i.type === 3 && (
                  <ItemVoucher
                    i={i}
                    setPoint={setPoint}
                    setIdChoose={setIdChoose}
                    refModalLogin={refModalLogin}
                  />
                )}
              </div>
            );
          })}
      </div>
      <ModalConfirm ref={refModalLogin} id={idChoose} point={point} />
    </div>
  );
};

export default AllTab;
