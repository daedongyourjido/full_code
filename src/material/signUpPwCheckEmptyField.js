import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SignUpPwCheckEmptyField(props) {
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