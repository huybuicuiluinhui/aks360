import React, { useEffect, useState } from "react";
import Header from "../../../component/header";
import Images from "../../../static";
import { useMutation, useQuery } from "@tanstack/react-query";
import addressApi from "../../../apis/address.apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddAdr = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelecteDistrict] = useState("");
  const [selectedWard, setSelecteWard] = useState("");
  const [adrDetail, setAdrDetail] = useState<string>("");
  const { data: listProv, isFetching: isFetching } = useQuery({
    queryKey: ["dataProv"],
    queryFn: () => addressApi.getListProvince(),
  });
  const { data: listDis, isFetching: isFetchingDis } = useQuery({
    queryKey: ["dataDis", selectedProvince],
    queryFn: () => addressApi.getListDistrict(Number(selectedProvince)),
  });
  const { data: listWard, isFetching: isFetchingWard } = useQuery({
    queryKey: ["dataWard", selectedDistrict],
    queryFn: () => addressApi.getListWard(Number(selectedDistrict)),
  });
  const addAdrMutation = useMutation({
    mutationFn: addressApi.addAdr,
    onSuccess: (data) => {
      toast.success(data.data.msg);
      navigate(-1);
    },
    onError: (err) => {
      console.log("lõi", err);
    },
  });

  const dataProv = listProv?.data.data;
  const dataDis = listDis?.data.data;
  const dataWard = listWard?.data.data;
  const handleProvinceChange = (event: any) => {
    setSelectedProvince(event.target.value);
  };
  const handleDistrictChange = (event: any) => {
    setSelecteDistrict(event.target.value);
  };
  const handleWardChange = (event: any) => {
    setSelecteWard(event.target.value);
  };
  const handleAdrDetail = (event: any) => {
    setAdrDetail(event.target.value);
  };
  const HandleAddAdr = () => {
    if (
      selectedDistrict === "Chọn Quận, Huyện" ||
      selectedProvince === "Chọn Tỉnh, TP" ||
      selectedWard === "Chọn Phường, Xã" ||
      adrDetail === ""
    ) {
      toast.warning("Bạn cần điền đầy đủ thông tin");
    } else {
      addAdrMutation.mutate({
        province_id: selectedProvince,
        district_id: selectedDistrict,
        ward_id: selectedWard,
        address_detail: adrDetail,
      });
    }
  };

  return (
    <div className="w-screen h-full">
      <Header title="Thêm mới địa chỉ" />
      <div className="w-full">
        <select
          className=" w-[95%] border border-[#D9D9D9D9] rounded-md mt-3 mx-3 py-2 px-4  items-center justify-between pe-9 block  border-gray-200  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
          onChange={handleProvinceChange} // Sự kiện khi giá trị được chọn thay đổi
          value={selectedProvince}
        >
          <option className="text-sm text-[#333333] font-normal">
            Chọn Tỉnh, TP
          </option>
          {!!dataProv &&
            dataProv.length &&
            dataProv?.map((item, index) => {
              return (
                <option
                  value={item.ProvinceID}
                  className="text-sm text-[#333333] font-normal"
                  key={index}
                >
                  {item.ProvinceName}
                </option>
              );
            })}
        </select>
        <select
          className=" w-[95%] border border-[#D9D9D9D9] rounded-md mt-3 mx-3 py-2 px-4  items-center justify-between pe-9 block  border-gray-200  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
          onChange={handleDistrictChange} // Sự kiện khi giá trị được chọn thay đổi
          value={selectedDistrict}
        >
          <option className="text-sm text-[#333333] font-normal">
            Chọn Quận, Huyện
          </option>
          {!!dataDis &&
            dataDis.length &&
            dataDis?.map((item, index) => {
              return (
                <option
                  value={item.DistrictID}
                  className="text-sm text-[#333333] font-normal"
                  key={index}
                >
                  {item.DistrictName}
                </option>
              );
            })}
        </select>
        <select
          className=" w-[95%] border border-[#D9D9D9D9] rounded-md mt-3 mx-3 py-2 px-4  items-center justify-between pe-9 block  border-gray-200  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
          onChange={handleWardChange} // Sự kiện khi giá trị được chọn thay đổi
          value={selectedWard}
        >
          <option className="text-sm text-[#333333] font-normal">
            Chọn Phường, Xã
          </option>
          {!!dataWard &&
            dataWard.length &&
            dataWard?.map((item, index) => {
              return (
                <option
                  value={item.id}
                  className="text-sm text-[#333333] font-normal"
                  key={index}
                >
                  {item.WardName}
                </option>
              );
            })}
        </select>
        <textarea
          cols={Math.floor(windowWidth / 10)}
          rows={5} // Số hàng
          onChange={handleAdrDetail}
          placeholder="Địa chỉ cụ thể"
          value={adrDetail}
          className={`border text-sm text-[#333333] font-normal placeholder:text-[#333333] border-[#D9D9D9D9] rounded-md mt-3 mx-3 py-2 px-4 w-[94%]`}
        />
        <div className="flex flex-row  items-center gap-4 float-right mr-5">
          <p className="text-[15px] font-medium text-[#333333]">
            Đặt làm mặc định{" "}
          </p>
          <label className="inline-flex items-center cursor-pointer border rounded-full">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <div className="h-[12%]"></div>
      <div className="fixed bottom-[0%] w-full flex flex-col bg-white h-[10%] items-center justify-center">
        <div
          className="bg-[#0DADA4]   w-fit px-20 py-2 rounded-md"
          onClick={() => {
            HandleAddAdr();
          }}
        >
          <p className="text-sm text-white font-normal">Lưu</p>
        </div>
      </div>
    </div>
  );
};

export default AddAdr;
