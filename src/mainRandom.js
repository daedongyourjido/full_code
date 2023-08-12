import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import seoul1 from './image/seoul/seoul1.jpeg';
import seoul2 from './image/seoul/seoul2.jpeg';
import seoul3 from './image/seoul/seoul3.jpeg';
import seoul4 from './image/seoul/seoul4.jpeg';
import img1 from './image/rest/img1.jpeg';
import img2 from './image/rest/img2.jpeg';
import img3 from './image/rest/img3.jpeg';
import img4 from './image/rest/img4.jpeg';

function Arrow(props) {
    const {className, style, onClick} = props;
    return (
        <div style={{display:"block", background: "#045369"}} />
    )
}

function Content(props) {
    const settings = {
      infinite: true,
      slidesToShow: 2,  // 2개로 지정해야 모션 안깨짐
      speed: 500,
      autoplay: true,
      autoplaySpeed: 1700,
      variableWidth: true,
      nextArrow: <Arrow />,
      prevArrow: <Arrow />
    };

    const imgStyle = {
        width: 'auto',
        height: '143px',
        borderRadius: '5%', 
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)',
    }
    const _name = props.name;
    const [img_1, setImg_1] = useState(null);  
    const [img_2, setImg_2] = useState(null);
    const [img_3, setImg_3] = useState(null);
    const [img_4, setImg_4] = useState(null);
    const [img_t, setImg_t] = useState(null);

    const [anim, setAnim] = useState("");

    useEffect(()=> {    // 지역 바뀔 때 사진도 바뀌게 하기
        /** 지역별 사진 api 추가 **/
        axios.post('https://qzqejgzukh.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-main-random', {
            location: _name
        })
            .then(res => {
                setImg_1(res.data[0]);
                setImg_2(res.data[1]);
                setImg_3(res.data[2]);
                setImg_4(res.data[3]);
            })
            .catch(error => {
                console.log(error);
            })
        setAnim("fade-in");
    }, [_name]);

    useEffect(()=> {
        setImg_t(null);
    }, [_name]);

    return (
        <Slider {...settings} className={anim} >
            <div>
                <img className='randomImages' src={img_1} style={imgStyle} />
            </div>
            <div>
                <img className='randomImages' src={img_2} style={imgStyle} />
            </div>
            <div>
                <img className='randomImages' src={img_3} style={imgStyle} />
            </div>
            <div>
                <img className='randomImages' src={img_4} style={imgStyle} />
            </div>
      </Slider>
    );
  }
  


function MainRandom(props) {
    const [name, setName] = useState('Welcome to 대동유어지도');
    const [login, setLogin] = useState('false');
    const _name = props.name;
    const _login = props.login;

    useEffect(()=> {
        setLogin('true');
    }, [_login])
    
    useEffect(()=> {
        if(_name === 'seoul')
            setName('서울');
        else if(_name === 'gyeonggi')
            setName('경기');
        else if(_name === 'incheon')
            setName('인천');
        else if(_name === 'daejeon')
            setName('대전');
        else if(_name === 'busan')
            setName('부산');
        else if(_name === 'jeonnam')
            setName('전라남도');
        else if(_name === 'jeonbuk')
            setName('전라북도');
        else if(_name === 'chungbuk')
            setName('충청북도');
        else if(_name === 'chungnam')
            setName('충청남도');
        else if(_name === 'gangwon')
            setName('강원');
        else if(_name === 'gyeongnam')
            setName('경상남도');
        else if(_name === 'gyeongbuk')
            setName('경상북도');
        else if(_name === 'jeju')
            setName('제주');
        else if(_name === 'daegu')
            setName('대구');
        else if(_name === 'ulsan')
            setName('울산');
        else if(_name === 'sejong')
            setName('세종');
    },[_name])  // props.name 값이 바뀔 때만 useEffect 실행

    return (
        <div style={{ padding: '50px', width:'88vh' }}>
            <h1 style={{ display:'flex', justifyContent: 'center'}}>{name}</h1>
            {name==='Welcome to 대동유어지도'? <p></p> : <Content name={_name} />}
        </div>
    )
}

export default MainRandom;