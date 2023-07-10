import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useNavigate} from 'react-router-dom';

export default function LoginPageButton() {
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