import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useNavigate} from 'react-router-dom';

export default function FindPwButton(props) {
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
            if(!props.pw)
                props.setPwEmpty(true);
            else if(props.pw)
                props.setPwEmpty(false);
            if(props.pw && !props.pwWrong) // pwWrong : axios 통신 결과 이메일 없을 때 true
                navigate('./reset');

      }} >비밀번호 찾기</Button>
    </Stack>
    </div>
  );
}