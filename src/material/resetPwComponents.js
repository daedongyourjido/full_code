import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export function ResetPwButton(props) {
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
                props.setEmpty(true);
            else if(props.pw)
                props.setEmpty(false);
            if(!props.pwCheck)
                props.setEmpty(true);
            else if(props.pwCheck)
                props.setEmpty(false);
            if(props.pw !== props.pwCheck)
                props.setPwDup(true);
            else if(props.pw === props.pwCheck) {
                if(props.pw && props.pwCheck) {
                // 입력 정보 유효한지 확인됨. (입력여부 / 비번 재확인)
                // db 접근

                props.setPwDup(false);
                props.setChanged(true);
            }
        }
      }}>비밀번호 변경</Button>
    </Stack>
    </div>
  );
}