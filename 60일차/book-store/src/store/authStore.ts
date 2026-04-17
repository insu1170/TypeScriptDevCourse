import { create } from "zustand";

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

// isLoggedIn 판단
export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

// 로그인 시 토큰 세팅
const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// 로그아웃 시 토큰 삭제
export const removeToken = () => {
  localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState>((set) => ({
  // 초기값
  isLoggedIn: getToken() ? true : false,
  // 로그인 했을 때 true로 변경
  storeLogin: (token: string) => {
    set({ isLoggedIn: true });
    setToken(token);
  },
  // 로그아웃 시 false로 변경
  storeLogout: () => {
    set({ isLoggedIn: false });
    removeToken();
  },
}));
