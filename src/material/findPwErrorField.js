import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FindPwErrorField(props) {
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
        {props.pwEmpty? 
        <TextField
          error
          id="outlined-error-helper-text"
          label="이메일 입력"
          defaultValue=""
          helperText="이메일을 입력하세요"
        /> 
        :
        <TextField
          error
          id="outlined-error-helper-text"
          label="비밀번호"
          defaultValue=""
          helperText="존재하지 않는 이메일 입니다"
        />
        } 
      </div>
    </Box>
  );
}