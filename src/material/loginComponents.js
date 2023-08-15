import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export function LoginButton(props) {
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
          else {
            props.setEmpty(false);

                /** 로그인 api 추가 **/
                axios.post('https://h8viqjk6ob.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-login', {
                    id: props.id,
                    password: props.pw
                })
                .then(res => {
                    const statusCode = res.status
                    switch (statusCode) {
                        // 계정 정보 존재하는 경우 status 201
                        case 201:
                            // 사용자 정보 인증 안 됨
                            if(res.data.verified === 0) {
                                alert('이메일 인증을 완료해주세요!')
                            }
                            // 사용자 정보 인증됨
                            else {
                                sessionStorage.setItem('id', res.data.id);
                                sessionStorage.setItem('pw', res.data.password);
                                sessionStorage.setItem('name', res.data.nickname);
                                sessionStorage.setItem('picture', res.data.picture);
                                navigate('/');
                            }
                            break
                        // 계정 정보 맞지 않은 경우 status 202
                        case 202:
                            alert('아이디 혹은 패스워드 오류')
                            break
                        default:
                            break
                    }
                })
                .catch(error => {
                    console.log(error);
                })

      }}}>sign In</Button>
    </Stack>
    </div>
  );
}


export function LoginIdErrorField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch', backgroundColor:'white' },
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
            helperText="이메일를 입력하세요"
          />
        </div>
      </Box>
    );
  }


  export function LoginIdField(props) {
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

  export function LoginPageButton() {
    const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" 
      sx={{
        borderColor: 'white',
        color: 'white',
      }}
      onClick={()=>{
        navigate('./login');
      }}>Sign In</Button>
    </Stack>
  );
}


export function LoginPwCheckField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch'},
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setPwCheck(e.target.value)}}
      >
        <div>
        <TextField
            id="outlined-helperText"
            label="비밀번호 재확인"
            type="password"
            defaultValue=""
            helperText=""
          />
        </div>
      </Box>
    );
  }


  export function LoginPwErrorField(props) {
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
            label="비밀번호 입력"
            type="password"
            defaultValue=""
            helperText="비밀번호를 입력하세요"
          />
        </div>
      </Box>
    );
  }


  export function LoginPwField(props) {
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