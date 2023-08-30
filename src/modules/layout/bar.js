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
import { Notifications, PersonAdd } from "@mui/icons-material";
import "./search.css";
import "../../views/board/board.css";
import ImageCollection from "../../views/board/image_Collection";
import Popover from "@mui/material/Popover";

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
      <SearchField />
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
  const customOverlayStyle = {
    overlay: {
      zIndex: 9999, // 모달을 최상위 레이어에 표시
    },
  };

  // eslint-disable-next-line
  async function handleAlarm() {
    // @알림 - 나의 알림 수신
  }

  const openModal = (info) => {
    axios
      .post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "user",
          where: `email like '%${searchText}%' or nickname like '%${searchText}%'`,
        },
      )
      .then((res) => {
        setSearchResult(res.data);
        axios
          .post(
            "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
            {
              DML: "SELECT",
              columns: "*",
              table: "location",
              where: `name like '%${searchText}%' or title like '%${searchText}%' or content like '%${searchText}%'`,
            },
          )
          .then((res) => {
            setSearchLocationResult(res.data);
            setIsModalOpen(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFollow = (targetId) => {
    axios
      .post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "INSERT",
          table: "following",
          columns: "follower_id, following_id",
          values: `${sessionStorage._key}, ${targetId}`,
        },
      )
      .then((res) => {
        console.log(res);
        alert("팔로우되었습니다");
      })
      .then((err) => {
        console.log(err);
      });
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
      <Notifications
        onClick={handleNoteClick}
        sx={{
          marginRight: "2vw",
          color: "red",
        }}
      />
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
        <div>{/* @알림 - 알림 객체배열 map으로 띄우는 곳 */}</div>
      </Popover>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#6EA4B4", marginRight: "20px" }}
        onClick={() => {
          // window.open("/write", "_blank");
          navigate("/write");
          window.location.reload();
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
                          handleFollow(value.id);
                        }}
                        edge="end"
                        aria-label="comments"
                      >
                        <PersonAdd />
                      </IconButton>
                    }
                    sx={{ marginBottom: "2vh", width: "35vw" }}
                    disablePadding
                    onClick={() => {
                      // window.open(`/profile?user=${value.email}`, "_blank");
                      navigate(`/profile?user=${value.email}`);
                      window.location.reload();
                    }}
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
                // window.open("/", "_blank");
                navigate("/");
                window.location.reload();
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
