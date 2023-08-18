import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export default function SignUpDupCheckButton(props) {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'-20px'}} >
        <Stack direction="row" spacing={2}>
        <Button variant="outlined" 
        sx={{
            borderColor: '#045369',
            color: '#045369',
            width: '35ch'
        }}
            onClick={()=>{
                /** 계정 중복 확인 api 추가 **/
                axios.post('https://iclveynbwf.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-signin', {
                    // 중복 확인 API의 경우 type: 'duplication'
                    type: 'duplication',
                    id: props.id
                })
                .then(res => {
                    // 계정이 DB에 존재함
                    if(res.data.duplicated) {
                        props.setIdDupCheck(true);  // 중복일 경우 true
                        props.setDupDup(true);
                    }
                    // 계정이 DB에 존재하지 않음
                    else {
                        props.setIdDupCheck(false); // 중복 아닐 경우 false
                        props.setDupDup(false);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }}>중복체크</Button>
        </Stack>
    </div>
  );
}

