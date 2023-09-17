import React from "react";
import { useNavigate } from "react-router-dom";
import MenuMap from "@modules/layout/menuMap.js";
import MainPageButton from "../main/mainPageButton";

function Text() {
  const navigate = useNavigate();
  return (
    <h1
      style={{
        paddingBottom: "30px",
        cursor: "pointer",
        width: "200px",
        marginLeft: "30px",
      }}
      onClick={() => {
        navigate("/");
      }}
    >
      대동유어지도
    </h1>
  );
}

function VerifyBox() {
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
                fontSize: "20px",
                marginTop: "100px",
              }}
            >
              인증에 성공하였습니다.
            </h1>
            <MainPageButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function Verify() {
  return (
    <div className="root">
      <div className="bar">
        <Text />
      </div>

      <MenuMap component={<VerifyBox />} />
    </div>
  );
}

export default Verify;
