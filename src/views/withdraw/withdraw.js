import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import Bar from '../../modules/layout/barSetting.js';
import InputField from '../../modules/components/inputField.js';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SettingContainer from '../setting/settingContainer.js';
import MainPageButton from '../main/mainPageButton.js';
import './withdraw.css';


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
                <div className='withdraw-box-done'>
                    <h1>탈퇴되었습니다</h1>
                    <MainPageButton color="black" />
                </div> 
            : 
                <div className='withdraw-box'>
                    <div style={{marginLeft:'170px'}}>
                        <p style={{color:'black', fontSize:'20px', marginLeft:'100px'}}>회원 탈퇴</p>
                        <InputField setData={setPw} label="비밀번호" type="password" />
                    </div>
                    <WithdrawButton setPwEmpty={setPwEmpty} setChanged={setChanged} pw={pw} />
                    { pwEmpty ? <p className='input_error'>비밀번호를 입력해주세요</p> : <p></p> }
                </div>
            }
            </div>
        )
    }

    return (
        <div className='root' style={{display:'flex', flexDirection:'column'}}>
            <div className='bar'>
                <Bar setting={true} />
            </div>
            <div className='resetpw-container'>
                <SettingContainer component={WithdrawBox} menu="withdraw" />
            </div>
        </div>
    )
}

export default Withdraw;