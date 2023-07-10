import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import LoginIdErrorField from './material/loginIdErrorField.js';
import LoginIdField from './material/loginIdField.js';
import LoginPwErrorField from './material/loginPwErrorField.js';
import LoginPwField from './material/loginPwField.js';
import LoginButton from './material/loginButton.js';
import SignUpPageButton from './material/signUpPageButton.js';
import MenuMap from './menuMap.js'

function Text() {
  const navigate = useNavigate();
    return (
        <h1 style={{paddingBottom:'30px', cursor: 'pointer', width:'200px'}} onClick={()=>{
          navigate('/');
        }}>대동유어지도</h1>
    )
}

function LoginBox(props) {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [idEmpty, setIdEmpty] = useState(true);
    const [pwEmpty, setPwEmpty] = useState(true);
    const navigate = useNavigate();

    return (
        <div style={{width:'380px'}}>
            <div style={{paddingTop:'0px', display:'flex', flexDirection:'column', width:'100%', height:'400px', backgroundColor:'white', borderRadius:'2%', boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.3)'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'45px'}}>
                        <h1 style={{color:'#000000'}}>대동유어지도</h1>
                        {idEmpty? <LoginIdField setId={setId} /> : <LoginIdErrorField setId={setId} />}
                        {pwEmpty? <LoginPwField setPw={setPw} /> : <LoginPwErrorField setPw={setPw} />}
                    </div>

                <LoginButton setIdEmpty={setIdEmpty} setPwEmpty={setIdEmpty} id={id} pw={pw} />
                </div>

                <a style={{ fontSize:'10px', color:'gray', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'30px' }} href='/find' >비밀번호를 잊으셨나요?</a>
            </div>
            <div style={{backgroundColor:'#FFFFFF', borderRadius:'4%', width:'100%', height:'80px', marginTop:'40px', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.3)'}}>
                <p style={{color:'gray', fontSize:'13px', marginRight:'10px'}}>or</p>
                <SignUpPageButton />
            </div>
        </div>
    )
}

function Login() {

    return (
            <div className='root'>
                <div className="bar">
                    <Text />
                </div>
                <MenuMap component={<LoginBox />} />
                
            </div>
    )
}

export default Login;

 