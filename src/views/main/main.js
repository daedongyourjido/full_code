import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KakaoMap } from "./map.js";
import "./main.css";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginPageButton from "../login/loginPageButton.js";

function LoggedOutBar() {
  const navigate = useNavigate();
  return (
    <div className="loggedout-bar">
      <h1
        className="clickable"
        onClick={() => {
          navigate("/");
        }}
      >
        대동유어지도
      </h1>
      <div className="login-button-container">
        <LoginPageButton borderColor="white" color="white" />
      </div>
    </div>
  );
}

function LoggedInBar() {
  const navigate = useNavigate();

  return (
    <div className="loggedin-bar">
      <h1
        className="clickable"
        onClick={() => {
          navigate("/");
        }}
      >
        대동유어지도
      </h1>

      <div className="main-profile-container">
        <img
          className="profile-pic"
          src={sessionStorage.picture}
          onClick={() => {
            navigate(`/profile?user=${sessionStorage.id}`);
          }}
          alt={"..."}
        />
        <p
          className="profile-name"
          onClick={() => {
            navigate(`/profile?user=${sessionStorage.id}`);
          }}
        >
          {sessionStorage.name}
        </p>
        <LogoutIcon
          className="logout-button"
          onClick={() => {
            sessionStorage.clear();
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
}

function Main() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    // token 여부에 반응하여 로그인 여부 판단
    const token = sessionStorage.getItem("id");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div className="root">
      <div className="bar">{login ? <LoggedInBar /> : <LoggedOutBar />}</div>
      <KakaoMap />
    </div>
  );
}

export default Main;
