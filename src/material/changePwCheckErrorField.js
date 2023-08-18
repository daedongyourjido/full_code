import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ChangePwCheckErrorField(props) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, height: '6.5ch', width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onChange={(e)=>{ props.setPwCheck(e.target.value) }}
    >
      <div>
        {props.pwCheckEmpty? 
        <TextField
          error
          id="outlined-error-helper-text"
          label="비밀번호 재확인"
          type="password"
          defaultValue=""
          helperText="비밀번호를 재확인하세요"
        /> 
        :
        <TextField
          error
          id="outlined-error-helper-text"
          label="비밀번호 재확인"
          defaultValue=""
          type="password"
          helperText="비밀번호가 일치하지 않습니다"
        />
        }
      </div>
    </Box>
  );
}