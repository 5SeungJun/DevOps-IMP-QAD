import Input from "./Input.jsx";
import Button from "./Button.jsx";
import api, { setAuthToken } from "../api/axiosInstance.js";
import { useState } from "react";
import "../styles/logincard.css";
import "../styles/Input.css";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  // 로그인 버튼 클릭 시 실행
  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ 폼의 기본 제출(새로고침) 동작 막기

    try {
      const response = await api.post("/portal/auth/login", {
        userId: id,
        password: pw,
      });

      // 서버에서 받은 JWT 토큰
      const token = response.data.token; // 실제 키 이름 확인 필요 (accessToken 등으로 바뀔 수도 있음)

      // axios 기본 헤더에 토큰 설정
      setAuthToken(token);

      // 로컬 스토리지에 저장 (새로고침해도 유지)
      localStorage.setItem("token", token);

      console.log("✅ 로그인 응답:", response.data);
      alert("로그인 성공!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error(
          "서버 응답 오류:",
          error.response.status,
          error.response.data
        );
      } else {
        console.error("네트워크 오류:", error.message);
      }
      alert("로그인 실패. 콘솔을 확인하세요.");
    }
  };

  return (
    <div className="login">
      <h2 className="login-title">Sign In</h2>

      <form onSubmit={handleLogin} className="login-form">
        ID
        <Input
          placeholder="Username or Email"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        PW
        <Input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <Button text="Sign In" type="submit" />
      </form>
    </div>
  );
};

export default Login;
