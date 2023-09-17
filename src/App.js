import "@styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@styles/index.css";
import Pages from "./Pages";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const viewStyle = {
    textAlign: "center",
    marginTop: "2rem",
    color: "white",
    fontFamily: "Arial, sans-serif",
  };

  const mobileContainer = {
    display: "grid",
    placeItems: "center",
    height: "100vh",
  };

  // 화면 크기를 감지하는 함수
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때 화면 크기를 감지
  useEffect(() => {
    handleResize(); // 초기 설정

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 리스너를 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      {isMobile ? (
        <Routes>
          <Route
            path="/*"
            element={
              <div style={mobileContainer}>
                <Container maxWidth="sm" style={viewStyle}>
                  <Typography variant="h4" gutterBottom>
                    현재 모바일 환경에서
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    실행 중입니다.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    대동유어지도는 PC 화면에서만 제공됩니다.
                  </Typography>
                </Container>
              </div>
            }
          />
        </Routes>
      ) : (
        <Pages />
      )}
    </BrowserRouter>
  );
}

export default App;
