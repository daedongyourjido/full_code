import './App_board.css';
import { useState, useEffect } from "react";
import { TbBuildingCommunity } from "react-icons/tb";
import { BsPinMap } from "react-icons/bs";
import { MdFoodBank } from "react-icons/md";
import SimpleSlider from './slider';
import Image_Collection from './image_Collection';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SearchField from '../material/searchField2.js';

function Place() {
    const navigate = useNavigate();
    useEffect(()=>{
        axios.post('https://nppy6kx2q6.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-random', {
            user_id: localStorage.id
        })
        .then(res => {
            setUserLocationInfo(res.data);
            console.log("USER_LOCATION_INFO : ", res);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    const [userLocationInfo, setUserLocationInfo] = useState([])


    function Text() {
        const navigate = useNavigate();
        return (
            <p style={{cursor: 'pointer'}} onClick={()=>{
              navigate('/');
            }}>대동유어지도</p>
        )
    }
    return (
        <div className='All'>
          <div className="App">
            <div className='header'>
              <Text />
              <div className='r_header'>
                <button id='rHeader_btn' onClick={()=>{navigate('/write')}}>게시물 작성하기</button>
                <SearchField />
              </div>
            </div>
            <div className='contents'>
              <div className='side'>
                <div className='inner'>
                  <h1>지역 이름</h1>
                  <h3>추천게시물</h3>
                  <div className='slider'>
                    <SimpleSlider/>
                  </div>
                </div>
              </div>
              <div className='main'>
                  <div className='space'>
                    <div className='icons'>
                      <button className='Category_btn'>
                        <div className='Cateroties'>
                          <MdFoodBank  id="icon1" size="55px"/>
                          <p id='Category1'>맛집</p>
                        </div>
                      </button>
                      <button className='Category_btn'>
                        <div className='Cateroties'>
                          <TbBuildingCommunity id="icon2" size="55px"/>
                          <p id='Category2'>숙소</p>
                        </div>
                      </button>
                      <button className='Category_btn'>
                        <div className='Cateroties'>
                          <BsPinMap id="icon3" size="45px"/>
                          <p id='Category3'>여행지</p>
                        </div>
                      </button>
                    </div>

                    <hr/>

                    <div className='image_Collection'>
                      <Image_Collection />
                    </div>

                  </div>
                </div>
            </div>
          </div>
        </div>
      );
}

export default Place;
