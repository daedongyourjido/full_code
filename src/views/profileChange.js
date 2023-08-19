import React, { useState } from "react";
// import axios from 'axios'
import { useNavigate } from "react-router-dom";
import ChangePwField from "./material/changePwField.js";
import ChangePwOldField from "./material/changePwOldField.js";
import ChangePwOldErrorField from "./material/changePwOldErrorField.js";
import ChangePwCheckField from "./material/changePwCheckField.js";
import ChangePwCheckErrorField from "./material/changePwCheckErrorField.js";
import ChangePwErrorField from "./material/changePwErrorField.js";
import ChangePwButton from "./material/changePwButton.js";
import Bar from "./bar.js";

function ChangePwBox() {
  const [oldPw, setOldPw] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwEmpty, setPwEmpty] = useState(false);
  const [pwCheckEmpty, setPwCheckEmpty] = useState(false);
  const [oldPwEmpty, setOldPwEmpty] = useState(false);
  const [pwWrong, setPwWrong] = useState(false);
  const [pwDup, setPwDup] = useState(false);
  const [pwOldWrong, setPwOldWrong] = useState(false);
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
            boxShadow: "0px 0px 80px rgba(0, 0, 0, 0.3)",
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
        <div style={{ marginTop: "50px" }}>
          <div style={{ marginLeft: "170px" }}>
            <p style={{ color: "black", fontSize: "20px", marginLeft: "80px" }}>
              프로필 변경
            </p>
            {pwOldWrong ? (
              <ChangePwOldErrorField
                oldPwEmpty={oldPwEmpty}
                setOldPw={setOldPw}
                oldPw={oldPw}
              />
            ) : oldPwEmpty ? (
              <ChangePwOldErrorField
                oldPwEmpty={oldPwEmpty}
                setOldPw={setOldPw}
                oldPw={oldPw}
              />
            ) : (
              <ChangePwOldField setOldPw={setOldPw} oldPw={oldPw} />
            )}
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
            oldPw={oldPw}
            pw={pw}
            pwCheck={pwCheck}
            setPwEmpty={setPwEmpty}
            setPwCheckEmpty={setPwCheckEmpty}
            setOldPwEmpty={setOldPwEmpty}
            setPwWrong={setPwWrong}
            setPwDup={setPwDup}
            setPwOldWrong={setPwOldWrong}
            changed={changed}
            setChanged={setChanged}
          />
        </div>
      )}
    </div>
  );
}

function SettingBox() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "668px",
        width: "800px",
        backgroundColor: "#FFFFFF",
        display: "grid",
        gridTemplateColumns: "1fr 3.8fr",
        gridColumnGap: "1px",
        boxShadow: "0px 0px 80px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          height: "100%",
          borderRight: "1px solid #045369",
          borderRightWidth: "3px",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <div style={{ color: "gray", fontSize: "15px", marginLeft: "10px" }}>
          <p
            style={{
              marginBottom: "40px",
              color: "#000000",
              cursor: "pointer",
            }}
          >
            프로필 편집
          </p>
          <p style={{ marginBottom: "40px", cursor: "pointer" }}>
            비밀번호 변경
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/setting/withdraw");
            }}
          >
            회원 탈퇴
          </p>
        </div>
      </div>
      <div>
        <ChangePwBox />
      </div>
    </div>
  );
}

function ChangeProfile() {
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

export default ChangeProfile;
