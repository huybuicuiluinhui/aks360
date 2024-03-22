// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { isUserLoggedIn } from "../utils/utils";
import { IUser } from "../types/user.type";

interface AuthState {
  user: IUser | null; // Thêm trường user vào AuthState
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void; // Sửa đổi định dạng của setIsLoggedIn
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>; // Thêm setUser vào AuthState
}

const defaultAuthState: AuthState = {
  isLoggedIn: false,
  user: null, // Khởi tạo user là null
  setIsLoggedIn: () => {},
  setUser: () => {},
};

const AuthContext = createContext(defaultAuthState);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null); // Khởi tạo user là IUser hoặc null
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isUserLoggedIn();
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
