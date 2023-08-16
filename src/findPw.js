import React, {useState} from 'react';
import Header from './header.js';
import MenuMap from './menuMap.js';
import { useNavigate } from 'react-router-dom';
import InputField from './material/inputField.js';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export function IdSearchButton(props) {
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
          if(!props.email)
            props.setEmpty(true);
          else if(props.email) {
            props.setEmpty(false);

          // 이메일 입력여부 확인됨.
          // 이메일 존재여부 확인해야 함 -> 성공 시 이메일로 인증링크 전공, "/reset"으로 이동
          //                 -> 실패 시 alert

              navigate('./reset');
          }

      }} >비밀번호 찾기</Button>
    </Stack>
    </div>
  );
}


// 비밀번호 찾기 페이지 -> 이메일 존재여부 확인 
function FindPwBox() {
    const [email, setEmail] = useState("");
    const [empty, setEmpty] = useState(false);

    return (
        <div style={{width:'380px'}}>
            <div style={{paddingTop:'0px', display:'flex', flexDirection:'column', width:'100%', height:'400px', backgroundColor:'white', borderRadius:'2%', boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.3)'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'45px'}}>
                        <h1 style={{color:'#000000'}}>비밀번호 재설정</h1>
                        <InputField setData={setEmail} label="이메일" type="text" /> 
                        <IdSearchButton email={email} setEmpty={setEmpty} />
                        {empty ? <p style={{color:'red', textAlign:'center', fontSize:'1vh'}}>이메일을 입력해주세요</p> : <p></p>}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

function FindPw() {
    return (
        <div className="root">
            <div className="bar">
                    <Header />
            </div>

            <MenuMap component={<FindPwBox />} />
        </div>
    )
}



export default FindPw;

