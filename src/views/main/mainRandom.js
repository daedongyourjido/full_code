import axios from 'axios';
import React, {useState, useEffect, useMemo} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './main.css';
import { useSelector, useDispatch } from 'react-redux';
import { setImages } from '../../redux/actions.js';
import Skeleton from '@mui/material/Skeleton';

function Arrow() {
    return (
        <div style={{display:"block", background: "#045369"}} />
    )
}

function Loading() {
    return (
        <div style={{display:'flex', flexDirection:'row'}}>
            <Skeleton sx={{marginRight:'15px'}} variant="rounded" width={150} height={150} />
            <Skeleton sx={{marginRight:'15px'}} variant="rounded" width={150} height={150} />
            <Skeleton sx={{marginRight:'15px'}} variant="rounded" width={150} height={150} />
            <Skeleton sx={{marginRight:'15px'}} variant="rounded" width={150} height={150} />
            <Skeleton sx={{marginRight:'15px'}} variant="rounded" width={150} height={150} />
        </div>
    )
}

function Content(props) {
    
    const isLoading = props.isLoading;
    const images = useSelector((state) => state.images);

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
    // const [anim, setAnim] = useState("");

    // useEffect(() => {
        
    // }, [isLoading]);

    useEffect(() => {
        const location = props.location;
        
        if(images.length > 0) {
            for(let i=0; i<location.length; i++) {
                if(_name === location[i]) {                    
                    setImg_1(images[i][0]);
                    setImg_2(images[i][1]);
                    setImg_3(images[i][2]);
                    setImg_4(images[i][3]);
                }
            }
        }
    }, [_name, isLoading, images, props.location]);

    return (
        isLoading ? <Loading /> : (
            <Slider {...settings} >
                <div>
                    <img className='randomImages' src={img_1} style={imgStyle} alt={'...'} />
                </div>
                <div>
                    <img className='randomImages' src={img_2} style={imgStyle} alt={'...'} />
                </div>
                <div>
                    <img className='randomImages' src={img_3} style={imgStyle} alt={'...'} />
                </div>
                <div>
                    <img className='randomImages' src={img_4} style={imgStyle} alt={'...'} />
                </div>
            </Slider>
        ) 
        
    );
  }
  


function MainRandom(props) {
    const [name, setName] = useState('Welcome to 대동유어지도');
    // const [login, setLogin] = useState('false');
    const _name = props.name;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    
    const _location = useMemo(() => {
        return ['seoul', 'gyeonggi', 'incheon', 'daejeon', 'busan', 'jeonnam', 'jeonbuk', 'chungbuk', 'chungnam', 'gangwon', 'gyeongnam', 'gyeongbuk', 'jeju', 'daegu', 'ulsan', 'sejong']
    }, [])

    useEffect(() => {
        const images = [];

        const fetchData = async() => {
            for(let i=0; i<_location.length; i++) {
                await axios.post("https://qzqejgzukh.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-main-random", {
                    location: _location[i]
                })
                .then(res => {
                    images.push(res.data);
                })
                .catch(err => {
                    console.log("mainRandom err : ", err);
                }) 
            }
            dispatch(setImages(images));
            setIsLoading(false);
            console.log("dispatched");
        }
        fetchData();
    }, [dispatch, _location])

    // useEffect(()=> {
    //     setLogin('true');
    // }, [_login])
    
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
        <div className='main-random'>
            <h1 style={{ display:'flex', justifyContent: 'center'}}>{name}</h1>
            {name==='Welcome to 대동유어지도' ? <p></p> : <Content name={_name} location={_location} isLoading={isLoading} />}
        </div>
    )
}

export default MainRandom;