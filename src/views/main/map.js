import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import geo from "../../assets/data/geo.json";
import MainRandom from "./mainRandom.js";
import "./mainPageButton";

export const KakaoMap = (props) => {
  const { kakao } = window;
  const navigate = useNavigate();
  const [lat, setLat] = useState(36);
  const [lng, setLng] = useState(127.9);
  const [scale, setScale] = useState(12.8);
  const [heatMap, setHeatMap] = useState([
    { location: "seoul", num: 100 },
    { location: "gyeonggi", num: 100 },
    { location: "incheon", num: 100 },
    { location: "daejeon", num: 100 },
    { location: "busan", num: 100 },
    { location: "jeonnam", num: 100 },
    { location: "jeonbuk", num: 100 },
    { location: "chungbuk", num: 100 },
    { location: "chungnam", num: 100 },
    { location: "gangwon", num: 100 },
    { location: "gyeongnam", num: 100 },
    { location: "gyeongbuk", num: 100 },
    { location: "jeju", num: 100 },
    { location: "daegu", num: 100 },
    { location: "ulsan", num: 100 },
    { location: "sejong", num: 100 },
  ]);

  // 1336 x 843

  useEffect(() => {
    // 지도 크기 동적 지정
    const handleResize = () => {
      if (window.innerWidth < 1350 && window.innerHeight < 860) {
        // 너비 높이 둘다 줄어들떄
        setLng(129);
        setScale(13.3);
        setLat(35);
      } else if (window.innerWidth >= 1350 && window.innerHeight < 730) {
        // 높이만 줄어들떄
        setLat(35);
        setScale(13.3);
      } else if (window.innerWidth < 1350 && window.innerHeight >= 860) {
        // 너비만 줄어들때
        setScale(13.3);
        setLng(129);
      } else {
        setLng(127.9);
        setScale(12.8);
        setLat(36);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [lat, lng]);

  const [name, setName] = useState("대동YOUR지도");
  const [_name, _setName] = useState("");

  const customStyle = useMemo(
    () => [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          { hue: "#000000" },
          { saturation: -100 },
          { lightness: -100 },
        ],
      },
    ],
    [],
  );

  useEffect(() => {
    // 히트맵 정보 가져오기
    const getHitmap = async () => {
      for (let i = 0; i < 16; i++) {
        const res = await axios.post(
          "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
          {
            DML: "SELECT",
            columns: "*",
            table: "user, location",
            where: `user.email = location.user_id and name='${heatMap[i].location}' ORDER BY location.created_at desc`,
          },
        );
        const temp = [...heatMap];
        temp[i].num = res.data.length;
        setHeatMap(temp);
      }
    };
    getHitmap();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let data = geo.features; // 제대로 받아와짐
    let coordinates = [];
    let name = "";
    let polygons = [];

    const mapContainer = document.getElementById("kakao-map"); // 지도를 표시할 div

    const mapOption = {
      center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: scale,
      mapStyles: customStyle,
      draggable: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      disableDoubleClick: true,
      keyboardShortcuts: false,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const customOverlay = new kakao.maps.CustomOverlay({});

    const displayArea = (coordinates, name) => {
      let path = [];
      let points = [];

      coordinates[0].forEach((coordinate) => {
        let point = {};
        point.x = coordinate[1];
        point.y = coordinate[0];
        points.push(point); // console.log 찍어서 points 내용 확인해 볼 것.
        path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0])); // path와 points를 왜 따로?
      });

      let polygon;

      if (name === an) {
        polygon = new kakao.maps.Polygon({
          map: map,
          path: path,
          strokeWeight: 2,
          strokeColor: "#004c80",
          strokeOpacity: 1,
          strokeStyle: "solid",
          fillColor: "#045369",
          fillOpacity: 1,
        });
      } else {
        if (heatMap.find((item) => item.location === name).num >= 20) {
          polygon = new kakao.maps.Polygon({
            map: map,
            path: path,
            strokeWeight: 2,
            strokeColor: "#004c80",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
            fillColor: "#C1E2EC",
            fillOpacity: 1,
          });
        } else if (heatMap.find((item) => item.location === name).num >= 10) {
          polygon = new kakao.maps.Polygon({
            map: map,
            path: path,
            strokeWeight: 2,
            strokeColor: "#004c80",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
            fillColor: "#8EC2D1",
            fillOpacity: 1,
          });
        } else if (heatMap.find((item) => item.location === name).num >= 9) {
          polygon = new kakao.maps.Polygon({
            map: map,
            path: path,
            strokeWeight: 2,
            strokeColor: "#004c80",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
            fillColor: "#3E8A9E",
            fillOpacity: 1,
          });
        } else if (heatMap.find((item) => item.location === name).num >= 5) {
          polygon = new kakao.maps.Polygon({
            map: map,
            path: path,
            strokeWeight: 2,
            strokeColor: "#004c80",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
            fillColor: "#1B7389",
            fillOpacity: 1,
          });
        } else {
          polygon = new kakao.maps.Polygon({
            map: map,
            path: path,
            strokeWeight: 2,
            strokeColor: "#004c80",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
            fillColor: "#12596C",
            fillOpacity: 1,
          });
        }
      }

      polygons.push(polygon);

      if (name !== an) {
        kakao.maps.event.addListener(
          polygon,
          "mouseover",
          function (mouseEvent) {
            polygon.setOptions({ fillColor: "#09f" });
            setTimeout(() => {
              setName(name);
            }, 300)
            
          },
        );
        

        kakao.maps.event.addListener(
          polygon,
          "mousemove",
          function (mouseEvent) {
            polygon.setOptions({ fillColor: "#09f" });
          },
        );

        kakao.maps.event.addListener(polygon, "mouseout", function () {
          for (let i = 0; i < 16; i++) {
            if (heatMap.find((item) => item.location === name).num >= 20) {
              polygon.setOptions({ fillColor: "#C1E2EC" });
            } else if (
              heatMap.find((item) => item.location === name).num >= 10
            ) {
              polygon.setOptions({ fillColor: "#8EC2D1" });
            } else if (
              heatMap.find((item) => item.location === name).num >= 9
            ) {
              polygon.setOptions({ fillColor: "#3E8A9E" });
            } else if (
              heatMap.find((item) => item.location === name).num >= 5
            ) {
              polygon.setOptions({ fillColor: "#1B7389" });
            } else {
              polygon.setOptions({ fillColor: "#12596C" });
            }
          }

          customOverlay.setMap(null);
        });

        // route path 동적 지정
        kakao.maps.event.addListener(polygon, "click", function () {
          const url = "/board/" + name;
          navigate(url);
        });
      }
    };

    const a = [
      [
        [70.39585841112067, -120.05731889644466],
        [-21.89328257741898, -117.0690378863255],
        [-15.740631629181465, 44.298165191821724],
        [67.69644970888523, 36.5637908126899],
      ],
    ];
    const an = "New Polygon";

    displayArea(a, an);

    data.forEach((val) => {
      // features를 돌며 저장

      coordinates = val.geometry.coordinates;
      name = val.properties.CTP_ENG_NM;

      displayArea(coordinates, name);
    });
  }, [
    customStyle,
    heatMap,
    kakao.maps.CustomOverlay,
    kakao.maps.LatLng,
    kakao.maps.Map,
    kakao.maps.Polygon,
    kakao.maps.event,
    navigate,
    lat,
    lng,
    scale,
  ]);

  return (
    <div className="map-container">
      <div className="random-container">
        <div className="random-container2">
          <MainRandom name={name} />
        </div>
      </div>
      <div className="kakao-map" id="kakao-map" />
    </div>
  );
};
