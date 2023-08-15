import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export function WithdrawButton(props) {
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

export function WithdrawPwErrorField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, height: '6.5ch', width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setPw(e.target.value)}}
      >
        <div>
          {props.pwEmpty? 
          <TextField
            error
            id="outlined-error-helper-text"
            label="비밀번호 입력"
            type="password"
            defaultValue=""
            helperText="비밀번호를 입력하세요"
          /> 
          :
          <TextField
            error
            id="outlined-error-helper-text"
            label="비밀번호"
            type="password"
            defaultValue=""
            helperText="비밀번호가 일치하지 않습니다"
          />
          }
        </div>
      </Box>
    );
  }


  export function WithdrawPwField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setPw(e.target.value)}}
      >
        <div>
          <TextField
            id="outlined-password-input"
            label="비밀번호"
            type="password"
            autoComplete="current-password"
          />
        </div>
      </Box>
    );
  }