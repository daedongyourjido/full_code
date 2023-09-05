import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../../modules/layout/bar.js";
import InputField from "../../modules/components/inputField.js";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SettingContainer from "../setting/settingContainer.js";
import MainPageButton from "../main/mainPageButton.js";
import "./withdraw.css";

function WithdrawButton(props) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        marginTop: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#045369",
            color: "#045369",
            width: "32ch",
          }}
          onClick={() => {
            if (!props.id) props.setIdEmpty(true);
            else if (props.id !== sessionStorage.getItem("id")) {
              props.setWrongId(true);
              props.setIdEmpty(false);
            } else if (!props.pw) {
              props.setPwEmpty(true);
              props.setWrongId(false);
              props.setIdEmpty(false);
            } else {
              props.setWrongId(false);
              props.setIdEmpty(false);
              props.setPwEmpty(false);
              props.setChanged(true);

              localStorage.setItem(`${props.id}`, true);
              alert("탈퇴되었습니다");
              sessionStorage.clear();
              navigate("/");
            }
          }}
        >
          회원 탈퇴
        </Button>
      </Stack>
    </div>
  );
}

function Withdraw() {
  function WithdrawBox() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [idEmpty, setIdEmpty] = useState(false);
    const [pwEmpty, setPwEmpty] = useState(false);
    const [changed, setChanged] = useState(false);
    const [wrongId, setWrongId] = useState(false);

    return (
      <div>
        {changed ? (
          <div className="withdraw-box-done">
            <h1>탈퇴되었습니다</h1>
            <MainPageButton color="black" />
          </div>
        ) : (
          <div className="withdraw-box">
            <p style={{ color: "black", fontSize: "20px" }}>회원 탈퇴</p>
            <InputField setData={setId} label="아이디 재입력" type="text" />
            <InputField setData={setPw} label="비밀번호" type="password" />
            <WithdrawButton
              setPwEmpty={setPwEmpty}
              setIdEmpty={setIdEmpty}
              setChanged={setChanged}
              setWrongId={setWrongId}
              id={id}
              pw={pw}
            />
            {wrongId ? (
              <p className="input_error">아이디가 일치하지 않습니다</p>
            ) : (
              <p></p>
            )}
            {idEmpty ? (
              <p className="input_error">아이디를 입력해주세요</p>
            ) : (
              <p></p>
            )}
            {pwEmpty ? (
              <p className="input_error">비밀번호를 입력해주세요</p>
            ) : (
              <p></p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Bar setting={true} />
      <div className="withdraw-container">
        <SettingContainer component={WithdrawBox} menu="withdraw" />
      </div>
    </div>
  );
}

export default Withdraw;
