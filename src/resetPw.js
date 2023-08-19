import React, { useState } from "react";
import ChangePwField from "./material/changePwField.js";
import ChangePwCheckField from "./material/changePwCheckField.js";
import ChangePwCheckErrorField from "./material/changePwCheckErrorField.js";
import ChangePwErrorField from "./material/changePwErrorField.js";
import ChangePwButton from "./material/resetPwButton.js";
import Bar from "./barDefault.js";

function ResetPwBox() {
  const [pw, setPw] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [pwOld, setPwOld] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwEmpty, setPwEmpty] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [oldPwEmpty, setOldPwEmpty] = useState(false);
  const [pwCheckEmpty, setPwCheckEmpty] = useState(false);
  const [pwWrong, setPwWrong] = useState(false);
  const [pwDup, setPwDup] = useState(false);
  const [changed, setChanged] = useState(false);

  return (
    <div>
      {changed ? (
        <div
          style={{
            color: "#000000",
            display: "flex",
            flexDirection: "column",
            marginLeft: "80px",
            marginTop: "200px",
          }}
        >
          <h1>비밀번호 변경이 완료되었습니다</h1>
          <a
            href="/"
            style={{
              fontSize: "20px",
              color: "#045369",
              display: "flex",
              marginLeft: "135px",
            }}
          >
            메인으로 이동하기
          </a>
        </div>
      ) : (
        <div style={{ marginBottom: "250px" }}>
          <div style={{ marginLeft: "255px" }}>
            <p style={{ color: "black", fontSize: "20px", marginLeft: "80px" }}>
              비밀번호 변경
            </p>
            {pwWrong ? (
              <ChangePwErrorField
                pwWrong={pwWrong}
                pwEmpty={pwEmpty}
                setPw={setPw}
                pw={pw}
              />
            ) : pwEmpty ? (
              <ChangePwErrorField
                pwWrong={pwWrong}
                pwEmpty={pwEmpty}
                setPw={setPw}
                pw={pw}
              />
            ) : (
              <ChangePwField setPw={setPw} />
            )}
            {pwDup ? (
              <ChangePwCheckErrorField
                pwCheckEmpty={pwCheckEmpty}
                pwDup={pwDup}
                pwCheck={pwCheck}
                setPwCheck={setPwCheck}
              />
            ) : pwCheckEmpty ? (
              <ChangePwCheckErrorField
                pwCheckEmpty={pwCheckEmpty}
                pwDup={pwDup}
                setPwCheck={setPwCheck}
                pwCheck={pwCheck}
              />
            ) : (
              <ChangePwCheckField setPwCheck={setPwCheck} />
            )}
          </div>
          <ChangePwButton
            pw={pw}
            pwCheck={pwCheck}
            setOldPwEmpty={setOldPwEmpty}
            pwOld={pwOld}
            setPwEmpty={setPwEmpty}
            setPwCheckEmpty={setPwCheckEmpty}
            setPwWrong={setPwWrong}
            setPwDup={setPwDup}
            changed={changed}
            setChanged={setChanged}
          />
        </div>
      )}
    </div>
  );
}

function SettingBox() {
  return (
    <div
      style={{
        height: "668px",
        width: "800px",
        backgroundColor: "#FFFFFF",
        display: "grid",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ color: "gray", fontSize: "15px", marginLeft: "10px" }}
        ></div>
      </div>
      <div>
        <ResetPwBox />
      </div>
    </div>
  );
}

function ResetPw() {
  return (
    <div className="root" style={{ display: "flex", flexDirection: "column" }}>
      <Bar />
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          right: "50%",
          marginRight: "-400px",
          marginTop: "-300px",
        }}
      >
        <SettingBox />
      </div>
    </div>
  );
}

export default ResetPw;
