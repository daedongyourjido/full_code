import React, { useEffect} from 'react';
import geo from './1.json';

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
  
    useEffect(() => {
  
      let data = geo.features; // 제대로 받아와짐
      let coordinates = []; 
      let name = '';
      let polygons = [];
      
      const mapContainer = document.getElementById('map1'); // 지도를 표시할 div

      const mapOption = {
        center: new kakao.maps.LatLng(36, 127.9), // 지도의 중심좌표
        level: 12.8,
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

    }, [customStyle, kakao.maps.CustomOverlay, kakao.maps.LatLng, kakao.maps.Map, kakao.maps.Polygon]);
  
    return (
    <div style={{height:'86.5%'}}>
        <div className='map' style={{ display: 'grid', gridTemplateColumns: '1fr 2fr'}}>
            <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', padding: '50px', width:'88vh' }}>
                {props.component}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div id="map1" style={{ width: "100%", height: "100%"}} />
            </div>
      </div>
    </div>
    );
  };