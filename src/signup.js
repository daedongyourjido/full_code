
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpButton, 
        SignUpDisableField, 
        SignUpDupCheckButton, 
        SignUpPwField, 
        SignUpPwCheckField, 
        SignUpPwCheckErrorField, 
        SignUpPwCheckEmptyField, 
        SignUpNameField, 
        SignUpNameEmptyField, 
        SignUpIdField, 
        SignUpIdErrorField, 
        SignUpPwWrongField,
        SignUpPwErrorField } from './material/signUpComponents.js';
import MenuMap from './menuMap.js';
import Header from './header.js';


function SignUpBox(props) {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwDup, setPwDup] = useState("");
    const [name, setName] = useState("");
    const [empty, setEmpty] = useState(false);
    const [idDupCheck, setIdDupCheck] = useState(false);  // 중복일때 true, 중복없을때 false
    const [idDupChecked, setIdDupChecked] = useState(false);
    const [pwDupCheck, setPwDupCheck] = useState(false);
    const [idFix, setIdFix] = useState(false);

    return (
        <div style={{width:'380px'}}>
            <div style={{paddingTop:'30px', display:'flex', flexDirection:'column', width:'500px',alignItems:'center', justifyItems:'center', height:'65vh', backgroundColor:'white', borderRadius:'2%', boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.3)'}}>
                        <h1 style={{color:'#000000'}}>회원가입</h1>
                        { idFix ?  <SignUpDisableField id={id} /> : <SignUpIdField setId={setId} /> } 
                        <SignUpDupCheckButton setEmpty={setEmpty} setIdDupCheck={setIdDupCheck} setIdFix={setIdFix} id={id}/>
                        { idDupCheck ? <p style={{fontSize:'10px', marginTop:'25px', marginBottom:'0px', color:'red'}}>중복된 아이디입니다</p> : <p></p>}
                        <SignUpNameField setName={setName} />
                        <SignUpPwField setPw={setPw} />
                        <SignUpPwCheckField setPwDup={setPwDup} /> 
                        <SignUpButton 
                            setEmpty={setEmpty}
                            idDupCheck={idDupCheck}
                            pwDup={pwDup}
                            name={name}
                            id={id} 
                            pw={pw} 
                            idFix={idFix}
                            setIdDupChecked={setIdDupChecked}
                            setPwDupCheck={setPwDupCheck} 
                            setIdDupCheck={setIdDupCheck} />
                        {empty ? <p style={{color:'red', textAlign:'center', fontSize:'1vh'}}>모두 입력해주세요</p> : <p></p> }
                        {idDupChecked ? <p style={{color:'red', textAlign:'center', fontSize:'1vh'}}>이메일 중복확인 해주세요</p> : <p></p> }
                        {pwDupCheck ? <p style={{color:'red', textAlign:'center', fontSize:'1vh'}}>비밀번호 재확인 해주세요</p> : <p></p> }
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
                <Header />
            </div>
            <MenuMap component={<SignUpBox />} />
            
        </div>
)
}


export default SignUp;