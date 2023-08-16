import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Bar from './bar.js';
import InputField from './material/inputField.js';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SettingContainer from './settingContainer.js';


function WithdrawButton(props) {
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
            else if(props.pw) {
                props.setPwEmpty(false);
                props.setChanged(true);

                // 비밀번호 입력 확인 완료
                // 회원 탈퇴 프로세스
                
            }    
        }
        }>비밀번호 변경</Button>
      </Stack>
      </div>
    );
  }


function Withdraw() {

    function WithdrawBox() {
        const [pw, setPw] = useState("");
        const [pwEmpty, setPwEmpty] = useState(false);
        const [changed, setChanged] = useState(false);
    
        return (
            <div>
            {changed ? 
                <div style={{color:'#000000', display:'flex', flexDirection:'column', marginLeft:'80px', marginTop:'200px', }}>
                    <h1 style={{marginLeft:'100px'}}>탈퇴되었습니다</h1>
                    <a href='/' style={{fontSize:'20px', color:'#045369', display:'flex', marginLeft:'135px'}}>메인으로 이동하기</a>
                    
                </div> 
            : 
                <div style={{marginTop:'50px'}}>
                    <div style={{marginLeft:'170px'}}>
                        <p style={{color:'black', fontSize:'20px', marginLeft:'100px'}}>회원 탈퇴</p>
                        <InputField setData={setPw} label="비밀번호" type="password" />
                    </div>
                    <WithdrawButton setPwEmpty={setPwEmpty} setChanged={setChanged} pw={pw} />
                    { pwEmpty ? <p className='input_error'>이메일 중복확인 해주세요</p> : <p></p> }
                </div>
            }
            </div>
        )
    }

    return (
        <div className='root' style={{display:'flex', flexDirection:'column'}}>
            <Bar />
            <div style={{display:'flex', position:'absolute', top:'50%', right:'50%', marginRight:'-400px', marginTop:'-300px'}}>
                
                <SettingContainer component={WithdrawBox} menu="withdraw" />
            </div>
        </div>
    )
}

export default Withdraw;