import React, { useEffect, useState } from 'react';
import geo from '../../assets/data/geo.json';


export default function MenuMap (props) {
    const { kakao } = window;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const customStyle = [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          {
            hue: "#000000",
          },
          {
            saturation: -100,
          },
          {
            lightness: -100,
          },
        ],
      },
    ];

    const [lat, setLat] = useState(36);
    const [lng, setLng] = useState(127.9);
    const [scale, setScale] = useState(12.8);

    // 1336 x 843

    useEffect(() => {   // 지도 크기 동적 지정
      const handleResize = () => {
        if(window.innerWidth < 1350 && window.innerHeight < 860){  // 너비 높이 둘다 줄어들떄
          setLng(129);
          setScale(13.3);
          setLat(35);
        }
        else if (window.innerWidth >= 1350 && window.innerHeight < 860) {  // 높이만 줄어들떄
          setLat(35);
          setScale(13.3);
        }
        else if (window.innerWidth < 1350 && window.innerHeight >= 860) {   // 너비만 줄어들때
          setScale(13.3);
          setLng(129);
        }
        else {
          setLng(127.9);
          setScale(12.8);
          setLat(36);
        }
          
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [lat, lng]);
  
    useEffect(() => {
  
      let data = geo.features; // 제대로 받아와짐
      let coordinates = []; 
      let name = '';
      let polygons = [];
      
      const mapContainer = document.getElementById('map1'); // 지도를 표시할 div

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
          } else{ polygon = new kakao.maps.Polygon({
                    map: map,
                    path: path, 
                    strokeWeight: 2, 
                    strokeColor: '#004c80', 
                    strokeOpacity: 0.8, 
                    strokeStyle: 'solid', 
                    fillColor: '#D4E6EB',
                    fillOpacity: 1, 
                  });
            } 

        polygons.push(polygon);
            
            customOverlay.setMap(null);
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

    }, [customStyle, kakao.maps.CustomOverlay, kakao.maps.LatLng, kakao.maps.Map, kakao.maps.Polygon, lat, lng, scale]);
  
    return (
    <div style={{height:'86.5%'}}>
        <div className='map' style={{ display: 'flex'}}>
            <div className='menu-component-container'>
                {props.component}
            </div>
            <div className='menu-map-container'>
                <div id="map1" style={{ width: "100%", height: "100%"}} />
            </div>
      </div>
    </div>
    );
  };