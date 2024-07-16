// import axios, { AxiosInstance, AxiosError } from "axios";
// import { API_URL } from "./contanst";

// class Http {
//   instance: AxiosInstance;

//   constructor() {
//     this.instance = axios.create({
//       baseURL: API_URL,
//       timeout: 40000,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // Interceptor cho request
//     this.instance.interceptors.request.use(
//       (config) => {
//         // Lấy token từ Local Storage và thêm vào header của mỗi request
//         const accessToken = localStorage.getItem("access_token");
//         if (accessToken) {
//           config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     // Interceptor cho response
//     this.instance.interceptors.response.use(
//       (response) => {
//         // Xử lý response nếu cần
//         return response;
//       },
//       (error: AxiosError) => {
//         // Xử lý lỗi Unauthorized (401)
//         if (error.response?.status === 401) {
//           // Xóa token từ Local Storage khi gặp lỗi 401 (Unauthorized)
//           localStorage.removeItem("access_token");
//           // Chuyển hướng đến trang đăng nhập hoặc hiển thị thông báo lỗi
//           // Ví dụ:
//           // window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
//           // Hoặc hiển thị thông báo lỗi
//           console.error("Unauthorized request. Redirecting to login page...");
//         }
//         return Promise.reject(error);
//       }
//     );
//   }
// }

// const http = new Http().instance;

// export default http;
import axios, { AxiosInstance, AxiosError } from "axios";
import { API_URL } from "./contanst";
import { SuccessResponse } from "../types/auth.type";
import { toast } from "react-toastify";
interface IRes {
  status: boolean;
  mesage: string;
  code?: number;
}
class Http {
  withToken: AxiosInstance;
  withoutToken: AxiosInstance;

  constructor() {
    // Instance dành cho các API cần token
    this.withToken = axios.create({
      baseURL: API_URL,
      timeout: 40000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor cho request của instance withToken
    this.withToken.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor cho response của instance withToken
    this.withToken.interceptors.response.use(
      (response: any) => {
        console.log("response", response.data.status);
        if (response.data.code === 400) {
          localStorage.removeItem("access_token");
          window.location.href = "/"; // Chuyển hướng về trang chủ
        } else if (response.data.status === "Authorization Token not found") {
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          const { status, data }: any = error.response;

          if (status === 401) {
            localStorage.removeItem("access_token");
            console.error("Unauthorized request. Redirecting to login page...");
          }
          // Xử lý mã lỗi khác
          if (
            status === 400 &&
            data?.message === "Bạn đã hết hạn truy cập mời đăng nhập lại"
          ) {
            toast.warning("Bạn cần đăng nhập lại");
            // Xử lý yêu cầu đăng nhập lại
            // Ví dụ: Hiển thị thông báo modal
            // showModal("Session Expired", "Your session has expired. Please log in again.");
            // Hoặc chuyển hướng đến trang đăng nhập
            // window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );

    // Instance dành cho các API không cần token
    this.withoutToken = axios.create({
      baseURL: API_URL,
      timeout: 40000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const http = new Http();

export const httpWithToken = http.withToken;
export const httpWithoutToken = http.withoutToken;
