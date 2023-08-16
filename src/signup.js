import React, { useState } from 'react';
import MenuMap from './menuMap.js';
import Header from './header.js';
import InputField from './material/inputField.js';
import SignUpButton from './signupButton.js';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoginPageButton from './loginPageButton.js';


// 아이디 중복 확인 버튼
function SignUpDupCheckButton(props) {

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'-20px'}} >
          <Stack direction="row" spacing={2}>
          <Button variant="outlined" 
          sx={{
              borderColor: '#045369',
              color: '#045369',
              width: '35ch'
          }}
              onClick={()=>{
                  /** 계정 중복 확인 api 추가 **/
                  axios.post('https://iclveynbwf.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-signin', {
                      // 중복 확인 API의 경우 type: 'duplication'
                      type: 'duplication',
                      id: props.id
                  })
                  .then(res => {
                      // 계정이 DB에 존재함
                      if(res.data.duplicated) {
                          props.setIdDupCheck(true);  // 중복일 경우 true
                      }
                      // 계정이 DB에 존재하지 않음
                      else {
                          props.setIdDupCheck(false); // 중복 아닐 경우 false
                          props.setIdFix(true);
                      }
                  })
                  .catch(error => {
                      console.log(error);
                  })
              }}>중복체크</Button>
          </Stack>
      </div>
    );
  }


// 아이디 중복 확인 후 고정 버튼
function SignUpDisableField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="아이디"
            defaultValue={props.id}
          />
          </div>
      </Box>
    );
  }




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
                        { idFix ?  <SignUpDisableField id={id} /> : <InputField setData={setId} label="이메일" type="text" /> } 
                        <SignUpDupCheckButton setEmpty={setEmpty} setIdDupCheck={setIdDupCheck} setIdFix={setIdFix} id={id}/>
                        { idDupCheck ? <p style={{fontSize:'10px', marginTop:'25px', marginBottom:'0px', color:'red'}}>중복된 아이디입니다</p> : <p></p>}
                        <InputField setData={setName} label="닉네임" type="text" />
                        <InputField setData={setPw} label="비밀번호" type="password" />
                        <InputField setData={setPwDup} label="비밀번호 재확인" type="password" />
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
                            <LoginPageButton borderColor="gray" color="gray" />
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