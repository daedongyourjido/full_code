import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import geo from './1.json';
import MainRandom from './mainRandom.js';
import './style.css';

export const KakaoMap = (props) => {
    const { kakao } = window;
    const navigate = useNavigate();
    const [lat, setLat] = useState(36);
    const [lng, setLng] = useState(127.9);
    const [scale, setScale] = useState(12.8);

    // 1336 x 843

    useEffect(() => {   // 지도 크기 동적 지정
      const handleResize = () => {
        if(window.innerWidth < 1350){
          setLng(129);
          setScale(13.3);
        }
        else {
          setLng(127.9);
          setScale(12.8);
        }

        if(window.innerHeight < 860) {
          setLat(35);
          setScale(13.3);
        }
        else  {
          setLat(36);
          setScale(12.8);
        }
          
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    

    const [name, setName] = useState("대동YOUR지도");
    // const [msg, setMsg] = useState('');
  
    const customStyle = useMemo(() => [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          { hue: "#000000" },
          { saturation: -100 },
          { lightness: -100 },
        ],
      }
    ], []);
  
    
    axios("") // 히트맵 정보 받기
    .then()
    .catch()

    const heatMap = useMemo(() => {
      return {seoul:100, gyeonggi:70, incheon:80, daejeon:10, busan:80, jeonnam:20, jeonbuk:40, chungbuk:50, chungnam:60, gangwon:70, gyeongnam:30, gyeongbuk:60, jeju:90, daegu:60, ulsan:20, sejong:30}
    }, []);
  
    useEffect(() => {
  
      let data = geo.features; // 제대로 받아와짐
      let coordinates = []; 
      let name = '';
      let polygons = [];
        
      const mapContainer = document.getElementById('kakao-map'); // 지도를 표시할 div

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
          path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));  // path와 points를 왜 따로?
        });        
  
        let polygon;
          if(name === an) {
            polygon = new kakao.maps.Polygon({
              map: map,
              path: path, 
              strokeWeight: 2, 
              strokeColor: '#004c80', 
              strokeOpacity: 1, 
              strokeStyle: 'solid', 
              fillColor: '#045369',
              fillOpacity: 1, 
            });
          } else{
            if(heatMap[name] >= 90){
                polygon = new kakao.maps.Polygon({
                    map: map,
                    path: path, 
                    strokeWeight: 2, 
                    strokeColor: '#004c80', 
                    strokeOpacity: 0.8, 
                    strokeStyle: 'solid', 
                    fillColor: '#C1E2EC',
                    fillOpacity: 1, 
                  });
            } else if(heatMap[name] >= 70){
                polygon = new kakao.maps.Polygon({
                    map: map,
                    path: path, 
                    strokeWeight: 2, 
                    strokeColor: '#004c80', 
                    strokeOpacity: 0.8, 
                    strokeStyle: 'solid', 
                    fillColor: '#8EC2D1',
                    fillOpacity: 1, 
                  });
            } else if(heatMap[name] >= 50){
                polygon = new kakao.maps.Polygon({
                    map: map,
                    path: path, 
                    strokeWeight: 2, 
                    strokeColor: '#004c80', 
                    strokeOpacity: 0.8, 
                    strokeStyle: 'solid', 
                    fillColor: '#3E8A9E',
                    fillOpacity: 1, 
                  });
            } else if(heatMap[name] >= 30){
                polygon = new kakao.maps.Polygon({
                    map: map,
                    path: path, 
                    strokeWeight: 2, 
                    strokeColor: '#004c80', 
                    strokeOpacity: 0.8, 
                    strokeStyle: 'solid', 
                    fillColor: '#1B7389',
                    fillOpacity: 1, 
                  });
            } else {
                polygon = new kakao.maps.Polygon({
                    map: map,
                    path: path, 
                    strokeWeight: 2, 
                    strokeColor: '#004c80', 
                    strokeOpacity: 0.8, 
                    strokeStyle: 'solid', 
                    fillColor: '#12596C',
                    fillOpacity: 1, 
                  });
            }
          }
        polygons.push(polygon);

        if (name !== an) {
          kakao.maps.event.addListener(polygon, "mouseover", function (mouseEvent) {
            polygon.setOptions({ fillColor: "#09f" });

            setName(name);

          });
  
          kakao.maps.event.addListener(polygon, "mousemove", function (mouseEvent) {
            polygon.setOptions({ fillColor: "#09f" });
          });
  
          kakao.maps.event.addListener(polygon, 'mouseout', function () {
            if(heatMap[name] >= 90){
                polygon.setOptions({ fillColor: '#C1E2EC' });
            } else if(heatMap[name] >= 70){
                polygon.setOptions({ fillColor: '#8EC2D1' });
            } else if(heatMap[name] >= 50){
                polygon.setOptions({ fillColor: '#3E8A9E' });
            } else if(heatMap[name] >= 30){
                polygon.setOptions({ fillColor: '#1B7389' });
            } else {
                polygon.setOptions({ fillColor: '#12596C' });
            }
            
            customOverlay.setMap(null);
          });

          // route path 동적 지정
          kakao.maps.event.addListener(polygon, 'click', function () {
            const url = '/board/' + name;
            navigate(url);
          });
      }
      };
  
      const a = [
        [
          [70.39585841112067, -120.05731889644466],
          [-21.89328257741898, -117.0690378863255],
          [-15.740631629181465, 44.298165191821724],
          [67.69644970888523, 36.5637908126899]
        ]
      ];
      const an = 'New Polygon';
  
      displayArea(a, an);

      data.forEach((val) => {   // features를 돌며 저장
  
        coordinates = val.geometry.coordinates;
        name = val.properties.CTP_ENG_NM;
  
        displayArea(coordinates, name);
      });

  
    }, [customStyle, heatMap, kakao.maps.CustomOverlay, kakao.maps.LatLng, kakao.maps.Map, kakao.maps.Polygon, kakao.maps.event, navigate, lat, lng, scale]);
  
    return (
      <div className='map-container'>
        <div className='random-container'>
          <div className='random-container2'>
            <MainRandom name={name} />
          </div>
        </div>
        <div className='kakao-map' id="kakao-map" />
      </div>
    );
  };