import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";

export default function ChangePwButton(props) {

  return (
    <div style={{ display: 'flex', marginTop:'10px', justifyContent: 'center', alignItems: 'center' }} >
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" 
      sx={{
        borderColor: '#045369',
        color: '#045369',
        width: '35ch'
        
      }}
        onClick={async ()=>{
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
                if(props.pw.length < 8)
                props.setPwWrong(true);
            else
                props.setPwWrong(false);
            if(props.pw !== props.pwCheck)
                props.setPwDup(true);
            if(props.oldPw && props.pw){
                if(props.pwCheck && props.pw.length >= 8){
                    if(props.pw === props.pwCheck){
                        axios.post('https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO', {
                            DML: 'UPDATE',
                            table: 'user',
                            set: `password = '${props.pw}'`,
                            where: `id='${sessionStorage._key}'`
                        })
                            .then(res => {
                                props.setChanged(true);
                                sessionStorage.setItem('password', props.pw)
                                console.log(res)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }

                }
            }
      }}>비밀번호 변경</Button>
    </Stack>
    </div>
  );
}