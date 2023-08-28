import React, { useState } from "react";
import InputField from "../../modules/components/inputField.js";
import ResetPwButton from "./resetPwButton.js";
import LoginPageButton from "../login/loginPageButton.js";
import "./resetPw.css";
import Bar from "../../modules/layout/bar.js";

function ResetPwBox() {
  const [pw, setPw] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [pwOld, setPwOld] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [empty, setEmpty] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [pwDup, setPwDup] = useState(false);
  const [changed, setChanged] = useState(false);

  return (
    <div>
      {changed ? (
        <div className="resetpw-box" style={{ color: "black" }}>
          <h1 style={{ fontSize: "3vh" }}>비밀번호 변경이 완료되었습니다</h1>
          <LoginPageButton borderColor="black" color="black" />
        </div>
      ) : (
        <div className="resetpw-box">
          <p style={{ color: "black", fontSize: "20px" }}>비밀번호 초기화</p>
          <InputField setData={setPw} label="비밀번호" type="password" />
          <InputField
            setData={setPwCheck}
            label="비밀번호 재확인"
            type="password"
          />
          <ResetPwButton
            pw={pw}
            pwCheck={pwCheck}
            pwOld={pwOld}
            setPwDup={setPwDup}
            changed={changed}
            setChanged={setChanged}
            setEmpty={setEmpty}
          />
          {empty ? (
            <p style={{ color: "red", textAlign: "center", fontSize: "1vh" }}>
              모두 입력해주세요
            </p>
          ) : (
            <p></p>
          )}
          {pwDup ? (
            <p style={{ color: "red", textAlign: "center", fontSize: "1vh" }}>
              비밀번호가 일치하지 않습니다
            </p>
          ) : (
            <p></p>
          )}
        </div>
      )}
    </div>
  );
}

function ResetPw() {
  return (
    <div className="root" style={{ display: "flex", flexDirection: "column" }}>
      <Bar main={false} />
      <div className="resetpw-container">
        <ResetPwBox />
      </div>
    </div>
  );
}

export default ResetPw;
