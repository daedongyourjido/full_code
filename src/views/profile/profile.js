import { useLocation, useNavigate } from "react-router-dom";
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
import Button from "@mui/material/Button";
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

  const location = useLocation();
  // eslint-disable-next-line
  const queryParams = new URLSearchParams(location.search);
  // eslint-disable-next-line
  const [userLocationInfo, setUserLocationInfo] = useState([]);
  const [userLocationInfoDataDesc, setUserLocationInfoDataDesc] = useState([]);
  const [userLocationInfoLikeDesc, setUserLocationInfoLikeDesc] = useState([]);
  // eslint-disable-next-line
  const [value, setValue] = useState(0);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [user, setUser] = useState({});
  // eslint-disable-next-line
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (sessionStorage.id === queryParams.get("user")) setIsMyProfile(true);
  }, [queryParams]);

  useEffect(() => {});

  async function handleFollow(targetId) {
    try {
      // @알림 - 팔로우
      // eslint-disable-next-line
      const followAlarm = {
        type: "follow",
        receiverId: targetId, // 수신자 아이디
        receiverName: user.nickname, // 수신자 닉네임
        senderId: sessionStorage.id, // 발신자 아이디
        senderName: sessionStorage.name, // 발신자 닉네임
      };
      await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "INSERT",
          table: "following",
          columns: "follower_id, following_id",
          values: `${sessionStorage._key}, ${user.id}`,
        },
      );
      await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "INSERT",
          table: "notification",
          columns: "user_id, data",
          values: `'${targetId}', '${JSON.stringify(followAlarm)}'`,
        },
      );
      alert("팔로우되었습니다");
      setIsFollowing(true);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  // eslint-disable-next-line
  useEffect(async () => {
    // 마이페이지
    if (queryParams.get("user") === sessionStorage.id) {
      setUser({
        picture: sessionStorage.picture,
      });
      axios
        .post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "SELECT",
            columns: "*",
            table: "user, location",
            where: `user.email = location.user_id and location.user_id='${sessionStorage.id}' ORDER BY location.created_at desc`,
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
            table: "user, location",
            where: `user.email = location.user_id and user_id='${sessionStorage.id}' ORDER BY like_count desc`,
          },
        )
        .then((res) => {
          setUserLocationInfoLikeDesc(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
          console.log("following", res.data);
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
            where: `id in(SELECT follower_id FROM following, user WHERE following.following_id = ${sessionStorage._key} and user.id = ${sessionStorage._key})`,
          },
        )
        .then((res) => {
          if (res.data === "") setFollower([]);
          else setFollower(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // 다른사람 페이지
    else {
      // eslint-disable-next-line
      const userInfo = (
        await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "SELECT",
            columns: "*",
            table: "user",
            where: `email='${queryParams.get("user")}'`,
          },
        )
      ).data[0];
      setUser(userInfo);
      const isRelated = async () => {
        const relationship = await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "SELECT",
            columns: "*",
            table: "following",
            where: `follower_id=${sessionStorage._key} and following_id=${userInfo.id}`,
          },
        );
        if (relationship.data.length !== 0) {
          setIsFollowing(true);
        }
      };
      isRelated();

      axios
        .post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "SELECT",
            columns: "*",
            table: "user, location",
            where: `user.email = location.user_id and location.user_id='${userInfo.email}' ORDER BY like_count desc`,
          },
        )
        .then((res) => {
          if (res.data === []) {
            setUserLocationInfoLikeDesc(undefined);
          } else {
            setUserLocationInfoLikeDesc(res.data);
          }

          axios
            .post(
              "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
              {
                DML: "SELECT",
                columns: "*",
                table: "user, location",
                where: `user.email = location.user_id and location.user_id='${userInfo.email}' ORDER BY location.created_at desc`,
              },
            )
            .then((res) => {
              if (res.data === []) {
                setUserLocationInfoDataDesc(undefined);
              } else {
                setUserLocationInfoDataDesc(res.data);
              }
            })
            .catch((error) => {
              console.log(error);
            });
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
            table: "user",
            where: `id in(SELECT following_id FROM following, user WHERE following.follower_id = ${userInfo.id} and user.id = ${userInfo.id})`, // 수정 필요
          },
        )
        .then((res) => {
          if (res.data === "") {
            setFollowing([]);
          } else {
            setFollowing(res.data);
          }
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
            where: `id in(SELECT follower_id FROM following, user WHERE following.following_id = ${userInfo.id} and user.id = ${userInfo.id})`, // 수정 필요
          },
        )
        .then((res) => {
          if (res.data === "") {
            setFollower([]);
          } else {
            setFollower(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // token 여부에 반응하여 로그인 여부 판단
    const token = sessionStorage.getItem("id");
    if (token) {
      dispatch(setLogin(true));
    } else {
      dispatch(setLogin(false));
    }
  }, [dispatch]);

  const [uploadedImage, setUploadedImage] = useState(null);
  const avatarInputRef = useRef(null);

  const handleAvatarClick = () => {
    if (queryParams.get("user") === sessionStorage.id) {
      avatarInputRef.current.click();
    }
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
          window.location.reload();
          // Handle the server response if needed
        } catch (error) {
          console.error("Error submitting image:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                      user !== undefined
                        ? user.picture
                        : uploadedImage
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
                      {user.nickname === undefined
                        ? sessionStorage.name
                        : user.nickname}
                    </Typography>
                    {isMyProfile ? (
                      <></>
                    ) : isFollowing ? (
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setIsFollowing(false);
                          alert("팔로우가 취소되었습니다");

                          // @팔로우 취소
                        }}
                        sx={{
                          fontSize: "0.8vh",
                          color: "white",
                          borderColor: "white",
                          marginLeft: "1.5vw",
                          height: "3vh",
                          marginTop: "0.5vh",
                        }}
                      >
                        팔로우 중
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => {
                          handleFollow(queryParams.get("user")).then((res) =>
                            console.log(res),
                          );
                        }}
                        sx={{
                          fontSize: "0.8vh",
                          color: "white",
                          borderColor: "white",
                          marginLeft: "1.5vw",
                          height: "3vh",
                          marginTop: "0.5vh",
                        }}
                      >
                        Follow
                      </Button>
                    )}
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
                          window.location.reload();
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
                onChange={handleChange}
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
                style={{ overflow: "auto" }}
              >
                {userLocationInfoDataDesc.length === 0 ? (
                  <div className="row-center" style={{ color: "white" }}>
                    <p>게시물이 없습니다</p>
                  </div>
                ) : (
                  <ImageCollection
                    userLocationInfo={userLocationInfoDataDesc}
                  />
                )}
              </CustomTabPanel>
              <CustomTabPanel
                value={value}
                index={1}
                style={{ overflow: "auto" }}
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
