import React, { useEffect, useRef, useState } from "react";
import "./postView.css";
import Gslider from "./postSlider";
import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Favorite } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PostView(props) {
  const navigate = useNavigate();
  const countRef = useRef(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [likeCount, setLikeCount] = useState(props.info.like_count);
  const [likeFlag, setLikeFlag] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleLike = (e) => {
    // 좋아요
    e.preventDefault();
    if (likeFlag) {
      axios
        .post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "UPDATE",
            table: "location",
            set: `like_count = '${likeCount - 1}'`,
            where: `id=${props.info.id}`,
          },
        )
        .then((res) => {
          setLikeFlag(!likeFlag);
          setLikeCount(likeCount - 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "UPDATE",
            table: "location",
            set: `like_count = '${likeCount + 1}'`,
            where: `id=${props.info.id}`,
          },
        )
        .then((res) => {
          setLikeFlag(!likeFlag);
          setLikeCount(likeCount + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    // 댓글 가져오기
    if (countRef.current === 1 || props.info === undefined) {
      return;
    }
    if (props.open) {
      countRef.current = 1;
    }
    axios
      .post(
        "https://qnsxbq7cjf.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-getComments",
        {
          location_id: props.info.id,
        },
      )
      .then((res) => {
        let apiComments = [];
        for (let i = 0; i < res.data.length; i++) {
          apiComments.push({
            user_id: res.data[i].from_id, // 댓글 작성자 id
            nickname: res.data[i].nickname,
            comment: res.data[i].content,
            date: res.data[i].comment_time,
            picture: res.data[i].picture,
          });
        }
        setComments((prevComments) => [...prevComments, ...apiComments]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.open, props.info]);

  const addComment = () => {
    const newComment = {
      nickname: sessionStorage.getItem("name"),
      user_id: sessionStorage.getItem("id"),
      comment: comment,
      date: new Date(),
      picture: sessionStorage.getItem("picture"),
    };

    setComments([...comments, newComment]);
    document.getElementById("comment_ipt").value = "";
    axios
      .post(
        "https://8ymn2iwfoj.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-add-comment",
        {
          location_id: props.info.id,
          from_id: sessionStorage.id,
          to_id: props.info.user_id,
          comment: comment,
        },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = () => {
    axios
      .post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "DELETE",
          table: "location",
          where: `id=${props.info.id}`,
        },
      )
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("comments : ", comments);
  }, [comments]);

  return (
    <>
      {props.info === undefined ? (
        <></>
      ) : (
        <>
          <div className="cover">
            <div className="main_con">
              <div className="gallery">
                <Gslider info={props.info} />
              </div>

              <hr id="line"></hr>
              <div className="comment">
                <p id="comment_p" style={{ lineHeight: "60px" }}>
                  댓글
                </p>
                <input
                  type="text"
                  id="comment_ipt"
                  onInput={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button id="comment_btn" onClick={addComment}>
                  게시
                </button>
              </div>
            </div>

            <div className="comment_list">
              <div className="g_header">
                <div className="profile_Name">
                  <img
                    className="profile_img"
                    src={props.info.picture}
                    onClick={() => {
                      window.open(
                        `/profile?user=${props.info.email}`,
                        "_blank",
                      );
                    }}
                    alt={"..."}
                  ></img>
                  <span
                    id="pro_p"
                    onClick={() => {
                      window.open(
                        `/profile?user=${props.info.email}`,
                        "_blank",
                      );
                    }}
                  >
                    {props.info.nickname + " " + props.info.email}
                  </span>
                </div>
              </div>

              <hr id="list_hr"></hr>
              <p id="list_p">댓글</p>

              {comments.length === 0 ? (
                <div className="no-comments">
                  <p>아직 댓글이 없습니다</p>
                </div>
              ) : (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    height: "45vh",
                    marginLeft: "0.7vw",
                    overflow: "auto",
                  }}
                >
                  {comments.map((info) => (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="inpic"
                            src={info.picture}
                            className="comment-profile"
                            onClick={() => {
                              navigate(`/profile?user=${info.user_id}`);
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <p className="comment-text">{info.comment}</p>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline", fontSize: "1.3vh" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {info.nickname + " "}
                              </Typography>
                              {info.user_id}
                              <br />
                              {info.date instanceof Date ? (
                                <p className="comment-date">
                                  {info.date.toLocaleString()}
                                </p>
                              ) : (
                                <p className="comment-date">{info.date}</p>
                              )}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  ))}
                </List>
              )}

              <hr id="list_hr"></hr>

              <div className="g_contents">
                <div className="post-set">
                  <div className="like_and_location">
                    {
                      <IconButton
                        onClick={handleLike}
                        style={!likeFlag ? { color: "grey" } : { color: "red" }}
                        aria-label="delete"
                        size="large"
                      >
                        <Favorite />
                      </IconButton>
                    }{" "}
                    {likeCount} / {props.info.name}
                  </div>
                  {/*쿼리스트링 값이 세션스토리지 id와 일치할 경우에만 수정 ui 도출*/}
                  {queryParams.get("user") === sessionStorage.id ? (
                    <>
                      <SettingsIcon
                        sx={{
                          color: "black",
                          marginTop: "1.4vh",
                          marginLeft: "6vw",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.open(
                            `/write?locationid=${props.info.id}`,
                            "_blank",
                          );
                        }}
                      />
                      <DeleteIcon
                        sx={{
                          color: "black",
                          marginTop: "1.4vh",
                          cursor: "pointer",
                        }}
                        onClick={handleDelete}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="detail">
                  <h3>{props.info.title}</h3>
                  <p>{props.info.content}</p>
                </div>
                <div className="date" style={{ color: "gray" }}>
                  {props.info.updated_at}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
