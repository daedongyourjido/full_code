import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ID = ['apple', 'banana', 'melon', 'orange'];

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
                if(!props.id) 
                    props.setIdEmpty(true);
                else if(props.id) {
                    props.setIdEmpty(false);
                    for(let i=0; i<4; i++) {
                        if(ID[i] === props.id) {
                            props.setIdDupCheck(true);  // 중복일 경우 true
                            props.setDupDup(true);
                            break;
                        }
                        props.setIdDupCheck(false); // 중복 아닐 경우 false
                        props.setDupDup(false);

            }}
            }}>중복체크</Button>
        </Stack>
    </div>
  );
}

