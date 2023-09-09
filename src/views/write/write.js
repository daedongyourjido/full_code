import React, { useEffect, useState } from "react";
import "./write.css";
import "../../styles/App.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import Stack from "@mui/material/Stack";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  Paper,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Bar from "../../modules/layout/bar";
import LocationSelect from "./locationSelect";
import { CircularProgress, Textarea } from "@mui/joy";

export default function Write() {
  // 이미지 업로드 객체
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get("locationid") || "";
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [base64, setBase64] = useState("");

  useEffect(() => {
    if (queryValue !== "") {
      const getPost = async () => {
        // 게시물 수정 시 기존 게시물 내용 가져오기
        const res = await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "SELECT",
            columns: "*",
            table: "location",
            where: `id=${queryValue}`,
          },
        );
        console.log(res);
        setPreviewImage(res.data[0].image);
        setTitle(res.data[0].title);
        setContent(res.data[0].content);
        setLocation(res.data[0].name);
      };
      try {
        getPost();
      } catch (e) {
        console.error(e);
      }
    }
  }, [queryValue]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        console.log("test : ", e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async (e) => {
    console.log("upload1");
    e.preventDefault();
    let selectedImageBase64, fileName;
    if (!previewImage && queryValue === "") {
      alert("사진을 업로드 해주세요");
      return;
    }
    if (!title) {
      alert("제목을 입력해주세요");
      return;
    }
    if (!location) {
      alert("지역을 선택해주세요");
      return;
    }
    selectedImageBase64 = await convertImageToBase64(selectedImage);
    if (selectedImage !== null) {
      fileName = selectedImage.name;
    }

    setOpen(true);
    if (queryValue !== "") {
      if (selectedImageBase64 === undefined) {
        try {
          await axios.post(
            "https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload",
            {
              /**API JSON 형식 참조하여 post 요청을 보내주세요**/
              id: queryValue,
              type: "post-update",
              name: location, // 지역명(seoul, jeju...)
              user_id: sessionStorage.id, // 사용자 id(test@test.com...)
              title: title, // 게시글 제목
              content: content, // 게시글 내용
            },
            10000,
          );
          navigate(`/board/${location}`);
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          // 업데이트
          await axios.post(
            "https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload",
            {
              /**API JSON 형식 참조하여 post 요청을 보내주세요**/
              type: "post-update",
              id: queryValue,
              fileName: fileName, // 저장할 파일명
              file: JSON.stringify(selectedImageBase64), // 파일 값
              name: location, // 지역명(seoul, jeju...)
              user_id: sessionStorage.id, // 사용자 id(test@test.com...)
              title: title, // 게시글 제목
              content: content, // 게시글 내용
            },
            10000,
          );
          navigate(`/board/${location}`);
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      try {
        // 새로운 글 작성
        await axios.post(
          "https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload",
          {
            type: "post",
            fileName: fileName, // 저장할 파일명
            file: JSON.stringify(selectedImageBase64), // 파일 값
            name: location, // 지역명(seoul, jeju...)
            user_id: sessionStorage.id, // 사용자 id(test@test.com...)
            title: title, // 게시글 제목
            content: content, // 게시글 내용
          },
          10000,
        );
        // 문제가 없을 경우 이전 페이지(지역 페이지)로 라우팅
        navigate(`/board/${location}`);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      if (image === null) {
        resolve(undefined);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result.split(",")[1]);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(image);
      }
    });
  };

  return (
    <div>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            zIndex: 9999, // 적절한 zIndex 값 설정
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Bar />
      <div className="write_cover">
        <div className="write_main">
          <div className="write_con">
            <div className="top">
              <h4 style={{ margin: "auto", display: "flex" }}>새 게시물</h4>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Dialog open={open}>
                    <DialogContent
                      className="row-center"
                      sx={{ width: "15vw", height: "15vh" }}
                    >
                      <DialogContentText>게시물 업로드 중</DialogContentText>
                    </DialogContent>
                  </Dialog>
                  <Button
                    data-cy="upload-btn"
                    variant="contained"
                    sx={{
                      color: "#FFF",
                      backgroundColor: "#045369",
                      width: "10vw",
                    }}
                    onClick={handleUpload}
                  >
                    업로드
                  </Button>
                </Stack>
              </div>
            </div>
            <hr />

            <div className={"middle"}>
              <input
                data-cy="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {/* <Input
                data-cy="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              /> */}
              {previewImage && (
                <Paper sx={{ height: "100%" }} elevation={3}>
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: "100%", height: "100%" }}
                  />
                </Paper>
              )}
            </div>
            <Box>
              <LocationSelect location={location} setLocation={setLocation} />
              <Textarea
                data-cy="title-input"
                onInput={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder={"제목"}
                minRows={1}
                maxRows={1}
                value={title}
              />
            </Box>

            <Textarea
              data-cy="content-input"
              onInput={(e) => {
                setContent(e.target.value);
              }}
              placeholder={"내용을 입력하세요"}
              minRows={20}
              value={content}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
