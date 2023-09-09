// import StandardImageList from './profile';
import BasicButtons from "../../modules/components/Button";
import ImageAvatars from "../../modules/components/avatar";
import A from "./slider";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
import FollowingModal from "../profile/followingModal";
import FollowerModal from "../profile/followerModal";
import { MyKakaoMap } from "./mykakaomap";

function MyMap() {
  const navigate = useNavigate();
  /** 코드 통합 이후 사용자 정보 세선 저장하는 방식 추가 **/
  const [placeImages, setPlaceImages] = useState(null);
  /** 사용자 장소 이미지 불러오는 api **/
  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.post(
        "https://9p156tq894.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-profile",
        {
          userId: sessionStorage.id,
        },
      );
      setPlaceImages(res.data);
    };
    getProfile();
  }, []);

  return (
    <div>
      <div id="wrap">
        <div
          id="header"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Header
        </div>
        <div id="bt">
          <BasicButtons />
          <SettingsOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/setting/change");
            }}
          />
        </div>
        <hr />
        <div id="side">
          <div id="avatarpos">
            <ImageAvatars userImage={sessionStorage.picture} />
          </div>
          <div id="namepos">{sessionStorage.id}</div>
          <div id="followpos">
            <FollowerModal />
          </div>
          <div id="followingpos">
            <FollowingModal />
          </div>
          <div id="postspos">0posts</div>
        </div>
        <div id="mapcontents">
          <MyKakaoMap />
        </div>
        <div id="slidepos">
          <A placeImages={placeImages} />
        </div>
      </div>
    </div>
  );
}

export default MyMap;
