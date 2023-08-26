import React, { useEffect, useState } from "react";
import "./write.css";
import "../../styles/App.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import { Button, Input, Paper } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Bar from "../../modules/layout/bar";
import LocationSelect from "./locationSelect";
import { CircularProgress, Textarea } from "@mui/joy";
export default function Write() {
  // 이미지 업로드 객체
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [location, setLocation] = useState("");

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [login, setLogin] = useState(false);

  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get("locationid") || "";

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (queryValue !== "") {
      axios
        .post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "SELECT",
            columns: "*",
            table: "location",
            where: `id=${queryValue}`,
          },
        )
        .then((res) => {
          setPreviewImage(res.data[0].image);
          setTitle(res.data[0].title);
          setContent(res.data[0].content);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [queryValue]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    let selectedImageBase64, fileName;

    if (!selectedImage) {
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
    fileName = selectedImage.name;
    setLoading(true);
    if (queryValue !== "") {
      /** 게시글 업로드 api 추가 **/
      axios
        .post(
          "https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload",
          {
            /**API JSON 형식 참조하여 post 요청을 보내주세요**/
            type: "post-update",
            fileName: fileName, // 저장할 파일명
            file: JSON.stringify(selectedImageBase64), // 파일 값
            name: location, // 지역명(seoul, jeju...)-  > @승재) user로부터 location 직접 지정받음
            id: queryValue,
            title: title, // 게시글 제목
            content: content, // 게시글 내용
          },
        )
        // 문제가 없을 경우 이전 페이지(지역 페이지)로 라우팅
        .then((res) => {
          navigate(`/board/${location}`);
        })
        .catch((error) => {
          console.log("error 1 : ", error);
        });
    } else {
      /** 게시글 업로드 api 추가 **/
      axios
        .post(
          "https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload",
          {
            /**API JSON 형식 참조하여 post 요청을 보내주세요**/
            type: "post",
            fileName: fileName, // 저장할 파일명
            file: JSON.stringify(selectedImageBase64), // 파일 값
            name: location, // 지역명(seoul, jeju...)
            user_id: sessionStorage.id, // 사용자 id(test@test.com...)
            title: title, // 게시글 제목
            content: content, // 게시글 내용
          },
        )
        // 문제가 없을 경우 이전 페이지(지역 페이지)로 라우팅
        .then((res) => {
          navigate(`/board/${location}`);
        })
        .catch((error) => {
          console.log("error : ", sessionStorage.id, location);
          console.log("error 2 : ", error);
        });
    }
  };

  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result.split(",")[1]);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(image);
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
              <Button
                style={{ position: "absolute", right: "0%", padding: "18px" }}
                variant="contained"
                color="primary"
                onClick={handleUpload}
              >
                업로드
              </Button>
            </div>
            <hr />

            <div className={"middle"}>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
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
              <Textarea
                onInput={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder={"제목"}
                minRows={1}
                maxRows={1}
              />
              <LocationSelect location={location} setLocation={setLocation} />
            </Box>

            <Textarea
              onInput={(e) => {
                setContent(e.target.value);
              }}
              placeholder={"내용을 입력하세요"}
              minRows={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
