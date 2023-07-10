import './App_profile.css';
import FollowerList from './follwer';
import FollowingList from './following';
import StandardImageList from './profile';
import BasicButtons from './Button';
import ImageAvatars from './avatar';
import A from './slider';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {useNavigate} from 'react-router-dom';


function AppProfile() {
  const navigate = useNavigate();
  return (
<div>
    <div id="wrap">
      <div id="header">
      Header
      </div>
      <div id = "bt">
        <BasicButtons/>
      </div>
      <hr/>
      <div id="side">
        <div id = "avatarpos">
        <ImageAvatars/>
        </div>
        <div id = "namepos">
          name
        </div>
      </div>
      <SettingsOutlinedIcon onClick={() => {
          navigate('/setting');
        }} />
      <div id="contents">
        <StandardImageList/>
      </div>

      <div id="slidepos">
        <A/>
      </div>

    </div>
    </div>
  );
}

export default AppProfile;
