import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useNavigate} from 'react-router-dom';

export default function LoginButton(props) {
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
            if(props.id)
                props.setIdEmpty(true);
            if(props.pw) 
                props.setPwEmpty(true);   
            if(!props.id)
                props.setIdEmpty(false);
            if(!props.pw)
                props.setPwEmpty(false);
                
            else {
                    localStorage.setItem('token', "1234");
                    localStorage.setItem('id', "sjhong98@icloud.com");
                    localStorage.setItem('pw', "mango");
                    localStorage.setItem('name', "승재");
                    navigate('/');

                // axios.post('https://wtdhqxavjk.execute-api.us-east-2.amazonaws.com/auth/2023-h-capstone-auth', {
                //     id: props.id,
                //     password: props.pw
                // })
                // .then(res => {
                //     console.log('token:', res.data.token, "id:",res.data.id, "pw:", res.data.password, "name:", res.data.name);
                //     localStorage.setItem('token', res.data.token);
                //     localStorage.setItem('id', res.data.id);
                //     localStorage.setItem('pw', res.data.password);
                //     localStorage.setItem('name', res.data.name);
                //     navigate('/');
                // })
                // .catch(error => {;
                //     console.log(error);
                // })

      }}}>sign In</Button>
    </Stack>
    </div>
  );
}