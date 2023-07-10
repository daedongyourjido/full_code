import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import MenuMap from './menuMap.js';
import FindPwButton from './material/findPwButton.js';
import FindPwField from './material/findPwField.js'
import FindPwErrorField from './material/findPwErrorField.js'

const ID = 'sjhong98@icloud.com';

function Text() {
    const navigate = useNavigate();
      return (
          <h1 style={{paddingBottom:'30px', cursor: 'pointer', width:'200px'}} onClick={()=>{
            navigate('/');
          }}>대동유어지도</h1>
      )
  }

function FindPwBox() {
    const [pw, setPw] = useState("");
    const [pwEmpty, setPwEmpty] = useState(false);
    const [pwWrong, setPwWrong] = useState(false);

    return (
        <div style={{width:'380px'}}>
            <div style={{paddingTop:'0px', display:'flex', flexDirection:'column', width:'100%', height:'400px', backgroundColor:'white', borderRadius:'2%', boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.3)'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'45px'}}>
                        <h1 style={{color:'#000000'}}>비밀번호 재설정</h1>
                        {pwWrong? <FindPwErrorField setPw={setPw} pwEmpty={pwEmpty} /> : pwEmpty? <FindPwErrorField setPw={setPw} pwEmpty={pwEmpty} /> : <FindPwField setPw={setPw} />}
                        <FindPwButton pw={pw} setPwWrong={setPwWrong} setPwEmpty={setPwEmpty} />
                        
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
                    <Text />
            </div>

            <MenuMap component={<FindPwBox />} />
        </div>
    )
}



export default FindPw;

