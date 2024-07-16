import React, { useState } from "react";
import Header from "../../component/header";
import Images from "../../static";
import { useMutation, useQuery } from "@tanstack/react-query";
import orderApis from "../../apis/order.apis";
import { formatNumber } from "../../utils";
import moment from "moment";
import Modal from "./modal";
import rateApis from "../../apis/rate.api";
import ModalOrder from "./modal/modalOrder";
import { toast } from "react-toastify";

const Rate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenOrder, setIsModalOpenOrder] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<number>(0);
  const [ratingOrder, setRatingOrder] = useState(0);
  const [hoverOrder, setHoverOrder] = useState(0);
  const [reviewOrder, setReviewOrder] = useState("");
  const [selectedBranchOrder, setSelectedBranchOrder] = useState<number>(0);
  const [orderChoose, setOrderChoose] = useState<string>("");
  const [type, setType] = useState<boolean>(false);
  const { data: listBranch } = useQuery({
    queryKey: ["listBranchFetch"],
    queryFn: () => orderApis.getListBranch(),
  });
  const { data: listOrderOFf } = useQuery({
    queryKey: ["listOrderOFfFetch"],
    queryFn: () => orderApis.getOrderOff(),
  });
  const dataOrderOff = listOrderOFf?.data.data;
  const handleSelectedBranhd = (event: any) => {
    setSelectedBranch(event.target.value);
  };
  const starImages = {
    active: Images.starActive,
    inactive: Images.starNon,
  };

  const dataBranch = listBranch?.data.data;

  const handleOrderChoose = (code: string) => {
    setIsModalOpenOrder(true);
    setOrderChoose(code);
  };
  const ratingMutation = useMutation({
    mutationFn: rateApis.rating,
    onSuccess: (data) => {},
    onError: (err) => {
      console.log("lõi", err);
    },
  });
  const handleRating = () => {
    if (!selectedBranch || !review || !rating || selectedBranch === 0) {
      toast.warning("Bạn cần điền đầy đủ thông tin để đánh giá");
      return;
    }
    if (rating >= 4) {
      setType(true);
    }
    if (rating < 4) {
      setType(false);
    }
    ratingMutation.mutate(
      {
        id_branch: selectedBranch,
        note: review,
        star: rating,
        code: undefined,
      },
      {
        onSuccess: () => {
          setIsModalOpen(true);
          setReview("");
          setRating(0);
          setSelectedBranch(0);
        },
      }
    );
  };
  const handleRatingOrder = () => {
    if (
      !selectedBranchOrder ||
      !reviewOrder ||
      !ratingOrder ||
      selectedBranchOrder === 0
    ) {
      toast.warning("Bạn cần điền đầy đủ thông tin để đánh giá");
      return;
    }
    if (ratingOrder >= 4) {
      setType(true);
    }
    if (ratingOrder < 4) {
      setType(false);
    }
    ratingMutation.mutate(
      {
        id_branch: selectedBranchOrder,
        note: reviewOrder,
        star: ratingOrder,
        code: orderChoose,
      },
      {
        onSuccess: (data) => {
          setIsModalOpen(true);
          setIsModalOpenOrder(false);
          setReviewOrder("");
          setRatingOrder(0);
          setSelectedBranchOrder(0);
        },
        onError: (err) => {
          console.log("lõi", err);
        },
      }
    );
  };
  return (
    <div>
      <Header title="Đánh giá" />
      <div className="p-3">
        <p className="text-base font-semibold mb-2">Đánh giá ngay</p>
        <div className="flex items-center mb-4 justify-center ">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index} className="cursor-pointer">
                <input
                  type="radio"
                  style={{ display: "none" }}
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <img
                  src={
                    ratingValue <= (hover || rating)
                      ? starImages.active
                      : starImages.inactive
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  alt={`Star ${ratingValue}`}
                  className="w-8 h-8 mr-1"
                />
              </label>
            );
          })}
        </div>
        <div className="h-fit relative">
          <p className="absolute z-10 -top-[10%] bg-white ml-3 text-[#636D79]  text-sm font-normal">
            Hãy nói vấn đề bạn gặp phải
          </p>
          <textarea
            placeholder=""
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full h-24 p-2 border border-blue-500 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          className=" w-[100%] border border-[#D9D9D9D9] rounded-md mt-3  py-2 px-4  items-center justify-between pe-9 block  border-gray-200  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
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
        <p className="text-center text-[#666666] text-sm  mt-4 mx-10 italic ">
          Hãy gửi những đánh giá của bạn cho 3 Tốt, 3 Tốt vô cùng cảm ơn!
        </p>
        <div
          className=" w-[95%] bg-[#22BD2B] flex items-center justify-center mx-auto rounded-lg py-1 my-4"
          onClick={() => {
            handleRating();
          }}
        >
          <p className="text-white text-lg font-semibold">Gửi đánh giá</p>
        </div>
        <p className="text-base font-semibold mb-2 ">
          Đánh giá theo đơn hàng tại điểm bán
        </p>
        <div className="flex justify-between items-center px-3 mt-3">
          <div className="flex gap-2 items-center">
            <p className="text-xs text-[#828282] font-light">Sắp xếp</p>
            <img
              src={Images.iconShowmore}
              alt=""
              className="w-[16px] h-[16px] object-contain"
            />
          </div>
          <img
            src={Images.iconFilter}
            alt=""
            className="w-[17px] h-[16px] object-contain"
          />
        </div>
        {!!dataOrderOff &&
          !!dataOrderOff.length &&
          dataOrderOff.map((i, e) => {
            return (
              <div className="px-3 w-full mt-3" key={e}>
                <div className="flex gap-1 w-full ">
                  <img
                    src={Images.iconOrder}
                    alt=""
                    className="w-[13px] h-[16px] object-contain"
                  />
                  <div className="w-full mr-[10%] gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#666666] font-normal">
                        Đơn hàng : {i.code}
                      </p>
                      <div
                        className="bg-[#13971A] rounded-md py-1 px-3"
                        onClick={() => {
                          handleOrderChoose(i.code);
                        }}
                      >
                        <p className="text-white text-xs font-bold">Đánh giá</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#FF5E3A] font-semibold">
                      (đ) {formatNumber(i.totalPayment)}
                    </p>
                    <p className="text-sm text-[#666666] font-light mb-2">
                      {moment(i.createdDate).format("hh:mm:ss DD/MM/YYYY")}
                    </p>
                    {i.invoiceDetails.map((item, index) => {
                      return (
                        <div
                          className="flex border-dashed border rounded-md border-[#F9A671] p-1 pr-2 mb-2"
                          key={index}
                        >
                          <img
                            src={Images.imgTest}
                            alt=""
                            className="w-[62px] h-[65px] object-cover rounded-[10px]"
                          />
                          <div className="ml-2 w-full flex flex-col gap-[1px]">
                            <div className="flex items-center justify-between">
                              <p className="text-[#373943] text-[10px] font-medium line-clamp-1 flex-1">
                                {item?.productName}{" "}
                              </p>
                              <p className="text-[#EE0D79] text-xs font-semibold ml-2">
                                {formatNumber(item?.price)} đ
                              </p>
                            </div>
                            <p className="text-[10px] text-[#828BAC] font-normal ">
                              SKU : {item?.tradeMarkId}
                            </p>
                            <p className="text-[10px] text-[#828BAC]  font-normal">
                              Số lượng : {item?.quantity} sản phẩm
                            </p>
                            <p className="text-[10px] text-[#373943] font-medium">
                              Tổng tiền :{" "}
                              <span className="text-[#EE0D79] font-normal">
                                {formatNumber(item.subTotal)} đ
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          type === false
            ? "Chúng tôi rất xin lỗi vì tạo ra trải nghiệm không tốt cho bạn"
            : "Cảm ơn vì đánh giá của bạn"
        }
        content={
          type === false
            ? "Bộ phận chăm sóc khách hàng đã nắm được phải hồi của bạn, chúng tôi sẽ liên hệ sớm nhất với bạn, Cảm ơn vì đã phản hồi!"
            : "Chúng tôi sẽ tiếp tục cải thiện để tạo trải nghiệm chuyên nghiệp nhất cho khách hàng. Xin cảm ơn!"
        }
      />
      <ModalOrder
        isOpen={isModalOpenOrder}
        onClose={() => setIsModalOpenOrder(false)}
        dataBranch={dataBranch}
        handleRatingOrder={handleRatingOrder}
        hover={hoverOrder}
        note={reviewOrder}
        selectedBranch={selectedBranchOrder}
        rating={ratingOrder}
        setHover={setHoverOrder}
        setRating={setRatingOrder}
        setNote={setReviewOrder}
        setSelectedBranch={setSelectedBranchOrder}
      />
    </div>
  );
};

export default Rate;
