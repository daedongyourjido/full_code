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
  Input,
  Paper
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

  function convert1(imgUrl, callback) {
    const image = new Image();
    image.crossOrigin='anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL();
      callback && callback(dataUrl)
    }
    image.src = imgUrl;
  }

  function convert2(imageUrl, callback) {
    fetch(imageUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin', 
    })
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof callback === 'function') {
            callback(reader.result);
          }
        };
        reader.readAsDataURL(blob);
      });
  } 

  useEffect(() => {
    convert1(previewImage, (base64Image) => {
      console.log("convert 1 : ", base64Image);
    })
    convert2(previewImage, (base64Image) => {
      console.log("convert 2 : ", base64Image);
    })
    convert2("https://2023-c-capstone.s3.us-east-2.amazonaws.com/location/sjhong98@icloud.com/IMG_6095-2.jpg", (base64Image) => {
      setBase64(base64Image)
    })
  }, [previewImage]);



  useEffect(() => {
    if (queryValue !== "") {  // 게시물 수정 시 기존 게시물 내용 가져오기
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
          console.log(res);
          setPreviewImage(res.data[0].image);
          setTitle(res.data[0].title);
          setContent(res.data[0].content);
          setLocation(res.data[0].name);

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

    if(queryValue === "") {
      selectedImageBase64 = await convertImageToBase64(selectedImage);
      console.log("photo:", JSON.stringify(selectedImageBase64));
      fileName = selectedImage.name;
      console.log('filename:', fileName);
    }

    setOpen(true);

    if (queryValue !== "") {  // 업데이트
      axios
        .post(
          "https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload",
          {
            /**API JSON 형식 참조하여 post 요청을 보내주세요**/
            type: "post-update",
            fileName: "updateFile", // 저장할 파일명
            file: previewImage,  
            name: location, // 지역명(seoul, jeju...)
            user_id: sessionStorage.id, // 사용자 id(test@test.com...)
            title: title, // 게시글 제목
            content: content, // 게시글 내용
          }, 10000
        )
        // 문제가 없을 경우 이전 페이지(지역 페이지)로 라우팅
        .then((res) => {
          console.log("===== update =====", 
                      "\n수정된 제목 : ", title, 
                      "\n수정된 내용 : ", content, 
                      "\nPreviewImage : ", previewImage);
          navigate(`/board/${location}`);
        })
        .catch((error) => {
          console.log("error : ", error);
        });

    } else {  // 새로운 글 작성
      axios
        .post(
          "https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload",
          {
            type: "post",
            fileName: fileName, // 저장할 파일명
            file: JSON.stringify("data:image/png;base64,PCFkb2N0eXBlIGh0bWw+PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9InV0Zi04Ii8+PGxpbmsgcmVsPSJpY29uIiBocmVmPSIvZmF2aWNvbi5pY28iLz48bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MSIvPjxtZXRhIG5hbWU9InRoZW1lLWNvbG9yIiBjb250ZW50PSIjMDAwMDAwIi8+PG1ldGEgbmFtZT0iZGVzY3JpcHRpb24iIGNvbnRlbnQ9IldlYiBzaXRlIGNyZWF0ZWQgdXNpbmcgY3JlYXRlLXJlYWN0LWFwcCIvPjxsaW5rIHJlbD0iYXBwbGUtdG91Y2gtaWNvbiIgaHJlZj0iL2xvZ28xOTIucG5nIi8+PGxpbmsgcmVsPSJtYW5pZmVzdCIgaHJlZj0iL21hbmlmZXN0Lmpzb24iLz48dGl0bGU+64yA64+Z7Jyg7Ja07KeA64+EPC90aXRsZT48bWV0YSBjaGFyc2V0PSJ1dGYtOCIvPjxsaW5rIHJlbD0iaWNvbiIgaHJlZj0iL2Zhdmljb24uaWNvIi8+PG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCxpbml0aWFsLXNjYWxlPTEiLz48c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCIgc3JjPSIvL2RhcGkua2FrYW8uY29tL3YyL21hcHMvc2RrLmpzP2FwcGtleT00NDBlYTA5NzM5ZjkxMTM5YmVkNTA0YTg1ZTM3MDAzZiI+PC9zY3JpcHQ+PHNjcmlwdCBkZWZlcj0iZGVmZXIiIHNyYz0iL3N0YXRpYy9qcy9tYWluLjE2N2M4YjkxLmpzIj48L3NjcmlwdD48bGluayBocmVmPSIvc3RhdGljL2Nzcy9tYWluLjQxZmZkNmE1LmNzcyIgcmVsPSJzdHlsZXNoZWV0Ij48L2hlYWQ+PGJvZHk+PG5vc2NyaXB0PllvdSBuZWVkIHRvIGVuYWJsZSBKYXZhU2NyaXB0IHRvIHJ1biB0aGlzIGFwcC48L25vc2NyaXB0PjxkaXYgaWQ9InJvb3QiPjwvZGl2PjxkaXYgaWQ9Im1hcCI+PC9kaXY+PC9ib2R5PjwvaHRtbD4="),
            // file: JSON.stringify(selectedImageBase64), // 파일 값
            name: location, // 지역명(seoul, jeju...)
            user_id: sessionStorage.id, // 사용자 id(test@test.com...)
            title: title, // 게시글 제목
            content: content, // 게시글 내용
          }, 10000
        )
        // 문제가 없을 경우 이전 페이지(지역 페이지)로 라우팅
        .then((res) => {
          console.log("new-post", base64, "-end");
          navigate(`/board/${location}`);
        })
        .catch((error) => {
          console.log("error 2 : ", error);
        });
    }
  };

  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      if(queryValue === "") {
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
                    <Dialog
                      open={open}
                    >
                      <DialogContent
                        className="row-center"
                        sx={{width: "15vw",
                              height: "15vh" }}>
                        <DialogContentText>
                          게시물 업로드 중
                        </DialogContentText>
                      </DialogContent>
                    </Dialog>
                    <Button
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
              <LocationSelect 
                location={location} 
                setLocation={setLocation} />
              <Textarea
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

