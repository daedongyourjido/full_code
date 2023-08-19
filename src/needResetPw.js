import React from "react";
import { useNavigate } from "react-router-dom";
import MenuMap from "./menuMap.js";

function Text() {
  const navigate = useNavigate();
  return (
    <h1
      style={{ paddingBottom: "30px", cursor: "pointer", width: "200px" }}
      onClick={() => {
        navigate("/");
      }}
    >
      대동유어지도
    </h1>
  );
}

function NeedResetPwBox() {
  return (
    <div style={{ width: "380px" }}>
      <div
        style={{
          paddingTop: "0px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "400px",
          backgroundColor: "white",
          borderRadius: "2%",
          boxShadow: "0px 0px 80px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "45px",
            }}
          >
            <h1
              style={{
                color: "#000000",
                margin: "20px",
                fontSize: "15px",
                marginTop: "100px",
              }}
            >
              이메일로 비밀번호 재설정 링크를 전송했습니다
            </h1>
            <a href="/" style={{ fontSize: "15px", color: "#045369" }}>
              메인으로 이동하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function NeedResetPw() {
  return (
    <div className="root">
      <div className="bar">
        <Text />
      </div>

      <MenuMap component={<NeedResetPwBox />} />
    </div>
  );
}

export default NeedResetPw;
