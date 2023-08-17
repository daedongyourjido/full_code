import React, {useState} from 'react';
import Bar from './bar.js';
import ResetPwButton from './resetPwButton.js';
import InputField from './material/inputField.js';
import SettingContainer from './settingContainer.js';
import MainPageButton from './material/mainPageButton.js';


function ChangePw() {

    function ChangePwBox() {
        const [pw, setPw] = useState("");
        const [pwCheck, setPwCheck] = useState("");
        const [empty, setEmpty] = useState(false);
        const [pwDup, setPwDup] = useState(false);
        const [changed, setChanged] = useState(false);
    
        return (
            <div>
            {changed ? 
                <div className='changepw-box-done'>
                    <h1>비밀번호 변경이 완료되었습니다</h1>
                    <MainPageButton color="black" />
                </div> 
            : 
                <div className='changepw-box'>
                        <p style={{color:'black', fontSize:'20px' }}>비밀번호 초기화</p>
                        <InputField setData={setPw} id="password" type="password" label="비밀번호" />
                        <InputField setData={setPwCheck} id="password" type="password" label="비밀번호 재확인" />
                        <ResetPwButton 
                            pw={pw}
                            pwCheck={pwCheck}
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

    return (
        <div className='root' style={{display:'flex', flexDirection:'column'}}>
            <div className='bar'>
                <Bar setting={true} />
            </div>
            <div className='resetpw-container'>
                <SettingContainer component={ChangePwBox} menu="changePw" />
            </div>
        </div>
    )
}

export default ChangePw;