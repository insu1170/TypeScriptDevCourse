import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { SignupProps } from "@/pages/Signup";
import { useState } from "react";

export const useAuth = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  // ----상태----
  // zustand로 관리하고 있는 상태 불러오기
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();

  // ----메소드----
  // 로그인
  const userLogin = (data: LoginProps) => {
    login(data).then(
      (res) => {
        console.log("토큰 저장 하니", res, res.token);
        storeLogin(res.token);

        showAlert("로그인 완료되었습니다.");
        navigate("/");
      },
      (error) => {
        showAlert("로그인에 실패했습니다!");
      },
    );
  };
  // 회원가입
  const userSignup = (data: SignupProps) => {
    signup(data).then((res) => {
      // 성공
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    });
  };
  // 비밀번호 변경 요청
  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    });
  };
  const [resetRequested, setResetRequested] = useState(false);
  // 비밀번호 변경
  const userResetRequest = (data: SignupProps) => {
    resetRequest(data).then(() => {
      // 요청이 성공할 경우 비밀번호 입력 폼 true로!
      setResetRequested(true);
    });
  };

  // 리턴
  return {
    userLogin,
    userSignup,
    userResetPassword,
    userResetRequest,
    resetRequested,
  };
};
