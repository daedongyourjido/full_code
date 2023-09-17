import React, { useState } from "react";
import Bar from "@modules/layout/bar.js";
import InputField from "@modules/components/inputField";
import SettingContainer from "@views/setting/settingContainer.js";
import MainPageButton from "../main/mainPageButton.js";
import ChangeButton from "./changeButton.js";
import "@styles/views/change-user-info/change-user-info.css";

function ChangeUserInfo() {
  function ChangeUserInfoBox() {
    const [changed, setChanged] = useState(false);
    const [name, setName] = useState("");
    const [empty, setEmpty] = useState(false);

    return (
      <div>
        {changed ? (
          <div className="change-user-info-box-done">
            <h1>프로필 변경이 완료되었습니다</h1>
            <MainPageButton color="black" />
          </div>
        ) : (
          <div className="change-user-info-box">
            <p style={{ fontSize: "20px" }}>프로필 수정</p>
            <InputField setData={setName} label="닉네임 변경" type="text" />
            <ChangeButton
              name={name}
              setEmpty={setEmpty}
              setChanged={setChanged}
            />
            {empty ? (
              <p className="input_error">변경할 닉네임을 입력해주세요</p>
            ) : (
              <p></p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Bar />
      <div className="changepw-container">
        <SettingContainer component={ChangeUserInfoBox} menu="changeUserInfo" />
      </div>
    </div>
  );
}

export default ChangeUserInfo;
