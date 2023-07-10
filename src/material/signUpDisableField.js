import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function signUpDisableField(props) {
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