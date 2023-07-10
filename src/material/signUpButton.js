import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useNavigate} from 'react-router-dom';

const ID = ['apple', 'banana', 'melon', 'orange'];

export default function SignUpButton(props) {
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
                if(!props.id)
                    props.setIdEmpty(true);
                else if(props.id)
                    props.setIdEmpty(false);
                if(!props.pw)
                    props.setPwEmpty(true);
                if(!props.name)
                    props.setNameEmpty(true);
                else if(props.pw)
                    props.setPwEmpty(false);
                if(props.pw.length < 8)
                    props.setPwWrong(true);
                else if(props.pw.length >= 8)
                    props.setPwWrong(false);
                if(!props.pwCheck)
                    props.setPwCheckEmpty(true);
                else if(props.pw != props.pwDup){
                    props.setPwCheck(true);
                }
                if(props.id && props.pw) {
                    if(props.name && props.pwDup) {
                        if(props.pwDup === props.pw) {
                        axios.post('https://vxpskt0u99.execute-api.us-east-2.amazonaws.com/default/outbound_mailer', {
                            api: 'mail',
                            sendData: {
                                senderAddress: 'no_reply@dyz.com',
                                title: '대용유어지도 인증 메일입니다',
                                // 이메일 바디(db연동시 값 전달)
                                body: 'body',
                                recipients: {
                                    // 이메일 받는 사람 주소
                                    address: props.id,
                                    type: 'R'
                                },
                                id : props.id,
                                pw : props.pw,
                                name : props.name
                            }
                            })
                            navigate('/needVerify');
                        }
                    }
            }

            }}>sign Up</Button>
        </Stack>
    </div>
  );
}