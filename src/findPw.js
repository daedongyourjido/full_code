import React, {useState} from 'react';
import Header from './header.js';
import MenuMap from './menuMap.js';
import { IdSearchButton,
        IdField } from './material/findPwComponents.js';

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
                        <IdField setEmail={setEmail} />
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

