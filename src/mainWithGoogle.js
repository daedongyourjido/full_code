import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import { GoogleMap, Polygon, withGoogleMap } from 'react-google-maps';
import geo from './1.json';

const mapStyle = [
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "saturation": 36
      },
      {
        "color": "#000000"
      },
      {
        "lightness": 40
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "visibility": "on"
        },
        {
            "color": "#000000"
        },
        {
            "lightness": 16
        }
    ]
},
{
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#0f252e"
        },
        {
            "lightness": 17
        },
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 17
        },
        {
            "weight": 1.2
        },
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "labels.text",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "administrative.locality",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "visibility": "off"
        },
        {
            "color": "#000000"
        }
    ]
},
{
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
        {
            "color": "#fffcfc"
        },
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "administrative.locality",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "color": "#0f252e"
        },
        {
            "visibility": "on"
        }
    ]
},
{
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#0f252e"
        },
        {
            "lightness": 17
        }
    ]
},
{
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 21
        }
    ]
},
{
    "featureType": "road",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 17
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 29
        },
        {
            "weight": 0.2
        }
    ]
},
{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 18
        }
    ]
},
{
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 16
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 19
        },
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "transit.line",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#0f252e"
        },
        {
            "lightness": 17
        }
    ]
}
];


const WrappedMap = withGoogleMap(props => {
    const [polygonOptions, setPolygonOptions] = useState({
      paths: [],
      strokeColor: '#045369',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FFFFFF',
      fillOpacity: 1,
    });
  
    const polygons = geo.features.flatMap(feature => {
      const coordinates = feature.geometry.coordinates[0].map(coordinate => ({
        lat: coordinate[1],
        lng: coordinate[0],
      }));
  
      const options = {
        ...polygonOptions,
        paths: coordinates,
      };
  
      return (
        <Polygon
          key={feature.properties.CTPRVN_CD}
          options={options}
          onMouseOver={() => {
            setPolygonOptions(prevOptions => ({
              ...prevOptions,
              fillColor: '#000000'
            }));
          }}
          onMouseOut={() => {
            setPolygonOptions(prevOptions => ({
              ...prevOptions,
              fillColor: '#FFFFFF'
            }));
          }}
        />
      );
    });
  
    useEffect(() => {
      if (!map) return;
  
      const listener = map.addListener('mouseover', () => {
        setPolygonOptions(prevOptions => ({
          ...prevOptions,
          fillColor: '#000000'
        }));
      });
  
      return () => {
        google.maps.event.removeListener(listener);
      };
    }, [map]);
  
    useEffect(() => {
      if (!map) return;
  
      const listener = map.addListener('mouseout', () => {
        setPolygonOptions(prevOptions => ({
          ...prevOptions,
          fillColor: '#FFFFFF'
        }));
      });
  
      return () => {
        google.maps.event.removeListener(listener);
      };
    }, [map]);
  
    return (
      <GoogleMap
        defaultZoom={7.47}
        defaultCenter={{ lat: 35.95, lng: 127.5 }}
        options={{
          styles: mapStyle,
          disableDefaultUI: true,
          disableDoubleClickZoom: true,
          gestureHandling: 'none'
        }}
        onLoad={props.onLoad}
        onUnmount={props.onUnmount}
        onTilesLoaded={props.onTilesLoaded}
        onBoundsChanged={props.onBoundsChanged}
      >
        {polygons}
      </GoogleMap>
    );
  }); 
  
  
  
  
  
  
  function Map() {
    const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);
  
    return (
      <div style={{ height: '85vh', width: '60vh' }}>
        <WrappedMap
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          onLoad={onLoad}
        />
      </div>
    );
  }

function Text() {
    return (
        <h1 style={{padding:'20px'}}>Main</h1>
    )
}

function LinkAbout() {
  return (
    <div>
      <Link to='/about'>Go to About</Link>
    </div>
  )
}

function LinkLogin() {
  const location = useLocation();
  const id = location.state?.id;

  return (
    <div>
      {id? <Link to='/setting'>Setting</Link> : <Link type='button' style={{backgroundColor:'gray', color:'white', padding:'5px', border:'solid'}} to='/login'>LogIn</Link>}
    </div>
  )
}

function LogInOrOut() {
  const location = useLocation();
  const id = location.state?.id;  // localStorage에 저장된 토큰 있는지 확인

  return (
    <div>
      {id? <p>{id}님 어서오세요</p> : <p>로그인하세요</p>}
    </div>
  )
}

function LinkSignUp() {
  const location = useLocation();
  const id = location.state?.id;

  return (
    <div>
      {id? <p></p> : <Link to='/signup'>Sign Up</Link>}
    </div>
  )
}


function Main() {
  return (
    <div style={{backgroundColor:'#045369', color:'#FFFFFF'}}>
      <div style={{display:"flex", flexDirection:'row'}}>
          <Text></Text>
          <LogInOrOut />
          <LinkAbout />
          <LinkLogin />    
          <LinkSignUp /> 
      </div>
      <div style={{display:'flex', flexDirection:"column", alignItems: 'center'}}> 
          <Map/>
      </div>
    </div>
  )
}

export default Main;
