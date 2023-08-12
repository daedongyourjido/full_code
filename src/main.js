import React, { useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import { KakaoMap } from './map.js';
import LoginPageButton from './material/loginPageButton.js'
import SearchField from './material/searchField2.js';
import "./style.css";
import LogoutIcon from '@mui/icons-material/Logout';

function Text() {
  const navigate = useNavigate();
    return (
        <h1 style={{paddingBottom:'30px', cursor: 'pointer', width:'200px'}} onClick={()=>{
          navigate('/');
        }}>대동유어지도</h1>
    )
}

function BeforeLogin(){
  const navigate = useNavigate();

  return (
    <div className="bar" style={{ display: 'flex', justifyContent: 'flex-end'}}>
      <SearchField />
      <LoginPageButton onClick={()=>{
        navigate('./login');
      }} />
    </div>
  );
}

function AfterLogin(){
  const navigate = useNavigate();
  // const name = localStorage.getItem('name');

  return (
    <div className="bar" style={{display:'flex', flexDirection:'row', justifyContent:'right', marginTop:'20px'}}>
        <SearchField />
        <img src={sessionStorage.picture} style={{width:'40px', height:'40px', borderRadius:'100%', marginRight:'16px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}} alt={'...'} />
        <p style={{fontSize:'18px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}} >{sessionStorage.getItem('name')}</p> 
        {/* name 가져와 표시 */}
        <LogoutIcon style={{marginLeft:'15px', cursor:'pointer'}} onClick={()=>{
          sessionStorage.clear();
          window.location.reload();
        }} />
    </div>
  )
}

function Main() {
  const [login, setLogin] = useState(false);

  useEffect(() => { // token 여부에 반응하여 로그인 여부 판단
    const token = sessionStorage.getItem('id');
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div className='root'>
      <div className="bar">
          <Text></Text>
          {login? <AfterLogin /> : <BeforeLogin />}
      </div>
        <KakaoMap />
      </div>
  )
}

export default Main;
