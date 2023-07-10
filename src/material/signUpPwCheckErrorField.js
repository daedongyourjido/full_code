import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SignUpPwCheckErrorField(props) {
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