import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./main.css";
import { useSelector, useDispatch } from "react-redux";
import { setImages } from "../../redux/actions.js";
import Skeleton from "@mui/material/Skeleton";

function Arrow() {
  return <div style={{ display: "block", background: "#045369" }} />;
}

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "-10vw",
      }}
    >
      <Skeleton
        sx={{ marginRight: "15px" }}
        variant="rounded"
        width={120}
        height={80}
      />
      <Skeleton
        sx={{ marginRight: "15px" }}
        variant="rounded"
        width={120}
        height={80}
      />
      <Skeleton
        sx={{ marginRight: "15px" }}
        variant="rounded"
        width={120}
        height={80}
      />
      <Skeleton
        sx={{ marginRight: "15px" }}
        variant="rounded"
        width={120}
        height={80}
      />
      <Skeleton
        sx={{ marginRight: "15px" }}
        variant="rounded"
        width={120}
        height={80}
      />
    </div>
  );
}

function Content(props) {
  const images = useSelector((state) => state.images);

  // useEffect(() => {
  //   for(const key in images){
  //     if(images[key].length > 2)
  //       images[key] = images[key].slice(0, 2);
  //   }
  //   console.log(images);
  // }, [images]);

  const settings = {
    infinite: true,
    /**@MARK: 2로 지정하니 이미지 두 번 나와서 1로 바꿔뒀어요**/
    // 2개로 지정해야 모션 안깨짐
    slidesToShow: 2,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1700,
    variableWidth: true,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  const imgStyle = {
    width: "auto",
    height: "143px",
    borderRadius: "5%",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
  };
  const _name = props.name;

  return (
    <Slider {...settings}>
      {images[_name] ? (
        images[_name].map((ele, index) => (
          <div key={index}>
            <img
              className="randomImages"
              src={ele.image}
              style={imgStyle}
              alt={"..."}
            />
          </div>
        ))
      ) : (
        <Loading />
      )}
    </Slider>
  );
}

function MainRandom(props) {
  const [name, setName] = useState("Welcome to 대동유어지도");
  const [infos, setInfos] = useState({});
  // const [login, setLogin] = useState('false');
  const _name = props.name;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const _location = useMemo(() => {
    return [
      "seoul",
      "gyeonggi",
      "incheon",
      "daejeon",
      "busan",
      "jeonnam",
      "jeonbuk",
      "chungbuk",
      "chungnam",
      "gangwon",
      "gyeongnam",
      "gyeongbuk",
      "jeju",
      "daegu",
      "ulsan",
      "sejong",
    ];
  }, []);

  useEffect(() => {
    if (Object.keys(infos).length !== 0) {
      dispatch(setImages(infos));
      return;
    }

    const fetchData = async () => {
      return new Promise(async (resolve, reject) => {
        let infos = {};
        for (let i = 0; i < _location.length; i++) {
          const res = await axios.post(
            "https://qzqejgzukh.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-main-random",
            {
              location: _location[i],
            },
          );
          infos[_location[i]] = res.data;
        }
        setInfos(infos);
        resolve(infos);
        reject(new Error("error"));
      });
    };

    fetchData().catch((err) => {
      console.log(err);
    });
    setIsLoading(false);
    console.log("check");
    // eslint-disable-next-line
  }, [dispatch, infos]);

  useEffect(() => {
    if (_name === "seoul") setName("서울");
    else if (_name === "gyeonggi") setName("경기");
    else if (_name === "incheon") setName("인천");
    else if (_name === "daejeon") setName("대전");
    else if (_name === "busan") setName("부산");
    else if (_name === "jeonnam") setName("전라남도");
    else if (_name === "jeonbuk") setName("전라북도");
    else if (_name === "chungbuk") setName("충청북도");
    else if (_name === "chungnam") setName("충청남도");
    else if (_name === "gangwon") setName("강원");
    else if (_name === "gyeongnam") setName("경상남도");
    else if (_name === "gyeongbuk") setName("경상북도");
    else if (_name === "jeju") setName("제주");
    else if (_name === "daegu") setName("대구");
    else if (_name === "ulsan") setName("울산");
    else if (_name === "sejong") setName("세종");
  }, [_name]); // props.name 값이 바뀔 때만 useEffect 실행

  return (
    <div className="main-random">
      <h1 style={{ display: "flex", justifyContent: "center" }}>{name}</h1>
      {name === "Welcome to 대동유어지도" ? (
        <p></p>
      ) : (
        <Content name={_name} location={_location} isLoading={isLoading} />
      )}
    </div>
  );
}

export default MainRandom;
