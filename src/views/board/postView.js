import React, { useEffect, useRef, useState } from "react";
import "./postView.css";
import { useNavigate } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { setDeleteDialogOpen } from "../../redux/actions";

export default function PostView(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countRef = useRef(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [likeCount, setLikeCount] = useState(props.info.like_count);
  const [likeFlag, setLikeFlag] = useState(false);
  const [imageSet, setImageSet] = useState("");

  async function handleLike(e) {
    try {
      e.preventDefault();
      // @알림 - 좋아요
      // eslint-disable-next-line
      const likeAlarm = {
        type: "like",
        postId: props.info.id, // 게시물 아이디
        receiverId: props.info.user_id, // 수신자 아이디
        receiverName: props.info.nickname, // 수신자 닉네임
        senderId: sessionStorage.id, // 발신자 아이디
        senderName: sessionStorage.name, // 발신자 닉네임
      };
      if (likeFlag) {
        await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "UPDATE",
            table: "location",
            set: `like_count = '${likeCount - 1}'`,
            where: `id=${props.info.id}`,
          },
        );
        await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "DELETE",
            table: "heart",
            where: `from_id='${sessionStorage.id}' and to_id='${props.info.email}' and post_id=${props.info.id}`,
          },
        );
        setLikeFlag(!likeFlag);
        setLikeCount(likeCount - 1);
      } else {
        await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "UPDATE",
            table: "location",
            set: `like_count = '${likeCount + 1}'`,
            where: `id=${props.info.id}`,
          },
        );
        await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "INSERT",
            table: "heart",
            columns: "from_id, to_id, post_id",
            values: `'${sessionStorage.id}', '${props.info.email}', ${props.info.id}`,
          },
        );
        await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "INSERT",
            table: "notification",
            columns: "user_id, data",
            values: `'${props.info.user_id}', '${JSON.stringify(likeAlarm)}'`,
          },
        );
        setLikeFlag(!likeFlag);
        setLikeCount(likeCount + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

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

  useEffect(() => {
    axios
      .post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "user, heart",
          where: `user.email = heart.from_id and heart.post_id=${props.info.id}`,
        },
      )
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          // res에 내가 좋아요 누른 부분이 있다면 -> setLikeFlag true
          if (res.data[i].email === sessionStorage.getItem("id")) {
            console.log("내가 누른 좋아요");
            setLikeFlag(true);
            break;
          }
        }
        // if (res.data.length > 0) {
        //   setLikeFlag(true);
        // }
        console.log("likes : ", res);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  async function addComment() {
    try {
      // @알림 - 댓글
      // eslint-disable-next-line
      const commentAlarm = {
        type: "comment",
        postId: props.info.id, // 게시물 아이디
        msg: comment, // 댓글 내용
        receiverId: props.info.user_id, // 수신자 아이디
        receiverName: props.info.nickname, // 수신자 닉네임
        senderId: sessionStorage.id, // 발신자 아이디
        senderName: sessionStorage.name, // 발신자 닉네임
      };
      const newComment = {
        nickname: sessionStorage.getItem("name"),
        user_id: sessionStorage.getItem("id"),
        comment: comment,
        date: new Date(),
        picture: sessionStorage.getItem("picture"),
      };

      setComments([...comments, newComment]);
      document.getElementById("comment_ipt").value = "";

      if (sessionStorage._key === undefined) {
        alert("로그인 후 댓글 작성 가능합니다");
        return null;
      }

      await axios.post(
        "https://8ymn2iwfoj.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-add-comment",
        {
          location_id: props.info.id,
          from_id: sessionStorage.id,
          to_id: props.info.user_id,
          comment: comment,
        },
      );
      console.log("notification comment");
      await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "INSERT",
          table: "notification",
          columns: "user_id, data",
          values: `'${props.info.user_id}', '${JSON.stringify(commentAlarm)}'`,
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    try {
      await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "DELETE",
          table: "location",
          where: `id=${props.info.id}`,
        },
      );
      dispatch(setDeleteDialogOpen(true));
      props.closeModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const image = new Image();
    image.src = props.info.image;
    const width = image.naturalWidth;
    const height = image.naturalHeight;

    if (width > height) {
      setImageSet("post-image-row");
      console.log("가로 사진");
    } else if (width < height) {
      setImageSet("post-image-column");
      console.log("세로 사진");
    } else if (width === height) {
      setImageSet("post-image-square");
      console.log("정방형");
    }
  }, [props.info.image]);

  return (
    <>
      {props.info === undefined ? (
        <></>
      ) : (
        <>
          <div className="cover">
            <div className="main_con">
              <div className="gallery">
                <img
                  data-cy="post-img"
                  src={props.info.image}
                  className={`${imageSet}`}
                  alt={props.info.name}
                />
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
                  작성
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
                      // window.open(
                      //   `/profile?user=${props.info.email}`,
                      //   "_blank",);
                      navigate(`/profile?user=${props.info.email}`);
                      window.location.reload();
                    }}
                    alt={"..."}
                  ></img>
                  <span
                    id="pro_p"
                    onClick={() => {
                      // window.open(
                      //   `/profile?user=${props.info.email}`,
                      //   "_blank",);
                      navigate(`/profile?user=${props.info.email}`);
                      window.location.reload();
                    }}
                  >
                    {/* {props.info.nickname + " " + props.info.email} */}
                    {props.info.nickname}
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
                              // window.open(
                              //   `/profile?user=${info.user_id}`,
                              //   "_blank",
                              // );
                              navigate(`/profile?user=${info.user_id}`);
                              window.location.reload();
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
                              {/* {info.user_id} */}
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
                        style={
                          !likeFlag
                            ? { color: "grey", marginLeft: "1vw" }
                            : { color: "red", marginLeft: "1vw" }
                        }
                        aria-label="delete"
                        size="large"
                      >
                        <Favorite />
                      </IconButton>
                    }{" "}
                    {likeCount} / {props.info.name}
                  </div>
                  {/*쿼리스트링 값이 세션스토리지 id와 일치할 경우에만 수정 ui 도출*/}
                  {props.info.user_id === sessionStorage.id ? (
                    <>
                      <SettingsIcon
                        data-cy="post-update"
                        sx={{
                          color: "black",
                          marginTop: "1.4vh",
                          marginLeft: "6vw",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate(`/write?locationid=${props.info.id}`);
                          window.location.reload();
                        }}
                      />
                      <DeleteIcon
                        data-cy="post-delete"
                        sx={{
                          color: "black",
                          marginTop: "1.4vh",
                          cursor: "pointer",
                          marginRight: "1vw",
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
