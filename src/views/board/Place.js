import "./board.css";
import "../../styles/App.css";
import React, { useState, useEffect } from "react";
import { TbBuildingCommunity } from "react-icons/tb";
import { BsPinMap } from "react-icons/bs";
import { MdFoodBank } from "react-icons/md";
import SimpleSlider from "./slider";
import ImageCollection from "./image_Collection";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Bar from "../../modules/layout/bar.js";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
// import FiberNewIcon from '@mui/icons-material/FiberNew';

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

function PostLoading() {
  return (
    <div className="post-loading">
      <Skeleton variant="rectangular" width="19vw" height="19vw" />
      <Skeleton variant="rectangular" width="19vw" height="19vw" />
      <Skeleton variant="rectangular" width="19vw" height="19vw" />
      <Skeleton variant="rectangular" width="19vw" height="19vw" />
      <Skeleton variant="rectangular" width="19vw" height="19vw" />
      <Skeleton variant="rectangular" width="19vw" height="19vw" />
      <Skeleton variant="rectangular" width="19vw" height="19vw" />
      <Skeleton variant="rectangular" width="19vw" height="19vw" />
      <Skeleton variant="rectangular" width="19vw" height="19vw" />
    </div>
  );
}

function RandomPostLoading() {
  return <Skeleton variant="rectangular" width="30vw" height="30vw" />;
}

function Place() {
  const [userLocationInfo, setUserLocationInfo] = useState([]);
  const [userLocationInfoDesc, setUserLocationInfoDesc] = useState([]);
  const [userLocationInfoAsc, setUserLocationInfoAsc] = useState([]);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const deleteDialogOpen = useSelector((state) => state.deleteDialogOpen);

  const loc = useLocation();
  const paths = loc.pathname.split("/");
  const lastPath = paths[paths.length - 1];

  const locationName = (loc) => {
    if (loc === "seoul") setLocation("서울");
    else if (loc === "daegu") setLocation("대구");
    else if (loc === "ulsan") setLocation("울산");
    else if (loc === "busan") setLocation("부산");
    else if (loc === "chungbuk") setLocation("충청북도");
    else if (loc === "chungnam") setLocation("충청남도");
    else if (loc === "gyeonggi") setLocation("경기도");
    else if (loc === "gangwon") setLocation("강원도");
    else if (loc === "jeonnam") setLocation("전라남도");
    else if (loc === "jeonbuk") setLocation("전라북도");
    else if (loc === "incheon") setLocation("인천");
    else if (loc === "sejong") setLocation("세종");
    else if (loc === "daejeon") setLocation("대전");
    else if (loc === "jeju") setLocation("제주");
    else if (loc === "gyeongnam") setLocation("경상남도");
    else setLocation("경상북도");
  };

  useEffect(() => {
    locationName(lastPath);
  }, [lastPath]);

  // const [login, setLogin] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getUserLocationInfoDesc = async () => {
      const res = await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "user, location",
          where: `user.email = location.user_id and name='${lastPath}' ORDER BY location.created_at desc`,
        },
      );
      setUserLocationInfoDesc(res.data);
    };
    const getUserLocationInfoAsc = async () => {
      const res = await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "user, location",
          where: `user.email = location.user_id and name='${lastPath}' ORDER BY location.created_at asc`,
        },
      );
      setUserLocationInfoAsc(res.data);
    };
    const getUserLocationInfo = async () => {
      const res = await axios.post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "user, location",
          where: `user.email = location.user_id and name='${lastPath}' ORDER BY location.like_count desc`,
        },
      );
      setUserLocationInfo(res.data);
    };
    try {
      getUserLocationInfoDesc();
      getUserLocationInfoAsc();
      getUserLocationInfo();
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }, [lastPath, isLoading]);

  return (
    <div className="App">
      <Bar main={false} />

      <div className="contents">
        <div className="left-container">
          <h1>{location}</h1>
          <h3>추천게시물</h3>
          {isLoading ? (
            <RandomPostLoading />
          ) : (
            <div className="slider-container">
              <SimpleSlider userLocationInfo={userLocationInfo} />
            </div>
          )}
        </div>

        <div className="main" style={{ margin: "auto" }}>
          <div className="left-space" />
          <div className="space">
            <div style={{ width: "100%", height: "100%" }}>
              <div className="tab-container">
                <Tabs
                  sx={{
                    display: "inline-flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  style={{ width: "100%" }}
                  value={value}
                  className="tab"
                  onChange={handleChange}
                  aria-label="icon label tabs example"
                  centered
                >
                  <Tab
                    icon={
                      <MdFoodBank
                        color={"white"}
                        {...a11yProps(0)}
                        id="icon1"
                        size="70px"
                      />
                    }
                    sx={{ color: "white" }}
                    iconPosition="start"
                    label="최신순"
                  />
                  <Tab
                    icon={
                      <TbBuildingCommunity
                        color={"white"}
                        {...a11yProps(1)}
                        id="icon2"
                        size="50px"
                      />
                    }
                    sx={{ color: "white" }}
                    iconPosition="start"
                    label="오래된순"
                  />
                  <Tab
                    icon={
                      <BsPinMap
                        color={"white"}
                        {...a11yProps(2)}
                        id="icon3"
                        size="45px"
                      />
                    }
                    sx={{ color: "white" }}
                    iconPosition="start"
                    label="추천순"
                  />
                </Tabs>
              </div>

              {isLoading ? (
                <PostLoading />
              ) : (
                <div>
                  <CustomTabPanel // 최신순
                    value={value}
                    index={0}
                    className="post-tab-container"
                  >
                    {userLocationInfoDesc === undefined ? (
                      ""
                    ) : (
                      <ImageCollection
                        userLocationInfo={userLocationInfoDesc}
                        lastPath={lastPath}
                      />
                    )}
                  </CustomTabPanel>

                  <CustomTabPanel // 오래된순
                    value={value}
                    index={1}
                    className="post-tab-container"
                  >
                    {userLocationInfoAsc === undefined ? (
                      ""
                    ) : (
                      <ImageCollection
                        userLocationInfo={userLocationInfoAsc}
                        lastPath={lastPath}
                      />
                    )}
                  </CustomTabPanel>

                  <CustomTabPanel // 추천순
                    value={value}
                    index={2}
                    className="post-tab-container"
                  >
                    {userLocationInfo === undefined ? (
                      ""
                    ) : (
                      <ImageCollection
                        userLocationInfo={userLocationInfo}
                        lastPath={lastPath}
                      />
                    )}
                  </CustomTabPanel>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Dialog open={deleteDialogOpen}>
              <DialogContent
                className="row-center"
                sx={{ width: "15vw", height: "15vh" }}
              >
                <DialogContentText>게시물 삭제 중</DialogContentText>
              </DialogContent>
            </Dialog>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Place;
