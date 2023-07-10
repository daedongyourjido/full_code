
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import SignUpIdErrorField from './material/signUpIdErrorField.js';
import SignUpIdField from './material/signUpIdField.js';
import SignUpPwErrorField from './material/signUpPwErrorField.js';
import SignUpPwField from './material/signUpPwField.js';
import SignUpPwCheckErrorField from './material/signUpPwCheckErrorField.js';
import SignUpPwCheckField from './material/signUpPwCheckField.js';
import SignUpButton from './material/signUpButton.js';
import SignUpNameField from './material/signUpNameField.js';
import SignUpDupCheckButton from './material/signUpIdDupCheckButton.js';
import SignUpDisableField from './material/signUpDisableField.js';
import SignUpPwWrongField from './material/signUpPwWrongField.js';
import SignUpNameEmptyField from './material/signUpNameEmptyField.js';
import SignUpPwCheckEmptyField from './material/signUpPwCheckEmptyField.js';
import MenuMap from './menuMap.js';

const ID = ['apple', 'banana', 'melon', 'orange'];

function Text() {
  const navigate = useNavigate();
    return (
        <h1 style={{paddingBottom:'30px', cursor: 'pointer', width:'200px'}} onClick={()=>{
          navigate('/');
        }}>대동유어지도</h1>
    )
}


function SignUpBox(props) {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwDup, setPwDup] = useState("");
    const [name, setName] = useState("")
    const [idEmpty, setIdEmpty] = useState(false);
    const [pwEmpty, setPwEmpty] = useState(false);
    const [pwCheck, setPwCheck] = useState(false);
    const [idDupCheck, setIdDupCheck] = useState(true);  // 중복일때 true, 중복없을때 false
    const [dupDup, setDupDup] = useState(false);
    const [pwWrong, setPwWrong] = useState(false);
    const [nameEmpty, setNameEmpty] = useState(false);
    const [pwCheckEmpty, setPwCheckEmpty] = useState(false);
    const navigate = useNavigate();

    return (
        <div style={{width:'380px'}}>
            <div style={{paddingTop:'30px', display:'flex', flexDirection:'column', width:'500px',alignItems:'center', justifyItems:'center', height:'580px', backgroundColor:'white', borderRadius:'2%', boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.3)'}}>
                        <h1 style={{color:'#000000'}}>회원가입</h1>
                        {idEmpty? <SignUpIdErrorField setId={setId} /> : idDupCheck?  <SignUpIdField setId={setId} /> : <SignUpDisableField id={id} /> } 
                        {idEmpty? <SignUpDupCheckButton setDupDup={setDupDup} setIdDupCheck={setIdDupCheck} setIdEmpty={setIdEmpty} id={id}/> : idDupCheck? <SignUpDupCheckButton setIdEmpty={setIdEmpty} setDupDup={setDupDup} setIdDupCheck={setIdDupCheck} id={id}/> : <p style={{fontSize:'10px', color:'gray'}}>사용 가능한 아이디입니다</p> }
                        {dupDup? <p style={{fontSize:'10px', marginTop:'25px', marginBottom:'0px', color:'red'}}>중복된 아이디입니다</p> : <p></p>}
                        {nameEmpty? <SignUpNameEmptyField setName={setName} /> : <SignUpNameField setName={setName} /> }
                        {pwEmpty? <SignUpPwErrorField setPw={setPw} /> : pwWrong? <SignUpPwWrongField setPw={setPw} /> : <SignUpPwField setPw={setPw} />}
                        <p style={{color:'gray', fontSize:'10px', margin:'0px', marginTop:'8px'}}>비밀번호는 8자 이상이어야 합니다</p>
                        {pwCheckEmpty? <SignUpPwCheckEmptyField setPwDup={setPwDup} /> : pwCheck? <SignUpPwCheckErrorField setPwDup={setPwDup} /> : <SignUpPwCheckField setPwDup={setPwDup} /> }
                        <SignUpButton 
                            setIdEmpty={setIdEmpty}  
                            idEmpty={idEmpty}
                            setPwEmpty={setPwEmpty} 
                            pwEmpty={pwEmpty}
                            setPwCheck={setPwCheck} 
                            pwCheck={pwCheck}
                            idDupCheck={idDupCheck}
                            setPwWrong={setPwWrong}
                            setNameEmpty={setNameEmpty}
                            setPwCheckEmpty={setPwCheckEmpty}
                            pwDup={pwDup}
                            name={name}
                            id={id} 
                            pw={pw} />
                        <div style={{display:'flex', flexDirection:'row', marginTop:'15px'}}>
                            <p style={{color:'gray', fontSize:'10px', marginRight:'10px'}}>혹은 계정이 있는 경우</p>
                            <a href='/login' style={{color:'#045369', fontSize:'12px', margin:'7px'}}>Sign In</a>
                        </div>
            </div>
        </div>
    )
}


function SignUp() {

    return (
        <div className='root'>
            <div className="bar" style={{marginBottom:'10px'}}>
                <Text />
            </div>
            <MenuMap component={<SignUpBox />} />
            
        </div>
)
}


export default SignUp;