import React, {useContext, useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { KakaoMap } from './map.js';
import LoginPageButton from './material/loginPageButton.js'
import SearchField from './material/searchField2.js';
import "./style.css";
import propic from './image/propic.jpg';
import LogoutIcon from '@mui/icons-material/Logout';
import { Icon } from '@mui/material';

function Text() {
  const navigate = useNavigate();
    return (
        <h1 style={{paddingBottom:'30px', cursor: 'pointer', width:'200px'}} onClick={()=>{
          navigate('/');
        }}>대동유어지도</h1>
    )
}

function BeforeLogin(props){
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

function AfterLogin(props){
  const navigate = useNavigate();
  // const name = localStorage.getItem('name');


  return (
    <div className="bar" style={{display:'flex', flexDirection:'row', justifyContent:'right', marginTop:'20px'}}>
        <SearchField />
        <img src={propic} style={{width:'40px', height:'40px', borderRadius:'100%', marginRight:'16px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}} />
        <p style={{fontSize:'18px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}} >{localStorage.getItem('name')}</p>
        <LogoutIcon style={{marginLeft:'15px', cursor:'pointer'}} onClick={()=>{
          localStorage.clear();
          window.location.reload();
        }} />
    </div>
  )
}

function Main() {
  const [login, setLogin] = useState(false);

  useEffect(() => { // token 여부에 반응하여 로그인 여부 판단
    const token = localStorage.getItem('id');
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
