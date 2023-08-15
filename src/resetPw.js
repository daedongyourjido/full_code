import React, { useState } from 'react';
import { ChangePwField,
        ChangePwCheckField } from './material/changePwComponents.js';
import { ResetPwButton } from './material/resetPwComponents.js';
import Bar from './barDefault.js';


function ResetPwBox() {
    const [pw, setPw] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [pwOld, setPwOld] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [empty, setEmpty] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [pwDup, setPwDup] = useState(false);
    const [changed, setChanged] = useState(false);

    return (
        <div>
        {changed ? 
            <div style={{color:'#000000', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <h1>비밀번호 변경이 완료되었습니다</h1>
                <a href='/' style={{fontSize:'20px', color:'#045369', display:'flex'}}>메인으로 이동하기</a>
                
            </div> 
        : 
            <div style={{marginBottom:'250px', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:'10vh'}}>
                    <p style={{color:'black', fontSize:'20px' }}>비밀번호 초기화</p>
                    <ChangePwField setPw={setPw} />
                    <ChangePwCheckField setPwCheck={setPwCheck}  />
                    <ResetPwButton 
                        pw={pw}
                        pwCheck={pwCheck}
                        pwOld={pwOld}
                        setPwDup={setPwDup}
                        changed={changed}
                        setChanged={setChanged}
                        setEmpty={setEmpty}
                        />
                    {empty ? <p style={{color:'red', textAlign:'center', fontSize:'1vh'}}>모두 입력해주세요</p> : <p></p>}
                    {pwDup ? <p style={{color:'red', textAlign:'center', fontSize:'1vh'}}>비밀번호가 일치하지 않습니다</p> : <p></p>}
            </div>
        }
        </div>
    )
}

function SettingBox() {

    return (
        <div style={{height:'668px', width:'800px', backgroundColor:'#FFFFFF', display:'grid' }} >
            <div style={{ height: '100%', display:'flex', flexDirection:'column', padding:'20px', justifyItems:'center', alignItems:'center' }}>
                <div style={{color:'gray', fontSize:'15px', marginLeft:'10px'}}>
                
                </div>

            </div>
            <div>
                <ResetPwBox />
            </div>

        </div>
    )
}

function ResetPw() {

    return (
        <div className='root' style={{display:'flex', flexDirection:'column'}}>
            <Bar />
            <div style={{display:'flex', position:'absolute', top:'50%', right:'50%', marginRight:'-400px', marginTop:'-300px'}}>
                
                <SettingBox />
            </div>
        </div>
    )
}

export default ResetPw;