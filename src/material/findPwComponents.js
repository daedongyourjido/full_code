import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

export function IdSearchButton(props) {
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
          if(!props.email)
            props.setEmpty(true);
          else if(props.email) {
            props.setEmpty(false);

          // 이메일 입력여부 확인됨.
          // 이메일 존재여부 확인해야 함 -> 성공 시 이메일로 인증링크 전공, "/reset"으로 이동
          //                 -> 실패 시 alert

              navigate('./reset');
          }

      }} >비밀번호 찾기</Button>
    </Stack>
    </div>
  );
}

  export function IdField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setEmail(e.target.value)}}
      >
        <div>
          <TextField
            id="outlined-password-input"
            label="이메일"
            autoComplete="current-password"
          />
        </div>
      </Box>
    );
  }