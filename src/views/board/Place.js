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
import Bar from '../../modules/layout/bar.js';
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

function Place() {
  const [userLocationInfo, setUserLocationInfo] = useState([]);
  const [userLocationInfoDesc, setUserLocationInfoDesc] = useState([]);
  const [userLocationInfoAsc, setUserLocationInfoAsc] = useState([]);

  const loc = useLocation();
  const paths = loc.pathname.split("/");
  const lastPath = paths[paths.length - 1];

  // const [login, setLogin] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   // token 여부에 반응하여 로그인 여부 판단
  //   const token = sessionStorage.getItem("id");
  //   if (token) {
  //     setLogin(true);
  //   } else {
  //     setLogin(false);
  //   }
  // }, []);

  useEffect(() => {
    axios
      .post(
        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
        {
          DML: "SELECT",
          columns: "*",
          table: "location",
          where: `name='${lastPath}' ORDER BY created_at desc`,
        },
      )
      .then((res) => {
        setUserLocationInfoDesc(res.data);
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
          table: "location",
          where: `name='${lastPath}' ORDER BY created_at asc`,
        },
      )
      .then((res) => {
        setUserLocationInfoAsc(res.data);
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
          table: "location",
          where: `name='${lastPath}' ORDER BY like_count desc`,
        },
      )
      .then((res) => {
        setUserLocationInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lastPath]);

  return (
    <div className="App">
      <Bar />

      <div className="contents">

          <div className="left-container">
            <h1>{lastPath}</h1>
            <h3>추천게시물</h3>
            <div className="slider-container">
              <SimpleSlider userLocationInfo={userLocationInfo} />
            </div>
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
                    className='tab'
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
                      sx={{color:'white'}}
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
                      sx={{color:'white'}}
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
                      sx={{color:'white'}}
                      iconPosition="start"
                      label="추천순"
                    />
                  </Tabs>
                </div>

                <CustomTabPanel     // 최신순
                  value={value}
                  index={0}
                  className="post-tab-container"
                >
                  <ImageCollection
                    userLocationInfo={userLocationInfoDesc}
                    lastPath={lastPath}
                  />
                </CustomTabPanel>

                <CustomTabPanel     // 오래된순
                  value={value}
                  index={1}
                  className="post-tab-container"
                >
                  <ImageCollection
                    userLocationInfo={userLocationInfoAsc}
                    lastPath={lastPath}
                  />
                </CustomTabPanel>
                
                <CustomTabPanel     // 추천순
                  value={value}
                  index={2}
                  className="post-tab-container"
                >
                  <ImageCollection
                    userLocationInfo={userLocationInfo}
                    lastPath={lastPath}
                  />
                </CustomTabPanel>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Place;
