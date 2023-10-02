import "./styles/App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/index.css";
import Main from "./views/main/main.js";
import Login from "./views/login/login.js";
import SignUp from "./views/signup/signup.js";
import Setting from "./views/setting/setting.js";
import ChangePw from "./views/changepw/changePw.js";
import Withdraw from "./views/withdraw/withdraw.js";
import NeedVerify from "./views/verify-send/needVerify.js";
import Verify from "./views/verify/verify.js";
import FindPw from "./views/findpw/findPw.js";
import NeedResetPw from "./views/find-send/needResetPw.js";
import ResetPw from "./views/resetpw/resetPw.js";
import Profile from "./views/profile/profile.js";
import Place from "./views/board/Place";
import Write from "./views/write/write.js";
import MyMap from "./views/mymap/mymap.js";
import ChangeUserInfo from "./views/change-user-info/changeUserInfo.js";
import { List } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

function Pages() {
  const location = useLocation();

  useEffect(() => {
    const getTokenData = async () => {
        const res = await axios.post(
            "https://h8viqjk6ob.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-login",
            {
                type: "verify",
                token: sessionStorage.token,
            },
        );
        if(res.status === 200) {
            console.log('token verified')
        }
        else {
            sessionStorage.clear();
            window.location.reload();
        }
    };
    if (sessionStorage.token !== undefined) {
      getTokenData();
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/setting/change" element={<ChangePw />} />
      <Route path="/setting/withdraw" element={<Withdraw />} />
      <Route path={"/setting/change-user-info"} element={<ChangeUserInfo />} />
      <Route path="/verify/send" element={<NeedVerify />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/find" element={<FindPw />} />
      <Route path="find/send" element={<NeedResetPw />} />
      <Route path="find/reset" element={<ResetPw />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/write" element={<Write />} />
      <Route path={"/board/:place"} element={<Place />} />
      <Route path={"/mymap/:List"} element={<List />} />
      {/* ? */}
      <Route path="/mymap" element={<MyMap />} />
    </Routes>
  );
}

export default Pages;
