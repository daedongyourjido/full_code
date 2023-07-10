import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function LoginIdField(props) {
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