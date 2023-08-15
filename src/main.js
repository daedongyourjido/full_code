import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { KakaoMap } from './map.js';
import { LoginPageButton } from './material/loginComponents.js';
// import SearchField from './material/searchField2.js';
import "./style.css";
import LogoutIcon from '@mui/icons-material/Logout';
import Header from './header.js';

function BeforeLogin(){
  const navigate = useNavigate();

  return (
    <div className="bar" style={{ display: 'flex', justifyContent: 'flex-end'}}>
      {/* <SearchField /> */}
      <LoginPageButton onClick={()=>{
        navigate('/login');
      }} />
    </div>
  );
}

function AfterLogin(){
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  return (
    <div className="bar" style={{display:'flex', flexDirection:'row', justifyContent:'right', marginTop:'20px'}}>
        {/* <SearchField /> */}
        <img src={sessionStorage.picture} style={{width:'40px', height:'40px', borderRadius:'100%', marginRight:'16px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}} alt={'...'} />
        <p style={{fontSize:'18px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}} >{sessionStorage.getItem('name')}</p> 
        <p>{name}</p>
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
         <Header />
          {login? <AfterLogin /> : <BeforeLogin />}
      </div>
        <KakaoMap />
      </div>
  )
}

export default Main;
