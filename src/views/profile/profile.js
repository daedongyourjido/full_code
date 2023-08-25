import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import FollowingModal from "./followingModal.js";
import FollowerModal from "./followerModal.js";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MdFoodBank } from "react-icons/md";
import { TbBuildingCommunity } from "react-icons/tb";
import ImageCollection from "../board/image_Collection";
import { Avatar, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/actions";
import Bar from "../../modules/layout/bar.js";
import SettingsIcon from "@mui/icons-material/Settings";
import "./profile.css";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [userLocationInfo, setUserLocationInfo] = useState([]);
  const [userLocationInfoDataDesc, setUserLocationInfoDataDesc] = useState([]);
  const [userLocationInfoLikeDesc, setUserLocationInfoLikeDesc] = useState([]);
  // eslint-disable-next-line
  const [value, setValue] = useState(0);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [user, setUser] = useState("");
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    // url params를 통해 누구의 프로필을 볼 것인지 지정

    const _user = new URL(document.location.toString()).searchParams.get(
      "user",
    );
    setUser(_user);

    console.log("compare : ", _user, sessionStorage.id);

    if (_user === sessionStorage.id)
      // 본인의 프로필이라면
      setIsMyProfile(true);
  }, []);

  /** 사용자 장소 이미지 불러오는 api **/
  useEffect(() => {
    axios
      .post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "location",
          where: `user_id='${user}' ORDER BY created_at desc`,
        },
      )
      .then((res) => {
        setUserLocationInfoDataDesc(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "location",
          where: `user_id='${user}' ORDER BY like_count desc`,
        },
      )
      .then((res) => {
        setUserLocationInfoLikeDesc(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post(
        "https://nppy6kx2q6.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-random",
        {
          type: "profile",
          user_id: user,
        },
      )
      .then((res) => {
        // setUserLocationInfo(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);
  useEffect(() => {
    // token 여부에 반응하여 로그인 여부 판단
    const token = sessionStorage.getItem("id");
    if (token) {
      dispatch(setLogin(true));
    } else {
      dispatch(setLogin(false));
    }
  }, [dispatch]);

  useEffect(() => {
    // get my following
    axios
      .post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "user",
          where: `id in(SELECT following_id FROM following, user WHERE following.follower_id = ${sessionStorage._key} and user.id = ${sessionStorage._key})`, // 수정 필요
        },
      )
      .then((res) => {
        if (res.data === "") setFollowing([]);
        else setFollowing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // get follower
    axios
      .post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "user",
          where: `id in(SELECT follower_id FROM following, user WHERE following.following_id = ${sessionStorage._key} and user.id = ${sessionStorage._key})`, // 수정 필요
        },
      )
      .then((res) => {
        if (res.data === "") setFollower([]);
        else setFollower(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   setUserImage(sessionStorage.picture)
  // }, [])

  const [uploadedImage, setUploadedImage] = useState(null);
  const avatarInputRef = useRef(null);

  const handleAvatarClick = () => {
    // Trigger the hidden file input when Avatar is clicked
    avatarInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setUploadedImage(file);

        // Convert the uploaded image to Base64
        const base64Image = reader.result.split(",")[1];

        try {
          // Send the Base64-encoded image to the server
          await axios.post(
            "https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload",
            {
              /**API JSON 형식 참조하여 post 요청을 보내주세요**/
              type: "user",
              fileName: file.name, // 저장할 파일명
              file: JSON.stringify(base64Image), // 파일 값
              email: sessionStorage.id,
            },
          );
          sessionStorage.setItem(
            "picture",
            `https://2023-c-capstone.s3.us-east-2.amazonaws.com/info/${sessionStorage.id}/${file.name}`,
          );
          // Handle the server response if needed
        } catch (error) {
          console.error("Error submitting image:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div id="wrap">
        <Bar />

        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: "50px",
            marginRight: "50px",
          }}
          id={"main"}
          style={{ paddingTop: "5rem" }}
        >
          <Box
            className="profile-left-container"
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              width: "35vw",
              height: "100vh",
            }}
            id={"left"}
          >
            <div className="profile-container">
              <div className="row-center user-info">
                <div className="avatar-container">
                  <Avatar
                    alt="User Avatar"
                    src={
                      uploadedImage
                        ? URL.createObjectURL(uploadedImage)
                        : sessionStorage.picture
                    }
                    sx={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "100%",
                      margin: "0 auto",
                      cursor: "pointer",
                    }}
                    onClick={handleAvatarClick}
                  />
                </div>
                <div className="user-info-container">
                  <div className="user-info-container2">
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{
                        color: "white",
                        textAlign: "left",
                        marginLeft: "10px",
                      }}
                    >
                      {sessionStorage.name}
                    </Typography>
                    {isMyProfile ? (
                      <SettingsIcon
                        sx={{
                          color: "white",
                          marginLeft: "15px",
                          marginTop: "3px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate("/setting/change");
                        }}
                      />
                    ) : (
                      <p></p>
                    )}
                  </div>

                  <div className="user-info-container3">
                    <Box>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <div className="follower-container row-center">
                          <FollowerModal follower={follower} />
                          <p
                            className="white-font"
                            style={{ fontSize: "12px" }}
                          >
                            {follower.length}
                          </p>
                        </div>
                        <div className="following-container row-center">
                          <FollowingModal following={following} />
                          <p
                            className="white-font"
                            style={{ fontSize: "12px" }}
                          >
                            {following.length}
                          </p>
                        </div>
                      </Grid>
                    </Box>
                  </div>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={avatarInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </Box>

          <Box
            id={"right"}
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              width: "60vw",
              height: "100vh",
            }}
          >
            <Box
              className={"right"}
              sx={{ width: "100%", height: "80%", margin: "auto" }}
            >
              <Tabs
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                style={{ width: "100%" }}
                value={value}
                aria-label="icon label tabs example"
                centered
              >
                <Tab
                  sx={{ color: "white" }}
                  icon={
                    <MdFoodBank
                      color={"white"}
                      {...a11yProps(0)}
                      id="icon1"
                      size="70px"
                    />
                  }
                  iconPosition="start"
                  label="최신순"
                />
                <Tab
                  sx={{ color: "white" }}
                  icon={
                    <TbBuildingCommunity
                      color={"white"}
                      {...a11yProps(1)}
                      id="icon2"
                      size="50px"
                    />
                  }
                  iconPosition="start"
                  label="추천순"
                />
              </Tabs>
              <CustomTabPanel
                value={value}
                index={0}
                style={{ overflow: "auto", maxHeight: "100vh" }}
              >
                {userLocationInfoDataDesc.length === 0 ? (
                  ""
                ) : (
                  <ImageCollection
                    userLocationInfo={userLocationInfoDataDesc}
                  />
                )}
              </CustomTabPanel>
              <CustomTabPanel
                value={value}
                index={1}
                style={{ overflow: "auto", maxHeight: "100vh" }}
              >
                {userLocationInfoLikeDesc.length === 0 ? (
                  ""
                ) : (
                  <ImageCollection
                    userLocationInfo={userLocationInfoLikeDesc}
                  />
                )}
              </CustomTabPanel>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}
