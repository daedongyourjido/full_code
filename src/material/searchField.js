import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SearchField() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField 
            id="standard-basic" 
            label="🔍︎" 
            variant="standard" />
      </div>
    </Box>
  );
}