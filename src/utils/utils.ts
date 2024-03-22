import { AxiosError, isAxiosError } from "axios";
import HttpStatusCode from "./contanst/httpStatusCode.enum";

export function isAxiosUnauthorizedError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}
export const isUserLoggedIn = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    console.log("accessToken", accessToken);
    // Kiểm tra xem access token có tồn tại không
    return !!accessToken;
  } catch (error) {
    console.error("Error checking user login status:", error);
    return false;
  }
};
