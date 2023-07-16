import './App_profile.css';

import FollowerList from './follwer';
import FollowingList from './following';
import StandardImageList from './profile';
import BasicButtons from './Button';
import ImageAvatars from './avatar';
import A from './slider';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {useEffect, useState} from "react";


function AppProfile() {
  const navigate = useNavigate();
  /** 코드 통합 이후 사용자 정보 세선 저장하는 방식 추가 **/
  const userKey = 2
  const userId = 'sjhong98@icloud.com'
  const userImage = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
  const [placeImages, setPlaceImages] = useState(null)
  /** 사용자 장소 이미지 불러오는 api **/
  useEffect(()=>{
    axios.post('https://9p156tq894.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-profile', {
      userId: localStorage.id
    })
        .then(res => {
          setPlaceImages(res.data)
        })
        .catch(err => console.error(err))
  }, [])

  return (
<div>
    <div id="wrap">
      <div id="header" style={{cursor:'pointer'}} onClick={()=> {
        navigate('/');
      }}>
      Header
      </div>
      <div id = "bt">
        <BasicButtons/>
      </div>
      <hr/>
      <div id="side">
        <div id = "avatarpos">
          <ImageAvatars
              userImage={userImage}
          />
        </div>
        <div id = "namepos">
          {userId}
        </div>
      </div>
      <div id="contents">
        <StandardImageList
            placeImages={placeImages}
        />
      </div>
      <div id="slidepos">
        <A
            placeImages={placeImages}
        />
      </div>
    </div>
    </div>
  );
}

export default AppProfile;
