import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export function SignUpButton(props) {
    const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', marginTop:'10px', justifyContent: 'center', alignItems: 'center' }} >
        <Stack direction="row" spacing={2}>
        <Button variant="outlined" 
        sx={{
            borderColor: '#045369',
            color: '#045369',
            width: '35ch'
            
        }}
            onClick={()=>{
                if(!props.id || !props.pw)
                  props.setEmpty(true);
                else if(props.id && props.pw)
                  props.setEmpty(false);
                if(!props.name || !props.pwDup)
                  props.setEmpty(true);
                else if(props.name && props.pwDup)
                  props.setEmpty(false);
                if(!props.idFix)
                  props.setIdDupChecked(true);
                else if(props.idFix)
                  props.setIdDupChecked(false);
                if(props.pw !== props.pwDup)
                  props.setPwDupCheck(true);
                if(props.id && props.pw) {
                    if(props.name && props.pwDup) {
                        if(props.pwDup === props.pw) {
                          props.setPwDupCheck(false);
                          
                            /** 회원가입 api 추가 **/
                            axios.post('https://iclveynbwf.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-signin', {
                                // 로그인 API의 경우 type: 'signup'
                                type: 'signup',
                                email : props.id,
                                password : props.pw,
                                nickname : props.name
                            })
                                // 문제가 없을 경우(정상 회원가입) 인덱스 라우팅
                            .then(res => {
                                alert('회원가입 완료! 메일 인증을 완료해주세요.');
                                navigate('/');
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        }
                    }
            }

            }}>sign Up</Button>
        </Stack>
    </div>
  );
}


export function SignUpDisableField(props) {
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


  export function SignUpDupCheckButton(props) {

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

  export function SignUpIdDupErrorField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch', height: '6.5ch',  backgroundColor:'white' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setId(e.target.value)}}
      >
        <div>
          <TextField
            error
            id="outlined-error-helper-text"
            label="중복된 이메일입니다"
            defaultValue=""
            helperText="이메일을 입력하세요"
          />
        </div>
      </Box>
    );
  }


  export function SignUpPwField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setPw(e.target.value)}}
      >
        <div>
          <TextField
            id="outlined-password-input"
            label="비밀번호"
            type="password"
            autoComplete="current-password"
          />
        </div>
      </Box>
    );
  }

  export function SignUpPwCheckField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setPwDup(e.target.value)}}
      >
        <div>
          <TextField
            id="outlined-password-input"
            label="비밀번호 재확인"
            type="password"
            autoComplete="current-password"
          />
        </div>
      </Box>
    );
  }

  export function SignUpPwCheckErrorField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch', height: '6.5ch', },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setPwDup(e.target.value)}}
      >
        <div>
          <TextField
            error
            id="outlined-error-helper-text"
            label="비밀번호 미일치"
            type="password"
            defaultValue=""
            helperText="비밀번호가 일치하지 않습니다"
          />
        </div>
      </Box>
    );
  }


  export function SignUpPwCheckEmptyField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, height: '5.8ch',  width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setPwDup(e.target.value)}}
      >
        <div>
          <TextField
            error
            id="outlined-error-helper-text"
            label="비밀번호 재확인"
            type="password"
            defaultValue=""
            helperText="비밀번호를 재확인하세요"
          />
        </div>
      </Box>
    );
  }


export function SignUpNameField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch'},
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setName(e.target.value)}}
      >
        <div>
        <TextField
            id="outlined-helperText"
            label="닉네임"
            defaultValue=""
            helperText=""
          />
        </div>
      </Box>
    );
  }


  export function SignUpNameEmptyField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, height: '5.8ch', width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setName(e.target.value)}}
      >
        <div>
          <TextField
            error
            id="outlined-error-helper-text"
            label="닉네임 입력"
            type="password"
            defaultValue=""
            helperText="닉네임을 입력하세요"
          />
        </div>
      </Box>
    );
  }

  export function SignUpIdField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch'},
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setId(e.target.value)}}
      >
        <div>
        <TextField
            id="outlined-helperText"
            label="이메일"
            defaultValue=""
            helperText=""
          />
        </div>
      </Box>
    );
  }

  export function SignUpIdErrorField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch', height: '6.5ch', backgroundColor:'white' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setId(e.target.value)}}
      >
        <div>
          <TextField
            error
            id="outlined-error-helper-text"
            label="이메일 입력"
            defaultValue=""
            helperText="이메일을 입력하세요"
          />
        </div>
      </Box>
    );
  }


  export function SignUpPwWrongField(props) { 
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, height: '6.5ch', width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setPw(e.target.value)}}
      >
        <div>
          <TextField
            error
            id="outlined-error-helper-text"
            label="비밀번호는 8자 이상"
            type='password'
            defaultValue=""
            helperText="비밀번호를 입력하세요"
          />
        </div>
      </Box>
    );
  }
  

  export function SignUpPwErrorField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, height: '5.8ch', width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setPw(e.target.value)}}
      >
        <div>
          <TextField
            error
            id="outlined-error-helper-text"
            label="비밀번호 입력"
            type='password'
            defaultValue=""
            helperText="비밀번호를 입력하세요"
          />
        </div>
      </Box>
    );
  }




  export function SignUpPageButton() {
    const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" 
      sx={{
        borderColor: '#045369',
        color: '#045369',
        width: '25ch',
        height: '5ch'
      }}
      onClick={()=>{
        navigate('/signup');
      }}>Sign up</Button>
    </Stack>
  );
}