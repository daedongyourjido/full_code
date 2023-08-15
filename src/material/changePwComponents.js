import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export function ChangePwButton(props) {

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
              if(!props.oldPw)
                  props.setOldPwEmpty(true);
              else if(props.oldPw)
                  props.setOldPwEmpty(false);
              if(!props.pw)
                  props.setPwEmpty(true);
              else if(props.pw)
                  props.setPwEmpty(false);
              if(!props.pwCheck)
                  props.setPwCheckEmpty(true);
              else if(props.pwCheck)
                  props.setPwCheckEmpty(false);
              if(props.pw !== props.pwCheck)
                  props.setPwDup(true);
              else if(props.pw === props.pwCheck)
                  props.setPwDup(false);
              if(props.oldPw && props.pw){
                  if(props.pwCheck){
                      if(props.pw === props.pwCheck){
                          props.setChanged(true);
                      }
                  }
              }
        }}>비밀번호 변경</Button>
      </Stack>
      </div>
    );
  }

  export function ChangePwField(props) {
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
            label="새 비밀번호"
            type="password"
            autoComplete="current-password"
          />
        </div>
      </Box>
    );
  }

  export function ChangePwCheckField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setPwCheck(e.target.value)}}
      >
        <div>
          <TextField
            id="outlined-error-helper-text"
            label="비밀번호 재확인"
            defaultValue=""
            type="password"
          />
        </div>
      </Box>
    );
  }






  export function ChangePwCheckErrorField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, height: '6.5ch', width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{ props.setPwCheck(e.target.value) }}
      >
        <div>
          {props.pwCheckEmpty? 
          <TextField
            error
            id="outlined-error-helper-text"
            label="비밀번호 재확인"
            type="password"
            defaultValue=""
            helperText="비밀번호를 재확인하세요"
          /> 
          :
          <TextField
            error
            id="outlined-error-helper-text"
            label="비밀번호 재확인"
            defaultValue=""
            type="password"
            helperText="비밀번호가 일치하지 않습니다"
          />
          }
        </div>
      </Box>
    );
  }

  export function ChangePwErrorField(props) { // 변수명 변경
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
            helperText="비밀번호는 8자 이상이어야 합니다"
          />
          }
        </div>
      </Box>
    );
  }

  export function ChangePwOldErrorField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, height: '6.5ch', width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setOldPw(e.target.value)}}
      >
        <div>
          {props.oldPwEmpty? 
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

  export function ChangePwOldField(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onChange={(e)=>{props.setOldPw(e.target.value)}}
      >
        <div>
          <TextField
            id="outlined-password-input"
            label="기존 비밀번호"
            type="password"
            autoComplete="current-password"
          />
        </div>
      </Box>
    );
  }