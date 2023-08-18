import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
export default function WithdrawButton(props) {

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
            if(!props.pw)
                props.setPwEmpty(true)
            if(props.pw && props.pwWrong === false)
                        props.setChanged(true);
            }
      }>비밀번호 변경</Button>
    </Stack>
    </div>
  );
}