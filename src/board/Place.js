import './App_board.css';
import { useState, useEffect } from "react";
import { TbBuildingCommunity } from "react-icons/tb";
import { BsPinMap } from "react-icons/bs";
import { MdFoodBank } from "react-icons/md";
import SimpleSlider from './slider';
import Image_Collection from './image_Collection';
import axios from "axios";

function Place() {
    useEffect(()=>{
        axios.post('https://nppy6kx2q6.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-random', {
            user_id: localStorage.id
        })
        .then(res => {
            setUserLocationInfo(res.data)
        })
        .catch(error => {
            console.log(error);
        })
    }, [])
    const [restaurant, setRestaurant] = useState(true)
    const [hotel, setHotel] = useState(false)
    const [location, setLocation] = useState(false)

    const [userLocationInfo, setUserLocationInfo] = useState([])

    const onChangeRestaurant = () => {
        setRestaurant(true)
        setHotel(false)
        setLocation(false)
    }
    const onChangeHotel = () => {
        setRestaurant(false)
        setHotel(true)
        setLocation(false)
    }
    const onChangeLocation = () => {
        setRestaurant(false)
        setHotel(false)
        setLocation(true)
    }
    return (
        <div className="App">
            <div className='header'>
                <p>대동유어지도</p>
                <div className='r_header'>
                    <input type='text'></input>
                    <a href='/'>Login</a>
                </div>
            </div>
            <div className='contents'>
                <div className='side'>
                    <div className='inner'>
                        <h1>지역 이름</h1>
                        <h3>추천게시물</h3>
                        <div className='slider'>
                            <SimpleSlider
                                userLocationInfo={userLocationInfo}
                            />
                        </div>
                        <div className='contentsBtn'>
                            <button href="/" onClick={onChangeRestaurant}>맛집</button>
                            <button href="/" onClick={onChangeHotel}>숙소</button>
                            <button href="/" onClick={onChangeLocation}>여행지</button>
                        </div>
                    </div>
                </div>
                <div className='main'>
                    <div className='icons'>
                        <MdFoodBank  id="icon1" size="50px"/>
                        {restaurant ? <div id='res'></div>:""}
                        <TbBuildingCommunity id="icon2" size="50px"/>
                        {hotel ? <div id='ho'></div>:""}
                        <BsPinMap id="icon3" size="40px"/>
                        {location ? <div id='lo'></div>:""}
                    </div>
                    <hr/>
                    <div className='image_Collection'>
                        <Image_Collection
                            userLocationInfo={userLocationInfo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Place;
