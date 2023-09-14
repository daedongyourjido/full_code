import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchField from "../../modules/components/searchField";
import LoginPageButton from "../../views/login/loginPageButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "react-modal";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Avatar, Button, Paper, Typography } from "@mui/material";
import { Chat, Notifications, PersonAdd, Recommend } from "@mui/icons-material";
import "./search.css";
import "../../views/board/board.css";
import ImageCollection from "../../views/board/image_Collection";
import Popover from "@mui/material/Popover";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { ListItemButton } from "@mui/joy";
import PostView from "../../views/board/postView";

function BeforeLogin(props) {
  const navigate = useNavigate();

  return (
    <div
      className="bar"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "right",
        margin: "auto",
        padding: "10px",
      }}
    >
      <LoginPageButton
        className="before-login-btn"
        font={props.font}
        onClick={() => {
          navigate("/login");
        }}
      />
    </div>
  );
}

function AfterLogin(props) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLocationResult, setSearchLocationResult] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const customOverlayStyle = {
    overlay: {
      zIndex: 9999, // 모달을 최상위 레이어에 표시
    },
  };

  // eslint-disable-next-line
  async function handleAlarm() {
    // @알림 - 나의 알림 수신
  }
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "SELECT",
            columns: "*",
            table: "notification",
            where: `user_id = '${sessionStorage.id}'`,
          },
        );
        return new Promise((resolve, reject) => {
          resolve(res.data);
          reject("error");
        });
      } catch (e) {
        console.log(e);
      }
    };
    getNotifications().then((res) => {
      setNotifications(res);
    });
  }, []);
  const openModal = async (info) => {
    try {
      let a = (
        await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "SELECT",
            columns: "*",
            table: "user",
            where: `email like '%${searchText}%' or nickname like '%${searchText}%'`,
          },
        )
      ).data;
      let b = (
        await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "SELECT",
            columns: "*",
            table: "following",
          },
        )
      ).data;
      a = a.filter(function (itemA) {
        return !b.some(function (itemB) {
          return itemA.id === itemB.following_id;
        });
      });
      setSearchResult(a);
      let c = await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "location",
          where: `name like '%${searchText}%' or title like '%${searchText}%' or content like '%${searchText}%'`,
        },
      );
      setSearchLocationResult(c.data);
      setIsModalOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFollow = async (target) => {
    const followAlarm = {
      type: "follow",
      receiverId: target.email, // 수신자 아이디
      receiverName: target.nickname, // 수신자 닉네임
      senderId: sessionStorage.id, // 발신자 아이디
      senderName: sessionStorage.name, // 발신자 닉네임
    };
    try {
      await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "INSERT",
          table: "following",
          columns: "follower_id, following_id",
          values: `${sessionStorage._key}, ${target.id}`,
        },
      );
      target["type"] = "follow";
      await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "INSERT",
          table: "notification",
          columns: "user_id, data",
          values: `'${target.email}', '${JSON.stringify(followAlarm)}'`,
        },
      );
      navigate(`/profile?user=${target.email}`);
      window.location.reload();
    } catch (e) {
      console.error("follow error", e);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleNoteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNoteClose = () => {
    setAnchorEl(null);
  };

  const noteOpen = Boolean(anchorEl);
  const noteId = noteOpen ? "simple-popover" : undefined;
  const notificationListItem = (data) => {
    const userData = JSON.parse(data.data);
    switch (userData.type) {
      case "like":
        return (
          <>
            <ListItemAvatar>
              <Avatar>
                <Recommend color={"red"} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${userData.senderName} 님이`}
              secondary={`좋아요를 눌렀어요!`}
            />
          </>
        );
      case "comment":
        return (
          <>
            <ListItemAvatar>
              <Avatar>
                <Chat color={"yellow"} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${userData.senderName} 님이`}
              secondary={`댓글을 달았어요!`}
            />
          </>
        );
      case "follow":
        return (
          <>
            <ListItemAvatar>
              <Avatar>
                <PersonAdd color={"blue"} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${userData.senderName} 님이`}
              secondary={`팔로우했어요!`}
            />
          </>
        );
      default:
        throw new Error("something went worng");
    }
  };
  const [isPostModalOpen, setIsPostModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장할 state
  const [modalInfo, setModalInfo] = useState({});
  // 모달 열기 함수
  const openPostModal = async (data) => {
    try {
      const res = await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "location",
          where: `id = ${data.postId}`,
        },
      );
      setModalInfo({
        ...res.data[0],
        email: data.receiverId,
      });
      setIsPostModalOpen(true);
    } catch (e) {
      console.log("openPostModal error", e);
    }
  };

  // 모달 닫기 함수
  const closePostModal = () => {
    setIsPostModalOpen(false);
    window.location.reload();
  };
  const handleNotificationEvent = async (data) => {
    const userData = JSON.parse(data.data);
    try {
      await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "DELETE",
          table: "notification",
          where: `id=${data.id}`,
        },
      );
    } catch (e) {
      console.log("notification click error", e);
    }
    switch (userData.type) {
      case "like":
        await openPostModal(userData);
        break;
      case "comment":
        await openPostModal(userData);
        break;
      case "follow":
        navigate(`/profile?user=${userData.senderId}`);
        window.location.reload();
        break;
      default:
        throw new Error("something went wrong");
    }
  };

  return (
    <div
      className="bar"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "right",
        margin: "auto",
        padding: "10px",
      }}
    >
      <Modal
        isOpen={isPostModalOpen}
        onRequestClose={closePostModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        style={customOverlayStyle} // 오버레이 스타일을 적용
      >
        <PostView
          info={modalInfo}
          open={isPostModalOpen}
          closeModal={closePostModal}
        />
      </Modal>
      <IconButton
        onClick={handleNoteClick}
        sx={{
          marginRight: "2vw",
          color: notifications.length === 0 ? "white" : "#ffcc00",
        }}
      >
        <Notifications />
      </IconButton>

      <Popover
        id={noteId}
        open={noteOpen}
        anchorEl={anchorEl}
        onClose={handleNoteClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List
          sx={{ width: "240px", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {notifications.map((ele) => (
            <ListItemButton
              clickable={true}
              onClick={() => {
                handleNotificationEvent(ele);
              }}
            >
              {notificationListItem(ele)}
            </ListItemButton>
          ))}
        </List>
      </Popover>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#6EA4B4", marginRight: "20px" }}
        onClick={() => {
          navigate("/write");
        }}
      >
        게시물 올리기
      </Button>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "15vw",
          height: "32px",
        }}
      >
        <InputBase
          data-cy="search"
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색"
          inputProps={{ "aria-label": "search google maps" }}
          onInput={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <IconButton
          data-cy="search-btn"
          onClick={openModal}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        style={customOverlayStyle} // 오버레이 스타일을 적용
      >
        <Box className="result-container">
          <Typography variant="h6" gutterBottom>
            사용자 검색 결과
          </Typography>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              cursor: "pointer",
            }}
          >
            {searchResult.length > 0 ? (
              searchResult.map((value, index) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          handleFollow(value);
                        }}
                        edge="end"
                        aria-label="comments"
                      >
                        <PersonAdd />
                      </IconButton>
                    }
                    sx={{ marginBottom: "2vh", width: "35vw" }}
                    disablePadding
                  >
                    <Avatar src={value.picture} />
                    <ListItemText
                      id={labelId}
                      primary={`${value.nickname}`}
                      sx={{ marginLeft: "1vw", fontSize: "1.5vh" }}
                    />
                    <ListItemText
                      id={labelId}
                      primary={`${value.email}`}
                      sx={{ fontSize: "1.5vh" }}
                    />
                  </ListItem>
                );
              })
            ) : (
              <></>
            )}
          </List>

          <Typography variant="h6" gutterBottom>
            게시물 검색 결과
          </Typography>

          <ImageCollection userLocationInfo={searchLocationResult} />
        </Box>
      </Modal>
      <img
        src={sessionStorage.picture}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "100%",
          marginRight: "16px",
          cursor: "pointer",
          marginLeft: "30px",
        }}
        onClick={() => {
          navigate(`/profile?user=${sessionStorage.id}`);
          window.location.reload();
        }}
        alt={"..."}
      />
      {/* <p style={{fontSize:'18px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}} >{sessionStorage.getItem('name')}</p> */}
      <LogoutIcon
        style={{ marginLeft: "15px", cursor: "pointer" }}
        onClick={() => {
          sessionStorage.clear();
          window.location.reload();
        }}
      />
    </div>
  );
}

export default function Bar(props) {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const [background, setBackground] = useState("#FFFFFF");
  const [font, setFont] = useState("#000000");
  const [accordion, setAccordion] = useState("#FFFFFF");

  useEffect(() => {
    if (props.main) {
      setBackground("#045369");
      setFont("#FFFFFF");
      setAccordion("#045369");
    }
  }, [props.main]);

  useEffect(() => {
    if (sessionStorage.getItem("name")) setLogin(true);
    else setLogin(false);
  }, []);

  return (
    <div className="header" style={{}}>
      <Box sx={{ flexGrow: 1, whiteSpace: "nowrap" }} className="header">
        <AppBar
          position="static"
          sx={{
            backgroundColor: background,
            color: font,
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "dohyeon",
                color: font,
                marginLeft: "50px",
                cursor: "pointer",
                width: "100px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              대동유어지도
            </Typography>
            {login ? (
              <AfterLogin location={"/"} accordion={accordion} />
            ) : (
              <BeforeLogin font={font} />
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
