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
                if(!props.pwDup)
                    props.setPwCheckEmpty(true);
                else if(props.pw != props.pwDup){
                    props.setPwCheck(true);
                }
                if(props.id && props.pw) {
                    if(props.name && props.pwDup) {
                        if(props.pwDup === props.pw) {
                            /** 회원가입 api 추가 **/
                            axios.post('https://iclveynbwf.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-signin', {
                                // 로그인 API의 경우 type: 'signup'
                                type: 'signup',
                                email : props.id,
                                password : props.pw,
                                nickname : props.name
                            })
                                // 문제가 없을 경우(정상 회원가입) 인덱스 라우팅
                            .then(res => {
                                alert('회원가입 완료! 메일 인증을 완료해주세요.')
                                navigate('/')
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        }
                    }
            }

            }}>sign Up</Button>
        </Stack>
    </div>
  );
}
