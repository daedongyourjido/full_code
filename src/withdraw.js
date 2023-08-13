import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import WithdrawField from './material/withdrawField.js';
import WithdrawErrorField from './material/withdrawErrorField.js';
import WithdrawButton from './material/withdrawButton.js';
import Bar from './bar.js';


function ChangePwBox() {
    const [pw, setPw] = useState("");
    const [pwEmpty, setPwEmpty] = useState(false);
    const [pwWrong, setPwWrong] = useState(false);
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
                    {pwWrong? <withdrawErrorField pwEmpty={pwEmpty} setPw={setPw} /> : pwEmpty? <WithdrawErrorField pwEmpty={pwEmpty} setPw={setPw} /> : <WithdrawField setPw={setPw} /> }
                
                </div>
                <WithdrawButton setPwWrong={setPwWrong} setPwEmpty={setPwEmpty} pwWrong={pwWrong} setChanged={setChanged} pw={pw} />
            </div>
        }
        </div>
    )
}

function SettingBox() {
    const navigate = useNavigate();

    return (
        <div style={{height:'668px', width:'800px', backgroundColor:'#FFFFFF', display:'grid', gridTemplateColumns: "1fr 3.8fr", gridColumnGap: '1px', boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.2)'}} >
            <div style={{ height: '100%', borderRight: '1px solid #045369', borderRightWidth:'3px', display:'flex', flexDirection:'column', padding:'20px', }}>
                <div style={{color:'gray', fontSize:'15px', marginLeft:'10px'}}>
                    <p style={{marginBottom:'40px', cursor:'pointer'}}>프로필 편집</p>
                    <p style={{marginBottom:'40px', cursor:'pointer'}} onClick={()=>{navigate('/setting/change')}}>비밀번호 변경</p>
                    <p style={{cursor:'pointer', color:'#000000'}}>회원 탈퇴</p>
                
                </div>

            </div>
            <div>
                <ChangePwBox />
            </div>

        </div>
    )
}

function Withdraw() {

    return (
        <div className='root' style={{display:'flex', flexDirection:'column'}}>
            <Bar />
            <div style={{display:'flex', position:'absolute', top:'50%', right:'50%', marginRight:'-400px', marginTop:'-300px'}}>
                
                <SettingBox />
            </div>
        </div>
    )
}

export default Withdraw;