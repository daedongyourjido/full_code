import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {LoginIdField,
        LoginPwField,
        LoginButton } from './material/loginComponents.js';
import { SignUpPageButton } from './material/signUpComponents.js';
import MenuMap from './menuMap.js'
import Header from './header.js';

function LoginBox(props) {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [empty, setEmpty] = useState(false);
    const navigate = useNavigate();

    return (
        <div style={{width:'380px'}}>
            <div style={{paddingTop:'0px', display:'flex', flexDirection:'column', width:'100%', height:'45vh', backgroundColor:'white', borderRadius:'2%', boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.3)'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'45px'}}>
                        <h1 style={{color:'#000000'}}>대동유어지도</h1>
                        <LoginIdField setId={setId} />
                        <LoginPwField setPw={setPw} />
                        { empty ? <p style={{color:'red', textAlign:'center', fontSize:'1vh'}}>모두 입력해주세요</p> : <p></p> }
                    </div>

                <LoginButton setEmpty={setEmpty} id={id} pw={pw} />
                </div>
                <p 
                    style={{ fontSize:'10px', color:'gray', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'30px', cursor:'pointer'}} 
                    onClick={() => {
                        navigate('/find');
                    }}>비밀번호를 잊으셨나요?</p>
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
                    <Header />
                </div>
                <MenuMap component={<LoginBox />} />
                
            </div>
    )
}

export default Login;

 