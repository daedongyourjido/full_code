import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpPageButton from "../signup/signupPageButton.js";
import MenuMap from "../../modules/layout/menuMap.js";
import Button from "@mui/material/Button";
import LoginButton from "./loginButton.js";
import InputField from "../../modules/components/inputField.js";
import "./login.css";
import Bar from "../../modules/layout/bar.js";

function FindPwPageButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: "#045369",
        color: "#045369",
        width: 150,
        height: 20,
        fontSize: 10,
      }}
      onClick={() => {
        navigate("/find");
      }}
    >
      비밀번호를 잊으셨나요?
    </Button>
  );
}

function LoginBox() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [empty, setEmpty] = useState(false);

  return (
    <div className="login-box-css">
      <div className="login-upper-box">
        <h1 style={{ color: "#000000" }}>대동유어지도</h1>
        <InputField setData={setId} label="이메일" type="text" />
        <InputField setData={setPw} label="비밀번호" type="password" />
        {empty ? <p className="input_error">모두 입력해주세요</p> : <p></p>}
        <LoginButton setEmpty={setEmpty} id={id} pw={pw} />
        <div className="gap" />
        <FindPwPageButton />
      </div>

      <div className="login-lower-box">
        <p style={{ color: "gray", fontSize: "13px", marginRight: "10px" }}>
          or
        </p>
        <SignUpPageButton />
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="root">
      <Bar main={true} />
      <MenuMap component={<LoginBox />} />
    </div>
  );
}

export default Login;
