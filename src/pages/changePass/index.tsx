import React, { useState } from "react";
import Header from "../../component/header";
import { useMutation } from "@tanstack/react-query";
import userApis from "../../apis/user.apis";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePass = () => {
  const navigate = useNavigate();
  const [passwordOld, setPasswordOld] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [typeShow, setTypeShow] = useState<boolean>(false);
  const [typeShow2, setTypeShow2] = useState<boolean>(false);
  const [typeShow3, setTypeShow3] = useState<boolean>(false);
  const togglePasswordOld = () => {
    setTypeShow(!typeShow);
  };
  const togglePasswordNew = () => {
    setTypeShow2(!typeShow2);
  };
  const togglePasswordConfirm = () => {
    setTypeShow3(!typeShow3);
  };

  const handleChangePass = async () => {
    if (!passwordOld.length || !newPassword.length || !confirmPassword.length) {
      toast.warning("Cần nhập đầy đủ thông tin");
      return;
    } else if (newPassword.length < 6) {
      toast.warning("Mật khẩu phải lớn hơn 6 ký tự");
      return;
    } else if (newPassword !== confirmPassword) {
      toast.warning("Mật khẩu không trùng khớp");
      return;
    } else {
      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("access_token");

        // Tạo formData
        const formData = new FormData();
        formData.append("password", passwordOld);
        formData.append("password_new", newPassword);
        formData.append("current_password", confirmPassword);
        formData.append("id", "1");
        // Cấu hình request
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request thay đổi mật khẩu
        const response = await axios.post(
          "http://nhanvien3tot.outtech.io.vn/api/changePassword",
          formData,
          config
        );
        console.log("response", response.data.code);
        // Xử lý response
        if (response.data.code === 200) {
          toast.warning(response.data.message);
          localStorage.removeItem("access_token");
          navigate("/");
        } else if (response.data.code === 400) {
          toast.success(response.data.message);
        } else {
          console.error("Thay đổi mật khẩu thất bại:", response.data);
        }
      } catch (error) {
        console.error("Lỗi khi thay đổi mật khẩu:", error);
      }
    }
  };
  return (
    <div className="w-full h-full">
      <Header title="Đổi mật khẩu" />
      <div>
        <div className="px-2 mt-3 ">
          <p className="mb-1 font-medium text-sm  ">Mật khẩu cũ</p>
          <div className="w-full flex   items-center justify-between border border-[#D9D9D9D9] rounded-[5px]">
            <input
              value={passwordOld}
              onChange={(text) => {
                setPasswordOld(text.target.value);
              }}
              type={typeShow ? "text" : "password"}
              placeholder="Nhập mật khẩu cũ"
              className=" flex-1  placeholder-[#333333]  text-[#333333] font-sm px-2 py-1 "
            />
            <button className=" px-4 text-gray-600" onClick={togglePasswordOld}>
              {typeShow ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="px-2 mt-3 ">
          <p className="mb-1 font-medium text-sm  ">Mật khẩu mới</p>
          <div className="w-full flex   items-center justify-between border border-[#D9D9D9D9] rounded-[5px]">
            <input
              value={newPassword}
              onChange={(text) => {
                setNewPassword(text.target.value);
              }}
              type={typeShow2 ? "text" : "password"}
              placeholder="Nhập mật khẩu mới"
              className=" flex-1  placeholder-[#333333]  text-[#333333] font-sm px-2 py-1 "
            />
            <button className=" px-4 text-gray-600" onClick={togglePasswordNew}>
              {typeShow2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="px-2 mt-3 ">
          <p className="mb-1 font-medium text-sm  ">Xác nhận khẩu mới</p>
          <div className="w-full flex   items-center justify-between border border-[#D9D9D9D9] rounded-[5px]">
            <input
              value={confirmPassword}
              onChange={(text) => {
                setConfirmPassword(text.target.value);
              }}
              type={typeShow3 ? "text" : "password"}
              placeholder="Nhập lại mật khẩu mới"
              className=" flex-1  placeholder-[#333333]  text-[#333333] font-sm px-2 py-1 "
            />
            <button
              className=" px-4 text-gray-600"
              onClick={togglePasswordConfirm}
            >
              {typeShow3 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className="flex flex-col  mt-5"
          onClick={() => {
            handleChangePass();
          }}
        >
          <div className=" bg-[#0DADA4] mx-auto self-center px-10 py-1 rounded-md">
            <p className="text-white font-medium text-[15px]">Cập nhật</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
